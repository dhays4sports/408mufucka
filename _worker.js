/* 408-LIFE-1.7 — Cloudflare Pages Advanced Mode LIFE secure intake + producer application queue. */

const BUILD = '408-LIFE-1.7';
const SCHEMA = '408-life-application-init-v1';
const API_PATH = '/api/life/application-init';
const CONVERSION_PATH = '/api/life/conversion';
const OPS_QUEUE_PATH = '/api/life/producer/queue';
const OPS_ITEM_PATH = '/api/life/producer/item';
const OPS_STATUS_PATH = '/api/life/producer/status';
const OPS_CONVERSIONS_PATH = '/api/life/producer/conversions';
const OPS_READINESS_PATH = '/api/life/producer/readiness';
const MAX_BODY_BYTES = 16 * 1024;
const OPS_MAX_BODY_BYTES = 4 * 1024;
const QUEUE_LIMIT = 100;
const PROTECTION = new Set(['family_income','home_mortgage','children','debt_final_expenses','business','coverage_in_place','not_sure']);
const RUNWAY = new Set(['under_3_months','3_to_6_months','6_to_12_months','over_1_year','income_not_primary']);
const COVERAGE = new Set(['none','work','personal','both','not_sure']);
const GENDER = new Set(['female','male','discuss']);
const QUEUE_STATUSES = new Set(['new','initiated','emailed','follow_up','completed','archived']);
const CONVERSION_EVENTS = new Set(['landing_view','start_clicked','quick_questions_complete','application_details_started','application_start_submitted']);
const LIFE_VARIANTS = new Set(['before_anything_changes','20_minutes','this_is_the_time','financial_picture']);
const LIFE_CREATIVE_CODES = new Set(['A','B','C','D']);
const LIFE_VARIANT_CODES = Object.freeze({ before_anything_changes:'A', '20_minutes':'B', this_is_the_time:'C', financial_picture:'D' });
const encoder = new TextEncoder();
const decoder = new TextDecoder();
let jwksCache = { domain: '', expiresAt: 0, value: null };

const QUEUE_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS life_application_queue (
  request_id TEXT PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  ciphertext TEXT NOT NULL,
  iv TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_life_application_queue_status_created
  ON life_application_queue(status, created_at DESC);
CREATE TABLE IF NOT EXISTS life_application_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  request_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  actor_email TEXT,
  from_status TEXT,
  to_status TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_life_application_events_request
  ON life_application_events(request_id, created_at DESC);
CREATE TABLE IF NOT EXISTS life_conversion_events (
  event_id TEXT PRIMARY KEY,
  journey_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  occurred_at TEXT NOT NULL,
  landing_variant TEXT NOT NULL,
  creative_code TEXT NOT NULL,
  utm_source TEXT NOT NULL,
  utm_medium TEXT NOT NULL,
  utm_campaign TEXT NOT NULL,
  utm_content TEXT NOT NULL,
  campaign_id TEXT NOT NULL,
  campaign_variant TEXT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_life_conversion_journey_event
  ON life_conversion_events(journey_id, event_name);
CREATE INDEX IF NOT EXISTS idx_life_conversion_event_creative
  ON life_conversion_events(event_name, creative_code, occurred_at DESC);
`;

function securityHeaders(extra) {
  return Object.assign({
    'Cache-Control': 'no-store, max-age=0',
    'Pragma': 'no-cache',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
    'X-Frame-Options': 'DENY',
    'Cross-Origin-Resource-Policy': 'same-origin'
  }, extra || {});
}

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: securityHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
  });
}

function fail(status) {
  return jsonResponse(status, { ok: false, error: 'request_not_completed' });
}

function text(value, max) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001F\u007F]/g, '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function exactKeys(value, allowed) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  return Object.keys(value).every((key) => allowed.includes(key));
}

function allowedOrigins(env) {
  return String((env && env.LIFE_ALLOWED_ORIGIN) || 'https://408farmers.com')
    .split(',')
    .map((value) => value.trim().replace(/\/$/, ''))
    .filter(Boolean);
}

function validOrigin(request, env) {
  const origin = String(request.headers.get('Origin') || '').replace(/\/$/, '');
  if (!origin || !allowedOrigins(env).includes(origin)) return false;
  const fetchSite = String(request.headers.get('Sec-Fetch-Site') || '').toLowerCase();
  return !fetchSite || fetchSite === 'same-origin';
}

function validUuid(value) {
  return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function validDob(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return false;
  const now = new Date();
  const oldest = new Date(Date.UTC(now.getUTCFullYear() - 120, now.getUTCMonth(), now.getUTCDate()));
  return date < now && date >= oldest;
}

function validEmail(value) {
  return value.length <= 160 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validPhone(value) {
  if (!value) return true;
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

function normalizeAttribution(value) {
  const direct = {
    channel: 'life_campaign', landing_variant: 'before_anything_changes', creative_code: 'A',
    utm_source: 'direct', utm_medium: 'direct', utm_campaign: 'life_insurability', utm_content: 'before_anything_changes',
    utm_term: '', campaign_id: '', campaign_variant: 'A'
  };
  if (value === undefined) return direct;
  const keys = ['channel','landing_variant','creative_code','utm_source','utm_medium','utm_campaign','utm_content','utm_term','campaign_id','campaign_variant'];
  if (!exactKeys(value, keys)) return null;
  const out = {
    channel: text(value.channel, 40),
    landing_variant: text(value.landing_variant, 80),
    creative_code: text(value.creative_code, 8).toUpperCase(),
    utm_source: text(value.utm_source, 120),
    utm_medium: text(value.utm_medium, 120),
    utm_campaign: text(value.utm_campaign, 120),
    utm_content: text(value.utm_content, 120),
    utm_term: text(value.utm_term, 160),
    campaign_id: text(value.campaign_id, 120),
    campaign_variant: text(value.campaign_variant, 40)
  };
  if (out.channel !== 'life_campaign') return null;
  if (!LIFE_VARIANTS.has(out.landing_variant) || !LIFE_CREATIVE_CODES.has(out.creative_code)) return null;
  if (LIFE_VARIANT_CODES[out.landing_variant] !== out.creative_code) return null;
  if (!out.utm_source || !out.utm_medium || !out.utm_campaign || !out.utm_content) return null;
  return out;
}


function normalizeConversionAttribution(value) {
  const keys = ['channel','landing_variant','creative_code','utm_source','utm_medium','utm_campaign','utm_content','campaign_id','campaign_variant'];
  if (!exactKeys(value, keys)) return null;
  const full = normalizeAttribution(Object.assign({ utm_term: '' }, value || {}));
  if (!full) return null;
  return {
    channel: full.channel,
    landing_variant: full.landing_variant,
    creative_code: full.creative_code,
    utm_source: full.utm_source,
    utm_medium: full.utm_medium,
    utm_campaign: full.utm_campaign,
    utm_content: full.utm_content,
    campaign_id: full.campaign_id,
    campaign_variant: full.campaign_variant
  };
}

function normalizeConversion(payload) {
  if (!exactKeys(payload, ['schema_version','event_id','journey_id','event_name','attribution'])) return null;
  if (payload.schema_version !== '408-life-conversion-v1' || !validUuid(payload.event_id) || !validUuid(payload.journey_id)) return null;
  const eventName = text(payload.event_name, 48);
  if (!CONVERSION_EVENTS.has(eventName)) return null;
  const attribution = normalizeConversionAttribution(payload.attribution);
  if (!attribution) return null;
  return { event_id: payload.event_id, journey_id: payload.journey_id, event_name: eventName, attribution };
}

function normalize(payload) {
  if (!exactKeys(payload, ['schema_version','submission_id','attribution','engagement','applicant','acknowledgement','anti_bot'])) return null;
  if (payload.schema_version !== SCHEMA || !validUuid(payload.submission_id)) return null;
  if (!exactKeys(payload.engagement, ['protection_priority','income_runway','existing_life_coverage'])) return null;
  if (!exactKeys(payload.applicant, ['first_name','middle_name','last_name','gender','date_of_birth','residential_address','residential_address_2','residential_city','residential_state','residential_zip','email','phone','ssn_last4'])) return null;
  if (!exactKeys(payload.anti_bot, ['website','elapsed_ms'])) return null;

  const attribution = normalizeAttribution(payload.attribution);
  if (!attribution) return null;

  if (text(payload.anti_bot.website, 200)) return null;
  if (!Number.isFinite(payload.anti_bot.elapsed_ms) || payload.anti_bot.elapsed_ms < 1200 || payload.anti_bot.elapsed_ms > 21600000) return null;

  const priorities = Array.isArray(payload.engagement.protection_priority)
    ? [...new Set(payload.engagement.protection_priority)]
    : [];
  if (!priorities.length || priorities.length > 6 || priorities.some((value) => !PROTECTION.has(value))) return null;
  if (priorities.includes('not_sure') && priorities.length !== 1) return null;

  const incomeRunway = text(payload.engagement.income_runway, 40);
  const existingCoverage = text(payload.engagement.existing_life_coverage, 40);
  if (!RUNWAY.has(incomeRunway) || !COVERAGE.has(existingCoverage)) return null;

  if (typeof payload.applicant.ssn_last4 !== 'string' || !/^\d{4}$/.test(payload.applicant.ssn_last4)) return null;
  if (typeof payload.applicant.residential_zip !== 'string' || !/^\d{5}(?:-\d{4})?$/.test(payload.applicant.residential_zip)) return null;

  const applicant = {
    first_name: text(payload.applicant.first_name, 80),
    middle_name: text(payload.applicant.middle_name, 80),
    last_name: text(payload.applicant.last_name, 100),
    gender: text(payload.applicant.gender, 20),
    date_of_birth: text(payload.applicant.date_of_birth, 10),
    residential_address: text(payload.applicant.residential_address, 160),
    residential_address_2: text(payload.applicant.residential_address_2, 80),
    residential_city: text(payload.applicant.residential_city, 100),
    residential_state: text(payload.applicant.residential_state, 40),
    residential_zip: text(payload.applicant.residential_zip, 10),
    email: text(payload.applicant.email, 160).toLowerCase(),
    phone: text(payload.applicant.phone, 24),
    ssn_last4: text(payload.applicant.ssn_last4, 4)
  };

  if (!applicant.first_name || !applicant.last_name || !GENDER.has(applicant.gender) || !validDob(applicant.date_of_birth)) return null;
  if (!applicant.residential_address || !applicant.residential_city || !applicant.residential_state) return null;
  if (!/^\d{5}(?:-\d{4})?$/.test(applicant.residential_zip) || !validEmail(applicant.email) || !validPhone(applicant.phone)) return null;
  if (!/^\d{4}$/.test(applicant.ssn_last4) || payload.acknowledgement !== true) return null;

  const now = new Date().toISOString();
  return {
    schema_version: SCHEMA,
    request_id: payload.submission_id,
    received_at: now,
    source: '408farmers.com/life',
    attribution,
    engagement: {
      protection_priority: priorities,
      income_runway: incomeRunway,
      existing_life_coverage: existingCoverage
    },
    applicant,
    acknowledgement: { application_preparation: true }
  };
}

function bytesToBase64(bytes) {
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, Math.min(i + chunk, bytes.length)));
  }
  return btoa(binary);
}

function base64ToBytes(value) {
  const binary = atob(value);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i);
  return out;
}

function base64UrlToBytes(value) {
  const normalized = String(value || '').replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
  return base64ToBytes(padded);
}

function base64UrlToJson(value) {
  try {
    return JSON.parse(decoder.decode(base64UrlToBytes(value)));
  } catch (_) {
    return null;
  }
}

async function queueCryptoKey(env) {
  const encoded = String((env && env.LIFE_QUEUE_ENCRYPTION_KEY_B64) || '').trim();
  if (!encoded) throw new Error('queue_key_missing');
  let raw;
  try { raw = base64ToBytes(encoded); } catch (_) { throw new Error('queue_key_invalid'); }
  if (raw.byteLength !== 32) throw new Error('queue_key_invalid');
  return crypto.subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, ['encrypt','decrypt']);
}

async function encryptQueuePayload(normalized, env) {
  const key = await queueCryptoKey(env);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const additionalData = encoder.encode(SCHEMA + '.' + normalized.request_id);
  const plaintext = encoder.encode(JSON.stringify(normalized));
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv, additionalData }, key, plaintext);
  return { ciphertext: bytesToBase64(new Uint8Array(encrypted)), iv: bytesToBase64(iv) };
}

async function decryptQueuePayload(row, env) {
  const key = await queueCryptoKey(env);
  const iv = base64ToBytes(row.iv);
  const ciphertext = base64ToBytes(row.ciphertext);
  const additionalData = encoder.encode(SCHEMA + '.' + row.request_id);
  const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv, additionalData }, key, ciphertext);
  return JSON.parse(decoder.decode(plaintext));
}

function queueDb(env) {
  const db = env && env.LIFE_QUEUE_DB;
  if (!db || typeof db.prepare !== 'function' || typeof db.exec !== 'function') throw new Error('queue_db_missing');
  return db;
}

async function ensureQueueSchema(env) {
  await queueDb(env).exec(QUEUE_SCHEMA_SQL);
}

async function queueInsert(normalized, env) {
  const db = queueDb(env);
  await ensureQueueSchema(env);
  const sealed = await encryptQueuePayload(normalized, env);
  const now = normalized.received_at;
  const result = await db.prepare(`
    INSERT INTO life_application_queue (request_id, status, created_at, updated_at, ciphertext, iv)
    VALUES (?1, 'new', ?2, ?2, ?3, ?4)
    ON CONFLICT(request_id) DO NOTHING
  `).bind(normalized.request_id, now, sealed.ciphertext, sealed.iv).run();

  const changes = Number(result && result.meta && result.meta.changes);
  if (!Number.isFinite(changes) || changes > 0) {
    await db.prepare(`
      INSERT INTO life_application_events (request_id, event_type, actor_email, from_status, to_status, created_at)
      VALUES (?1, 'created', NULL, NULL, 'new', ?2)
    `).bind(normalized.request_id, now).run();
  }
  return true;
}

function normalizeTeamDomain(value) {
  let domain = String(value || '').trim().toLowerCase();
  domain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
  if (!domain) return '';
  if (!domain.includes('.')) domain += '.cloudflareaccess.com';
  return domain;
}

async function loadAccessJwks(domain) {
  const now = Date.now();
  if (jwksCache.domain === domain && jwksCache.value && jwksCache.expiresAt > now) return jwksCache.value;
  const response = await fetch('https://' + domain + '/cdn-cgi/access/certs', {
    method: 'GET', headers: { 'Accept': 'application/json' }, cache: 'no-store', redirect: 'error'
  });
  if (!response.ok) throw new Error('access_jwks_unavailable');
  const data = await response.json();
  if (!data || !Array.isArray(data.keys)) throw new Error('access_jwks_invalid');
  jwksCache = { domain, value: data.keys, expiresAt: now + 5 * 60 * 1000 };
  return data.keys;
}

async function verifyAccessJwt(token, env) {
  const domain = normalizeTeamDomain(env && env.LIFE_ACCESS_TEAM_DOMAIN);
  const expectedAud = String((env && env.LIFE_ACCESS_AUD) || '').trim();
  if (!domain || !expectedAud || !token) return null;

  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const header = base64UrlToJson(parts[0]);
  const payload = base64UrlToJson(parts[1]);
  if (!header || !payload || header.alg !== 'RS256' || !header.kid) return null;

  const now = Math.floor(Date.now() / 1000);
  if (!Number.isFinite(payload.exp) || payload.exp <= now) return null;
  if (Number.isFinite(payload.nbf) && payload.nbf > now + 30) return null;
  if (payload.iss !== 'https://' + domain) return null;
  const aud = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!aud.includes(expectedAud)) return null;

  const keys = await loadAccessJwks(domain);
  const jwk = keys.find((candidate) => candidate && candidate.kid === header.kid);
  if (!jwk) return null;
  const key = await crypto.subtle.importKey(
    'jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']
  );
  const valid = await crypto.subtle.verify(
    { name: 'RSASSA-PKCS1-v1_5' }, key, base64UrlToBytes(parts[2]), encoder.encode(parts[0] + '.' + parts[1])
  );
  return valid ? payload : null;
}

function producerAllowlist(env) {
  return String((env && env.LIFE_PRODUCER_EMAILS) || '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

async function authorizedProducer(request, env) {
  const allowlist = producerAllowlist(env);
  if (!allowlist.length) return null;
  const token = request.headers.get('Cf-Access-Jwt-Assertion');
  if (!token) return null;
  let payload;
  try { payload = await verifyAccessJwt(token, env); } catch (_) { return null; }
  const email = text(payload && payload.email, 160).toLowerCase();
  if (!email || !allowlist.includes(email)) return null;
  return { email, payload };
}

function safeQueueStatus(value) {
  const status = text(value, 32);
  return QUEUE_STATUSES.has(status) ? status : '';
}

function formatQueueListItem(row, payload) {
  const applicant = payload && payload.applicant ? payload.applicant : {};
  const engagement = payload && payload.engagement ? payload.engagement : {};
  const attribution = payload && payload.attribution ? payload.attribution : {};
  return {
    request_id: row.request_id,
    status: row.status,
    created_at: row.created_at,
    updated_at: row.updated_at,
    name: [applicant.first_name, applicant.middle_name, applicant.last_name].filter(Boolean).join(' '),
    email: applicant.email || '',
    phone: applicant.phone || '',
    protection_priority: Array.isArray(engagement.protection_priority) ? engagement.protection_priority : [],
    existing_life_coverage: engagement.existing_life_coverage || '',
    landing_variant: attribution.landing_variant || '',
    creative_code: attribution.creative_code || '',
    utm_source: attribution.utm_source || '',
    utm_campaign: attribution.utm_campaign || '',
    utm_content: attribution.utm_content || '',
    campaign_id: attribution.campaign_id || '',
    campaign_variant: attribution.campaign_variant || ''
  };
}

async function handleQueueList(request, env, producer) {
  if (request.method !== 'GET') return fail(405);
  const db = queueDb(env);
  await ensureQueueSchema(env);
  const url = new URL(request.url);
  const requestedStatus = text(url.searchParams.get('status'), 32);
  let statement;
  if (requestedStatus && requestedStatus !== 'all') {
    const status = safeQueueStatus(requestedStatus);
    if (!status) return fail(400);
    statement = db.prepare(`
      SELECT request_id, status, created_at, updated_at, ciphertext, iv
      FROM life_application_queue WHERE status = ?1 ORDER BY created_at DESC LIMIT ?2
    `).bind(status, QUEUE_LIMIT);
  } else {
    statement = db.prepare(`
      SELECT request_id, status, created_at, updated_at, ciphertext, iv
      FROM life_application_queue ORDER BY created_at DESC LIMIT ?1
    `).bind(QUEUE_LIMIT);
  }
  const result = await statement.all();
  const rows = Array.isArray(result && result.results) ? result.results : [];
  const items = [];
  for (const row of rows) {
    try {
      const payload = await decryptQueuePayload(row, env);
      items.push(formatQueueListItem(row, payload));
    } catch (_) {
      items.push({ request_id: row.request_id, status: row.status, created_at: row.created_at, updated_at: row.updated_at, name: 'Unable to decrypt record', email: '', phone: '', protection_priority: [], existing_life_coverage: '', landing_variant:'', creative_code:'', utm_source:'', utm_campaign:'', utm_content:'', campaign_id:'', campaign_variant:'' });
    }
  }
  return jsonResponse(200, { ok: true, build: BUILD, producer: producer.email, items });
}

async function loadQueueRow(requestId, env) {
  const db = queueDb(env);
  await ensureQueueSchema(env);
  return db.prepare(`
    SELECT request_id, status, created_at, updated_at, ciphertext, iv
    FROM life_application_queue WHERE request_id = ?1 LIMIT 1
  `).bind(requestId).first();
}

async function handleQueueItemGet(request, env, producer) {
  if (request.method !== 'GET') return fail(405);
  const url = new URL(request.url);
  const requestId = text(url.searchParams.get('id'), 64);
  if (!validUuid(requestId)) return fail(400);
  const row = await loadQueueRow(requestId, env);
  if (!row) return fail(404);
  let payload;
  try { payload = await decryptQueuePayload(row, env); } catch (_) { return fail(500); }
  return jsonResponse(200, {
    ok: true,
    producer: producer.email,
    item: {
      request_id: row.request_id,
      status: row.status,
      created_at: row.created_at,
      updated_at: row.updated_at,
      attribution: payload.attribution || normalizeAttribution(undefined),
      engagement: payload.engagement,
      applicant: payload.applicant,
      acknowledgement: payload.acknowledgement
    }
  });
}

async function readOpsJson(request) {
  const lengthHeader = Number(request.headers.get('Content-Length') || 0);
  if (Number.isFinite(lengthHeader) && lengthHeader > OPS_MAX_BODY_BYTES) return null;
  let raw;
  try { raw = await request.text(); } catch (_) { return null; }
  if (encoder.encode(raw).byteLength > OPS_MAX_BODY_BYTES) return null;
  try { return JSON.parse(raw); } catch (_) { return null; }
}

async function handleQueueStatus(request, env, producer) {
  if (request.method !== 'POST') return fail(405);
  if (!validOrigin(request, env) || request.headers.get('X-Life-Ops-Action') !== '1') return fail(403);
  if (!/^application\/json(?:\s*;|$)/i.test(String(request.headers.get('Content-Type') || ''))) return fail(415);
  const body = await readOpsJson(request);
  if (!body || !exactKeys(body, ['request_id','status']) || !validUuid(body.request_id)) return fail(400);
  const status = safeQueueStatus(body.status);
  if (!status) return fail(400);

  const db = queueDb(env);
  await ensureQueueSchema(env);
  const current = await db.prepare('SELECT status FROM life_application_queue WHERE request_id = ?1 LIMIT 1').bind(body.request_id).first();
  if (!current) return fail(404);
  const fromStatus = safeQueueStatus(current.status);
  if (!fromStatus) return fail(500);
  if (fromStatus === status) return jsonResponse(200, { ok: true, status });

  const now = new Date().toISOString();
  await db.prepare('UPDATE life_application_queue SET status = ?1, updated_at = ?2 WHERE request_id = ?3').bind(status, now, body.request_id).run();
  await db.prepare(`
    INSERT INTO life_application_events (request_id, event_type, actor_email, from_status, to_status, created_at)
    VALUES (?1, 'status_changed', ?2, ?3, ?4, ?5)
  `).bind(body.request_id, producer.email, fromStatus, status, now).run();
  return jsonResponse(200, { ok: true, status });
}

async function handleQueueDelete(request, env, producer) {
  if (request.method !== 'DELETE') return fail(405);
  if (!validOrigin(request, env) || request.headers.get('X-Life-Ops-Action') !== '1') return fail(403);
  const url = new URL(request.url);
  const requestId = text(url.searchParams.get('id'), 64);
  if (!validUuid(requestId)) return fail(400);

  const db = queueDb(env);
  await ensureQueueSchema(env);
  const current = await db.prepare('SELECT status FROM life_application_queue WHERE request_id = ?1 LIMIT 1').bind(requestId).first();
  if (!current) return fail(404);
  const now = new Date().toISOString();
  await db.prepare('DELETE FROM life_application_queue WHERE request_id = ?1').bind(requestId).run();
  await db.prepare(`
    INSERT INTO life_application_events (request_id, event_type, actor_email, from_status, to_status, created_at)
    VALUES (?1, 'deleted', ?2, ?3, NULL, ?4)
  `).bind(requestId, producer.email, safeQueueStatus(current.status) || '', now).run();
  return jsonResponse(200, { ok: true });
}


async function insertConversionEvent(normalized, env) {
  const db = queueDb(env);
  await ensureQueueSchema(env);
  const a = normalized.attribution;
  await db.prepare(`
    INSERT INTO life_conversion_events (
      event_id, journey_id, event_name, occurred_at, landing_variant, creative_code,
      utm_source, utm_medium, utm_campaign, utm_content, campaign_id, campaign_variant
    ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)
    ON CONFLICT DO NOTHING
  `).bind(
    normalized.event_id, normalized.journey_id, normalized.event_name, new Date().toISOString(),
    a.landing_variant, a.creative_code, a.utm_source, a.utm_medium, a.utm_campaign,
    a.utm_content, a.campaign_id, a.campaign_variant
  ).run();
}

async function handleConversion(request, env) {
  if (request.method !== 'POST') return fail(405);
  if (!validOrigin(request, env)) return fail(403);
  if (String(request.headers.get('X-Life-Conversion-Version') || '') !== '1') return fail(400);
  if (!/^application\/json(?:\s*;|$)/i.test(String(request.headers.get('Content-Type') || ''))) return fail(415);
  const lengthHeader = Number(request.headers.get('Content-Length') || 0);
  if (Number.isFinite(lengthHeader) && lengthHeader > OPS_MAX_BODY_BYTES) return fail(413);
  let raw;
  try { raw = await request.text(); } catch (_) { return fail(400); }
  if (encoder.encode(raw).byteLength > OPS_MAX_BODY_BYTES) return fail(413);
  let parsed;
  try { parsed = JSON.parse(raw); } catch (_) { raw = ''; return fail(400); }
  raw = '';
  const normalized = normalizeConversion(parsed);
  parsed = null;
  if (!normalized) return fail(400);
  try { await insertConversionEvent(normalized, env); } catch (_) { return fail(503); }
  return jsonResponse(202, { ok: true });
}

function funnelShape(rows) {
  const events = ['landing_view','start_clicked','quick_questions_complete','application_details_started','application_start_submitted'];
  const totals = Object.fromEntries(events.map((name) => [name, 0]));
  const creatives = {};
  for (const row of rows) {
    const event = text(row.event_name, 48);
    const code = text(row.creative_code, 8).toUpperCase() || 'A';
    const count = Number(row.event_count) || 0;
    if (Object.prototype.hasOwnProperty.call(totals, event)) totals[event] += count;
    if (!creatives[code]) creatives[code] = Object.fromEntries(events.map((name) => [name, 0]));
    if (Object.prototype.hasOwnProperty.call(creatives[code], event)) creatives[code][event] += count;
  }
  function rates(values) {
    const landing = values.landing_view || 0;
    const started = values.start_clicked || 0;
    const submitted = values.application_start_submitted || 0;
    return {
      landing_to_start: landing ? Number((started / landing).toFixed(4)) : 0,
      landing_to_submission: landing ? Number((submitted / landing).toFixed(4)) : 0,
      start_to_submission: started ? Number((submitted / started).toFixed(4)) : 0
    };
  }
  return {
    totals: Object.assign({}, totals, { rates: rates(totals) }),
    creatives: Object.fromEntries(Object.entries(creatives).sort().map(([code, values]) => [code, Object.assign({}, values, { rates: rates(values) })]))
  };
}

async function handleConversionSummary(request, env, producer) {
  if (request.method !== 'GET') return fail(405);
  const db = queueDb(env);
  await ensureQueueSchema(env);
  const result = await db.prepare(`
    SELECT event_name, creative_code, COUNT(*) AS event_count
    FROM life_conversion_events
    GROUP BY event_name, creative_code
    ORDER BY creative_code, event_name
  `).all();
  const rows = Array.isArray(result && result.results) ? result.results : [];
  return jsonResponse(200, { ok: true, build: BUILD, producer: producer.email, funnel: funnelShape(rows) });
}

async function productionReadiness(env) {
  const checks = {
    assets_binding: !!(env && env.ASSETS && typeof env.ASSETS.fetch === 'function'),
    queue_db_binding: false,
    queue_schema: false,
    encryption_key: false,
    allowed_origin: allowedOrigins(env).includes('https://408farmers.com'),
    access_team_domain: !!normalizeTeamDomain(env && env.LIFE_ACCESS_TEAM_DOMAIN),
    access_audience: !!text(env && env.LIFE_ACCESS_AUD, 200),
    producer_allowlist: producerAllowlist(env).length > 0
  };
  try { queueDb(env); checks.queue_db_binding = true; } catch (_) {}
  if (checks.queue_db_binding) {
    try { await ensureQueueSchema(env); checks.queue_schema = true; } catch (_) {}
  }
  try { await queueCryptoKey(env); checks.encryption_key = true; } catch (_) {}
  return { ready: Object.values(checks).every(Boolean), checks };
}

async function handleReadiness(request, env, producer) {
  if (request.method !== 'GET') return fail(405);
  const report = await productionReadiness(env);
  return jsonResponse(200, { ok: true, build: BUILD, producer: producer.email, ready: report.ready, checks: report.checks });
}

async function handleProducerApi(request, env, pathname) {
  let producer;
  try { producer = await authorizedProducer(request, env); } catch (_) { producer = null; }
  if (!producer) return fail(403);
  try {
    if (pathname === OPS_QUEUE_PATH) return handleQueueList(request, env, producer);
    if (pathname === OPS_ITEM_PATH && request.method === 'DELETE') return handleQueueDelete(request, env, producer);
    if (pathname === OPS_ITEM_PATH) return handleQueueItemGet(request, env, producer);
    if (pathname === OPS_STATUS_PATH) return handleQueueStatus(request, env, producer);
    if (pathname === OPS_CONVERSIONS_PATH) return handleConversionSummary(request, env, producer);
    if (pathname === OPS_READINESS_PATH) return handleReadiness(request, env, producer);
  } catch (_) {
    return fail(503);
  }
  return fail(404);
}

async function handleApplicationInit(request, env) {
  if (request.method !== 'POST') return fail(405);
  if (!validOrigin(request, env)) return fail(403);
  if (String(request.headers.get('X-Life-Request-Version') || '') !== '1') return fail(400);
  if (!/^application\/json(?:\s*;|$)/i.test(String(request.headers.get('Content-Type') || ''))) return fail(415);

  const lengthHeader = Number(request.headers.get('Content-Length') || 0);
  if (Number.isFinite(lengthHeader) && lengthHeader > MAX_BODY_BYTES) return fail(413);

  let rawBody;
  try { rawBody = await request.text(); } catch (_) { return fail(400); }
  if (encoder.encode(rawBody).byteLength > MAX_BODY_BYTES) return fail(413);

  let parsed;
  try { parsed = JSON.parse(rawBody); } catch (_) { rawBody = ''; return fail(400); }
  rawBody = '';

  const normalized = normalize(parsed);
  parsed = null;
  if (!normalized) return fail(400);

  try {
    await queueInsert(normalized, env);
  } catch (_) {
    return fail(503);
  }
  return jsonResponse(202, { ok: true });
}


function pageAssetRoute(pathname) {
  const path = String(pathname || '');

  // Cloudflare Pages Advanced Mode (_worker.js) owns all requests. Pages
  // _redirects rules are not applied to Function/Worker-served requests, so
  // mirror the deployment's intended page rewrites here before ASSETS.fetch.
  if (path === '/home/Wowindex.html') {
    return { redirect: '/home/', status: 301 };
  }

  if (path === '/contact' || path === '/contact/') return { asset: '/contact/index.html' };
  if (path === '/buyer' || path === '/buyer/') return { asset: '/buyer/index.html' };
  if (path === '/life' || path === '/life/') return { asset: '/life/index.html' };
  if (path === '/life-ops' || path === '/life-ops/') return { asset: '/life-ops/index.html' };
  if (path === '/neighbor' || path === '/neighbor/' || path.startsWith('/neighbor/r/')) return { asset: '/neighbor/index.html' };

  if (path.startsWith('/home/qr/') || path.startsWith('/home/campaign/')) return { asset: '/home/index.html' };
  if (path.startsWith('/home/') && path !== '/home/index.html') return { asset: '/home/index.html' };

  if (path.startsWith('/auto-bundle/') && path !== '/auto-bundle/index.html') return { asset: '/auto-bundle/index.html' };
  if (path.startsWith('/healthcare/') && path !== '/healthcare/index.html') return { asset: '/healthcare/index.html' };
  if (path.startsWith('/teachers/') && path !== '/teachers/index.html') return { asset: '/teachers/index.html' };
  if (path.startsWith('/tech/') && path !== '/tech/index.html') return { asset: '/tech/index.html' };
  if (path.startsWith('/engineers/') && path !== '/engineers/index.html') return { asset: '/engineers/index.html' };
  if (path === '/score' || path === '/score/') return { asset: '/score/index.html' };

  return null;
}

function assetRequestFor(request, pathname) {
  const target = new URL(request.url);
  target.pathname = pathname;
  return new Request(target.toString(), request);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === API_PATH) return handleApplicationInit(request, env);
    if (url.pathname === CONVERSION_PATH) return handleConversion(request, env);
    if (url.pathname.startsWith('/api/life/producer/')) return handleProducerApi(request, env, url.pathname);

    if (request.method === 'GET' || request.method === 'HEAD') {
      const pageRoute = pageAssetRoute(url.pathname);
      if (pageRoute && pageRoute.redirect) {
        const destination = new URL(pageRoute.redirect, url);
        return Response.redirect(destination.toString(), pageRoute.status || 302);
      }
      if (pageRoute && pageRoute.asset) {
        return env.ASSETS.fetch(assetRequestFor(request, pageRoute.asset));
      }
    }

    return env.ASSETS.fetch(request);
  }
};
