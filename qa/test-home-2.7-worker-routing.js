#!/usr/bin/env node
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
let source = fs.readFileSync(path.join(root, '_worker.js'), 'utf8');
source = source.replace('export default {', 'globalThis.__worker = {');

const runner = new Function(
  'TextEncoder','TextDecoder','URL','Request','Response','Headers','crypto','btoa','atob',
  `${source}\nreturn globalThis.__worker;`
);
const worker = runner(
  TextEncoder, TextDecoder, URL, Request, Response, Headers, globalThis.crypto,
  globalThis.btoa || ((value) => Buffer.from(value, 'binary').toString('base64')),
  globalThis.atob || ((value) => Buffer.from(value, 'base64').toString('binary'))
);

const seen = [];
const env = {
  ASSETS: {
    fetch: async (request) => {
      const url = new URL(request.url);
      seen.push(url.pathname);
      return new Response(url.pathname, { status: 200, headers: { 'Content-Type': 'text/plain' } });
    }
  }
};

async function routed(input, expected) {
  seen.length = 0;
  const response = await worker.fetch(new Request(`https://408farmers.com${input}`), env);
  assert.equal(response.status, 200, `${input} should be served successfully`);
  assert.equal(seen.at(-1), expected, `${input} should internally serve ${expected}`);
}

(async () => {
  await routed('/home/qr/95118/rate/', '/home/index.html');
  await routed('/home/qr/95118/fit/', '/home/index.html');
  await routed('/home/qr/10001/rate/', '/home/index.html');
  await routed('/home/campaign/home_flyer_95118_rate/', '/home/index.html');
  await routed('/neighbor/r/ref_ABCDEFGHIJKLMNOP', '/neighbor/index.html');
  await routed('/shared/styles.css', '/shared/styles.css');
  await routed('/shared/flyer-campaign.js', '/shared/flyer-campaign.js');

  seen.length = 0;
  const redirect = await worker.fetch(new Request('https://408farmers.com/home/Wowindex.html'), env);
  assert.equal(redirect.status, 301);
  assert.equal(redirect.headers.get('location'), 'https://408farmers.com/home/');
  assert.equal(seen.length, 0, 'redirect should not hit static assets');

  console.log('408-HOME-2.7 Advanced Mode worker routing QA: 10/10 passed');
})().catch((error) => {
  console.error(error.stack || error);
  process.exit(1);
});
