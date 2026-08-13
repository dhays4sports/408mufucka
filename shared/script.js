// Always open landing pages at the top instead of restoring a previous scroll position.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
const resetLandingScroll = () => {
  const hasContinuity = Boolean(window.HomeJourneyContinuity?.read?.());
  if (!location.hash && !hasContinuity) window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
};
window.addEventListener('pageshow', () => {
  resetLandingScroll();
  setTimeout(resetLandingScroll, 50);
});

(() => {
  const HANDOFF_BUILD = '408-CONV-1.1';
  const HANDOFF_CONTRACT = 'coveragefit-handoff-v1';
  const HANDOFF_VERSION = '1.1';
  const CONSENT_VERSION = '408farmers-contact-v1';
  const LEAD_SUBMISSION_GRACE_MS = 900;
  const PENDING_LEAD_KEY = '408farmersLeadPending';
  const form = document.getElementById('leadForm');
  const status = document.getElementById('formStatus');
  const config = window.LANDING_PAGE_CONFIG || {};
  const continuity = window.HomeJourneyContinuity || null;
  if (!form) return;

  const emitHomeJourney = (eventName, properties = {}) => {
    if (form.dataset.homeJourney !== 'true') return null;
    return window.HomeJourneyBaseline?.emit?.(eventName, properties) || null;
  };

  const params = new URLSearchParams(location.search);
  ['campaign_id','campaign_variant','campaign_zip','utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(k => {
    const input = form.querySelector(`[name="${k}"]`);
    if (input) input.value = params.get(k) || input.value || '';
  });

  const pageInput = form.querySelector('[name="landing_page"]');
  if (pageInput) pageInput.value = location.href;
  const timeInput = form.querySelector('[name="submitted_at"]');
  if (timeInput) timeInput.value = new Date().toISOString();

  const normalizePhone = value => value.replace(/\D/g,'');
  const leadSnapshot = () => Object.fromEntries(new FormData(form).entries());
  const storePendingLead = () => {
    try {
      sessionStorage.setItem(PENDING_LEAD_KEY, JSON.stringify(leadSnapshot()));
    } catch (_) {}
  };
  const clearPendingLead = () => {
    try {
      sessionStorage.removeItem(PENDING_LEAD_KEY);
    } catch (_) {}
  };

  const branchPlan = () => {
    const branchField = form.dataset.cfBranchField;
    if (!branchField || !form.elements[branchField]) return { destinationType: 'coveragefit', destination: '', propertyRequired: true, key: '' };
    const value = String(form.elements[branchField].value || '').trim().toLowerCase();
    const bounded = continuity?.resolveBranch?.(value);
    if (bounded) return bounded;
    if (value === 'renter' || /^i rent\b/.test(value)) {
      return { destinationType: 'renters', destination: form.dataset.cfRenterDestination || '/contact/?intent=renters', propertyRequired: false, key: 'renter' };
    }
    return { destinationType: 'coveragefit', destination: '', propertyRequired: true, key: value };
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent='';

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submittedAt = new Date().toISOString();
    if (timeInput) timeInput.value = submittedAt;

    const phone = normalizePhone(form.elements.phone.value);
    if (phone.length < 10) {
      status.textContent='Please enter a valid phone number.';
      form.elements.phone.focus();
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    const label = button.querySelector('span:first-child');
    const original = label.textContent;
    button.disabled=true;
    label.textContent='Submitting…';

    const endpoint=(config.formEndpoint||'').trim();
    const prospectProfile = window.ProspectProfileBuilder
      ? window.ProspectProfileBuilder.fromForm(form)
      : null;

    if (prospectProfile && window.ProspectProfileBuilder) {
      window.ProspectProfileBuilder.save(prospectProfile);
    }

    const handoffCampaign = prospectProfile && prospectProfile.campaign
      ? prospectProfile.campaign
      : (form.elements.campaign ? form.elements.campaign.value : null);
    const consentInput = form.elements.consent;
    const contactConsentConfirmed = Boolean(consentInput && consentInput.checked);

    const emitLeadSubmissionStatus = (leadCaptureStatus) => {
      const events = window.HomeJourneyContract?.EVENTS;
      const stages = window.HomeJourneyContract?.STAGES;
      if (!events) return;
      const leadEvent = leadCaptureStatus === 'confirmed'
        ? events.LEAD_SUBMISSION_CONFIRMED
        : leadCaptureStatus === 'pending'
          ? events.LEAD_SUBMISSION_PENDING
          : events.LEAD_SUBMISSION_UNCONFIRMED;
      emitHomeJourney(leadEvent, {
        stage: stages?.CONFIRMATION || 'confirmation',
        status: leadCaptureStatus,
        lead_capture_status: leadCaptureStatus
      });
    };

    const continueToCoverageFit = (leadCaptureStatus = 'confirmed') => {
      emitLeadSubmissionStatus(leadCaptureStatus);

      const openDestination = () => {
        const branch = branchPlan();
        const renterDestination = branch.destinationType === 'renters'
          ? (form.dataset.cfRenterDestination || branch.destination)
          : '';
        const currentProfile = window.ProspectProfileBuilder
          ? window.ProspectProfileBuilder.fromForm(form)
          : prospectProfile;
        if (currentProfile && window.ProspectProfileBuilder) {
          window.ProspectProfileBuilder.save(currentProfile);
        }

        if (form.dataset.homeJourney === 'true') {
          continuity?.markHandoff?.(form, {
            leadCaptureStatus,
            submittedAt,
            branch: branch.key,
            destinationType: branch.destinationType
          });
        }

        if (renterDestination) {
          label.textContent='Opening Your Renters Review…';
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'renters_direct_review_handoff',
            entry: form.dataset.cfEntry || 'lead_form',
            housing_context: form.elements[form.dataset.cfBranchField].value,
            lead_capture_status: leadCaptureStatus
          });
          location.href = renterDestination;
          return;
        }

        if (form.dataset.coveragefitAfterSubmit !== 'true') {
          location.href=form.dataset.success||'thank-you.html';
          return;
        }

        if (!window.CoverageFitLauncher) {
          location.href=form.dataset.success||'thank-you.html';
          return;
        }

        const events = window.HomeJourneyContract?.EVENTS;
        const stages = window.HomeJourneyContract?.STAGES;
        if (events) {
          emitHomeJourney(events.COVERAGEFIT_LAUNCHED, {
            stage: stages?.COVERAGEFIT_HANDOFF || 'coveragefit_handoff',
            status: leadCaptureStatus,
            lead_capture_status: leadCaptureStatus
          });
        }

        label.textContent='Opening CoverageFit…';
        window.CoverageFitLauncher.launch({
          profile: currentProfile,
          campaign: handoffCampaign,
          entry: form.dataset.cfEntry || 'lead_form',
          assessment: form.dataset.cfAssessment || 'home',
          next: form.dataset.cfNext || '/assessment/',
          fallbackUrl: form.dataset.success || 'thank-you.html',
          extra: {
            launch_surface: form.dataset.cfExtraLaunchSurface || 'lead_form',
            lead_captured: leadCaptureStatus === 'confirmed' ? 'true' : 'pending',
            lead_capture_status: leadCaptureStatus,
            sender_build: form.dataset.senderBuild || HANDOFF_BUILD,
            handoff_contract: form.dataset.handoffContract || HANDOFF_CONTRACT,
            handoff_version: HANDOFF_VERSION,
            contact_consent: contactConsentConfirmed ? 'true' : 'false',
            consent_at: submittedAt,
            consent_version: CONSENT_VERSION,
            submitted_at: submittedAt
          }
        });
      };

      const engagementStarted = form.dataset.postLeadEngagement === 'true'
        && window.PostLeadEngagement
        && typeof window.PostLeadEngagement.present === 'function'
        && window.PostLeadEngagement.present({
          leadCaptureStatus,
          onContinue: openDestination
        });
      if (engagementStarted) return;

      const initialBranch = branchPlan();
      const initialRenterDestination = initialBranch.destinationType === 'renters'
        ? (form.dataset.cfRenterDestination || initialBranch.destination)
        : '';

      const invitationStarted = form.dataset.coveragefitInvitation === 'true'
        && window.CoverageFitInvitation
        && typeof window.CoverageFitInvitation.present === 'function'
        && window.CoverageFitInvitation.present({
          leadCaptureStatus,
          destinationType: initialRenterDestination ? 'renters' : 'coveragefit',
          onContinue: openDestination
        });
      if (invitationStarted) return;

      if (form.dataset.coveragefitInvitation === 'true') {
        // Safe degraded mode: retain the completed lead and require a new,
        // explicit click before opening CoverageFit. Never restore the old
        // automatic confirmation timer for an invitation-enabled route.
        status.textContent = 'Your request is complete. CoverageFit is optional; choose below only if you want to continue now.';
        button.disabled = false;
        button.type = 'button';
        label.textContent = initialRenterDestination ? 'View Renters Options (Optional)' : 'Continue to CoverageFit (Optional)';
        button.addEventListener('click', openDestination, { once: true });
        return;
      }

      const confirmationStarted = form.dataset.homeConfirmation === 'true'
        && window.HomeLeadConfirmation
        && typeof window.HomeLeadConfirmation.show === 'function'
        && window.HomeLeadConfirmation.show({
          leadCaptureStatus,
          destinationType: initialRenterDestination ? 'renters' : 'coveragefit',
          onContinue: openDestination
        });
      if (!confirmationStarted) openDestination();
    };

    if(!endpoint){
      emitHomeJourney(window.HomeJourneyContract?.EVENTS?.LEAD_SUBMISSION_ATTEMPTED, {
        stage: window.HomeJourneyContract?.STAGES?.LEAD_CAPTURE || 'lead_capture',
        status: 'local-fallback'
      });
      try {
        sessionStorage.setItem('408farmersLead',JSON.stringify(leadSnapshot()));
      } catch (_) {}
      continueToCoverageFit('local-fallback');
      return;
    }

    const submitLead = async () => {
      const response = await fetch(endpoint, {
        method:'POST',
        body:new FormData(form),
        headers:{Accept:'application/json'},
        keepalive:true
      });
      if(!response.ok) throw new Error('Submission failed');
      clearPendingLead();
      return 'confirmed';
    };

    emitHomeJourney(window.HomeJourneyContract?.EVENTS?.LEAD_SUBMISSION_ATTEMPTED, {
      stage: window.HomeJourneyContract?.STAGES?.LEAD_CAPTURE || 'lead_capture',
      status: 'attempted'
    });

    if (form.dataset.coveragefitAfterSubmit === 'true') {
      // The CoverageFit journey must not be blocked by a slow or unavailable
      // lead-delivery provider. Keepalive allows the small Formspree request to
      // continue while the browser opens CoverageFit.
      storePendingLead();
      const submission = submitLead().catch(() => 'unconfirmed');
      const leadCaptureStatus = await Promise.race([
        submission,
        new Promise(resolve => setTimeout(() => resolve('pending'), LEAD_SUBMISSION_GRACE_MS))
      ]);
      continueToCoverageFit(leadCaptureStatus);
      return;
    }

    try{
      await submitLead();
      continueToCoverageFit('confirmed');
    }catch(e){
      status.textContent='Something went wrong. Please call or text (408) 327-6377.';
      button.disabled=false;
      label.textContent=original;
    }
  });

  document.addEventListener?.('408farmers:home-handoff-retry', (event) => {
    const saved = event?.detail || continuity?.read?.();
    if (!saved || saved.stage !== 'handoff_recovery') return;
    const profile = window.ProspectProfileBuilder?.load?.() || null;
    if (!profile) {
      continuity?.clear?.();
      status.textContent = 'Your saved handoff expired. Your quick questions can be restarted below.';
      window.location.reload();
      return;
    }

    const branch = continuity?.resolveBranch?.(saved.housingContext) || branchPlan();
    emitHomeJourney(window.HomeJourneyContract?.EVENTS?.HANDOFF_RECOVERY_CONTINUED, {
      stage: window.HomeJourneyContract?.STAGES?.COVERAGEFIT_HANDOFF || 'coveragefit_handoff',
      recovery_type: 'saved_handoff',
      branch: branch?.key || '',
      destination_type: branch?.destinationType || 'coveragefit',
      lead_capture_status: saved.leadCaptureStatus || 'pending'
    });

    if (branch?.destinationType === 'renters') {
      location.href = form.dataset.cfRenterDestination || '/contact/?intent=renters';
      return;
    }
    if (!window.CoverageFitLauncher) {
      location.href = form.dataset.success || 'thank-you.html';
      return;
    }

    emitHomeJourney(window.HomeJourneyContract?.EVENTS?.COVERAGEFIT_LAUNCHED, {
      stage: window.HomeJourneyContract?.STAGES?.COVERAGEFIT_HANDOFF || 'coveragefit_handoff',
      status: saved.leadCaptureStatus || 'pending',
      recovery_type: 'saved_handoff'
    });
    window.CoverageFitLauncher.launch({
      profile,
      campaign: profile.campaign || saved.campaignId || null,
      entry: form.dataset.cfEntry || 'home_lander_form',
      assessment: form.dataset.cfAssessment || 'home',
      next: form.dataset.cfNext || '/assessment/',
      fallbackUrl: form.dataset.success || 'thank-you.html',
      extra: {
        launch_surface: form.dataset.cfExtraLaunchSurface || 'home_lander',
        lead_captured: saved.leadCaptureStatus === 'confirmed' ? 'true' : 'pending',
        lead_capture_status: saved.leadCaptureStatus || 'pending',
        sender_build: form.dataset.senderBuild || '408-HOME-2.9',
        handoff_contract: form.dataset.handoffContract || HANDOFF_CONTRACT,
        handoff_version: HANDOFF_VERSION,
        contact_consent: profile.contactPermission?.confirmed ? 'true' : 'false',
        consent_at: profile.contactPermission?.capturedAt || saved.submittedAt || '',
        consent_version: profile.contactPermission?.version || CONSENT_VERSION,
        submitted_at: saved.submittedAt || ''
      }
    });
  });

  document.addEventListener?.('408farmers:home-journey-restarted', () => {
    clearPendingLead();
    window.ProspectProfileBuilder?.clear?.();
  });
})();
