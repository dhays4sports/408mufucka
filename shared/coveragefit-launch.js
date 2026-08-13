(function (window, document) {
  'use strict';

  var DEFAULTS = {
    baseUrl: 'https://coveragefit.com/transition/',
    source: '408farmers',
    assessment: 'home',
    fallbackUrl: '/home#form',
    sessionStorageKey: 'cf_integration_session_id',
    campaignStorageKey: 'cf_campaign',
    utmStorageKey: 'cf_utm_attribution'
  };



  var PROFILE_PARAM_MAP = {
    firstName: 'first_name',
    lastName: 'last_name',
    phone: 'phone',
    email: 'email',
    propertyAddress: 'property_address',
    reviewContext: 'review_context',
    homeReviewGoal: 'home_review_goal',
    occupationSegment: 'occupation_segment',
    housingContext: 'housing_context',
    reviewTiming: 'review_timing',
    closingDate: 'closing_date',
    occupancy: 'occupancy',
    closingUrgency: 'closing_urgency',
    partnerId: 'partner_id',
    referralSource: 'referral_source'
  };

  var ADDRESS_PARAM_MAP = {
    street: 'property_street',
    city: 'property_city',
    county: 'property_county',
    state: 'property_state',
    postalCode: 'property_zip',
    country: 'property_country',
    placeId: 'property_place_id',
    selectionMethod: 'address_selection_method'
  };

  function appendProfileParams(url, profile) {
    if (!profile || typeof profile !== 'object') return false;
    var appended = false;

    Object.keys(PROFILE_PARAM_MAP).forEach(function (key) {
      var value = profile[key];
      if (value !== undefined && value !== null && String(value).trim() !== '') {
        url.searchParams.set(PROFILE_PARAM_MAP[key], String(value).trim());
        appended = true;
      }
    });

    var address = profile.address && typeof profile.address === 'object' ? profile.address : {};
    Object.keys(ADDRESS_PARAM_MAP).forEach(function (key) {
      var value = address[key];
      if (value !== undefined && value !== null && String(value).trim() !== '') {
        url.searchParams.set(ADDRESS_PARAM_MAP[key], String(value).trim());
        appended = true;
      }
    });

    if (appended) {
      url.searchParams.set('prefill', '1');
      url.searchParams.set('handoff_version', '1');
    }

    return appended;
  }

  var PASSTHROUGH_KEYS = [
    'campaign', 'campaign_id', 'campaign_variant', 'campaign_zip',
    'utm_source', 'utm_medium', 'utm_campaign',
    'utm_term', 'utm_content', 'creative', 'ref', 'referral'
  ];

  function safeStorage(type) {
    try {
      var storage = window[type];
      var testKey = '__cf_storage_test__';
      storage.setItem(testKey, '1');
      storage.removeItem(testKey);
      return storage;
    } catch (error) {
      return null;
    }
  }

  function createSessionId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID();
    }
    return 'cf-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }

  function getSessionId() {
    var sessionStorage = safeStorage('sessionStorage');
    var localStorage = safeStorage('localStorage');
    var key = DEFAULTS.sessionStorageKey;
    var existing = (sessionStorage && sessionStorage.getItem(key)) ||
      (localStorage && localStorage.getItem(key));

    if (existing) return existing;

    var created = createSessionId();
    if (sessionStorage) sessionStorage.setItem(key, created);
    if (localStorage) localStorage.setItem(key, created);
    return created;
  }

  function getStoredJson(storage, key) {
    if (!storage) return {};
    try {
      var value = storage.getItem(key);
      return value ? JSON.parse(value) : {};
    } catch (error) {
      return {};
    }
  }

  function currentQuery() {
    try {
      return new URLSearchParams(window.location.search || '');
    } catch (error) {
      return new URLSearchParams('');
    }
  }

  function getAttribution() {
    var query = currentQuery();
    var localStorage = safeStorage('localStorage');
    var storedUtm = getStoredJson(localStorage, DEFAULTS.utmStorageKey);
    var attribution = {};

    var explicitValues = {};
    PASSTHROUGH_KEYS.forEach(function (key) {
      var explicit = query.get(key);
      var stored = storedUtm[key];
      if (explicit) {
        attribution[key] = explicit;
        explicitValues[key] = explicit;
      } else if (stored) {
        attribution[key] = stored;
      }
    });

    if (localStorage && Object.keys(explicitValues).length) {
      var merged = Object.assign({}, storedUtm, explicitValues);
      try { localStorage.setItem(DEFAULTS.utmStorageKey, JSON.stringify(merged)); } catch (error) {}
      if (explicitValues.campaign) {
        try { localStorage.setItem(DEFAULTS.campaignStorageKey, explicitValues.campaign); } catch (error) {}
      }
    }

    if (!attribution.campaign) {
      attribution.campaign = (window.CFCampaign && window.CFCampaign.current) ||
        (localStorage && localStorage.getItem(DEFAULTS.campaignStorageKey)) ||
        'direct';
    }

    if (window.Farmers408FlyerCampaign && typeof window.Farmers408FlyerCampaign.apply === 'function') {
      attribution = window.Farmers408FlyerCampaign.apply(attribution);
    }

    return attribution;
  }

  function normalizeEntry(entry) {
    if (entry) return String(entry).replace(/^\/+|\/+$/g, '') || 'unknown';
    var pathname = (window.location && window.location.pathname) || '/';
    return pathname.replace(/^\/+|\/+$/g, '') || 'homepage';
  }

  function getConfig(options) {
    var siteConfig = window.LANDING_PAGE_CONFIG || {};
    var input = options || {};
    return {
      baseUrl: input.baseUrl || siteConfig.coverageFitTransitionUrl || siteConfig.coverageFitHomeUrl || DEFAULTS.baseUrl,
      source: input.source || DEFAULTS.source,
      assessment: input.assessment || DEFAULTS.assessment,
      fallbackUrl: input.fallbackUrl || siteConfig.coverageFitFallbackUrl || DEFAULTS.fallbackUrl,
      entry: normalizeEntry(input.entry),
      campaign: input.campaign || null,
      extra: input.extra || {},
      profile: input.profile || null,
      next: input.next || null
    };
  }

  function buildUrl(options) {
    var config = getConfig(options);
    var attribution = getAttribution();
    var url;

    try {
      url = new URL(config.baseUrl, window.location.origin);
    } catch (error) {
      throw new Error('Invalid CoverageFit base URL: ' + config.baseUrl);
    }

    var campaign = config.campaign || attribution.campaign || 'direct';
    url.searchParams.set('campaign', campaign);
    url.searchParams.set('source', config.source);
    url.searchParams.set('entry', config.entry);
    url.searchParams.set('assessment', config.assessment);
    url.searchParams.set('session_id', getSessionId());

    // Open the animated transition directly. Form handoffs can explicitly choose
    // the next same-origin CoverageFit route; general launch surfaces retain Home.
    if (url.pathname === '/transition/' || url.pathname === '/transition') {
      url.searchParams.set('next', config.next || '/home/');
    }

    PASSTHROUGH_KEYS.forEach(function (key) {
      if (key === 'campaign') return;
      if (key === 'referral') {
        if (attribution[key] && !url.searchParams.has('ref')) {
          url.searchParams.set('ref', attribution[key]);
        }
        return;
      }
      if (attribution[key]) url.searchParams.set(key, attribution[key]);
    });

    appendProfileParams(url, config.profile);

    Object.keys(config.extra).forEach(function (key) {
      var value = config.extra[key];
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });

    return url.toString();
  }

  function emitLaunchEvent(destination, options) {
    var config = getConfig(options);
    var detail = {
      event: 'coveragefit_assessment_launch',
      destination: destination,
      campaign: (options && options.campaign) || getAttribution().campaign || 'direct',
      source: config.source,
      entry: config.entry,
      assessment: config.assessment,
      session_id: getSessionId()
    };

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(detail);

    if (typeof window.CustomEvent === 'function') {
      document.dispatchEvent(new window.CustomEvent('coveragefit:launch', { detail: detail }));
    }

    return detail;
  }

  function launch(options) {
    // Serialize only the allowlisted prospect fields needed by CoverageFit.
    var profile = options && options.profile ? options.profile : null;
    var config = getConfig(options);
    var destination;

    try {
      destination = buildUrl(options);
      emitLaunchEvent(destination, options);
      if (profile && typeof window.CustomEvent === 'function') {
        document.dispatchEvent(new window.CustomEvent('coveragefit:profile-ready', { detail: profile }));
      }
    } catch (error) {
      destination = config.fallbackUrl;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'coveragefit_launch_fallback',
        entry: config.entry,
        assessment: config.assessment,
        fallback: destination,
        reason: error.message
      });
    }

    if (!options || options.navigate !== false) {
      window.location.assign(destination);
    }

    return destination;
  }


  function parseExtra(element) {
    var extra = {};
    if (!element || !element.dataset) return extra;
    Object.keys(element.dataset).forEach(function (key) {
      if (key.indexOf('cfExtra') !== 0) return;
      var suffix = key.slice(7);
      if (!suffix) return;
      var param = suffix.charAt(0).toLowerCase() + suffix.slice(1);
      param = param.replace(/[A-Z]/g, function (match) { return '_' + match.toLowerCase(); });
      extra[param] = element.dataset[key];
    });
    return extra;
  }

  function bindLaunchElements(rootElement) {
    var scope = rootElement || document;
    var elements = scope.querySelectorAll('[data-coveragefit-launch]');
    elements.forEach(function (element) {
      if (element.dataset.coveragefitBound === 'true') return;
      element.dataset.coveragefitBound = 'true';
      element.addEventListener('click', function (event) {
        event.preventDefault();
        launch({
          entry: element.dataset.cfEntry || null,
          assessment: element.dataset.cfAssessment || DEFAULTS.assessment,
          campaign: element.dataset.cfCampaign || null,
          fallbackUrl: element.dataset.cfFallback || null,
          next: element.dataset.cfNext || null,
          extra: parseExtra(element)
        });
      });
    });
    return elements.length;
  }

  window.CoverageFitLauncher = {
    version: '1.6.0',
    buildUrl: buildUrl,
    launch: launch,
    getSessionId: getSessionId,
    getAttribution: getAttribution,
    bindLaunchElements: bindLaunchElements,
    appendProfileParams: appendProfileParams,
    defaults: Object.assign({}, DEFAULTS)
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { bindLaunchElements(document); });
  } else {
    bindLaunchElements(document);
  }
})(window, document);
