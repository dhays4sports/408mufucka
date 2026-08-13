(function (window, document) {
  'use strict';

  var form = document.querySelector('form[data-home-progressive-lead="true"]');
  var contract = window.HomeJourneyContract;
  var baseline = window.HomeJourneyBaseline;
  var continuity = window.HomeJourneyContinuity;
  if (!form || !contract) return;

  var steps = Array.prototype.slice.call(form.querySelectorAll('[data-home-lead-step]'));
  var progress = form.querySelector('[data-home-lead-progress]');
  var progressLabel = form.querySelector('[data-home-lead-progress-label]');
  var progressBar = form.querySelector('[data-home-lead-progress-bar]');
  var next = form.querySelector('[data-home-lead-next]');
  var back = form.querySelector('[data-home-lead-back]');
  var reviewContext = form.querySelector('[data-home-review-context]');
  var propertyFields = form.querySelector('[data-home-property-fields]');
  var propertyAddress = form.elements.property_address;
  var stepTwoTitle = form.querySelector('[data-home-lead-step-two-title]');
  var stepTwoHelper = form.querySelector('[data-home-lead-step-two-helper]');
  var submitLabel = form.querySelector('[data-home-lead-submit-label]');
  var live = document.querySelector('[data-home-engagement-live]');
  var current = 0;
  var active = false;

  function emit(name, extra, onceKey) {
    if (!baseline || typeof baseline.emit !== 'function') return;
    baseline.emit(name, extra || {}, onceKey ? { onceKey: onceKey } : {});
  }

  function announce(message) {
    if (!live) return;
    live.textContent = '';
    window.setTimeout(function () { live.textContent = message; }, 20);
  }

  function focusFirst(step) {
    var target = step.querySelector('input:not([type="hidden"]), select, button');
    if (target) target.focus({ preventScroll: true });
  }

  function showStep(index, options) {
    current = Math.max(0, Math.min(index, steps.length - 1));
    steps.forEach(function (step, stepIndex) { step.hidden = stepIndex !== current; });
    var number = current + 1;
    progressLabel.textContent = 'Your details · ' + number + ' of ' + steps.length;
    progressBar.style.width = ((number / steps.length) * 100) + '%';
    var progressTrack = progressBar.parentElement;
    if (progressTrack) {
      progressTrack.setAttribute('aria-valuenow', String(number));
      progressTrack.setAttribute('aria-valuetext', number + ' of ' + steps.length);
    }
    back.hidden = current === 0;
    continuity?.saveFromForm?.(form, { stage: contract.STAGES.LEAD_CAPTURE, leadStep: number, engagementStep: 3 });
    emit(contract.EVENTS.LEAD_CAPTURE_STEP_VIEWED, {
      stage: contract.STAGES.LEAD_CAPTURE,
      step: number,
      step_count: steps.length
    });
    var legend = steps[current].querySelector('legend');
    announce('Your details, step ' + number + ' of ' + steps.length + '. ' + (legend ? legend.textContent : ''));
    if (options && options.focus) focusFirst(steps[current]);
  }

  function validContactStep() {
    var names = ['first_name', 'last_name', 'phone', 'email'];
    for (var index = 0; index < names.length; index += 1) {
      var field = form.elements[names[index]];
      if (!field) continue;
      if (names[index] === 'phone') {
        var digits = String(field.value || '').replace(/\D/g, '');
        field.setCustomValidity(digits.length >= 10 ? '' : 'Please enter a valid phone number.');
      }
      if (!field.checkValidity()) {
        field.reportValidity();
        field.focus();
        return false;
      }
    }
    return true;
  }

  function continueToProperty() {
    if (!validContactStep()) return;
    emit(contract.EVENTS.LEAD_CAPTURE_STEP_COMPLETED, {
      stage: contract.STAGES.LEAD_CAPTURE,
      step: 1,
      step_count: steps.length
    });
    showStep(1, { focus: true });
  }

  function configureContext(housingContext, formFirst) {
    var branch = continuity?.resolveBranch?.(housingContext) || null;
    var renter = branch?.destinationType === 'renters' || housingContext === 'renter';
    reviewContext.hidden = !formFirst;
    if (renter) {
      propertyFields.hidden = true;
      propertyAddress.required = false;
      stepTwoTitle.textContent = 'One last step';
      stepTwoHelper.textContent = 'Confirm that Dylan may contact you directly about renters options.';
      submitLabel.textContent = 'Send My Renters Review Request';
    } else {
      propertyFields.hidden = false;
      propertyAddress.required = true;
      stepTwoTitle.textContent = 'Where is the property?';
      stepTwoHelper.textContent = 'Confirm the property, then give Dylan permission to follow up about your request.';
      submitLabel.textContent = 'Continue to My Coverage Review';
    }
    if (branch) {
      emit(contract.EVENTS.BRANCH_RESOLVED, {
        stage: contract.STAGES.LEAD_CAPTURE,
        branch: branch.key,
        destination_type: branch.destinationType,
        property_required: branch.propertyRequired
      }, 'branch_resolved_' + branch.key);
    }
  }

  function activate(event) {
    if (active) return;
    active = true;
    var detail = event && event.detail ? event.detail : {};
    var housingContext = String(detail.housing_context || form.elements.housing_context.value || '');
    var formFirst = detail.form_first === true || form.dataset.formFirst === 'true';
    form.classList.add('home-lead-progressive-active');
    progress.hidden = false;
    next.hidden = false;
    configureContext(housingContext, formFirst);
    showStep(0);
    emit(contract.EVENTS.LEAD_CAPTURE_PRESENTED, {
      stage: contract.STAGES.LEAD_CAPTURE,
      step: 1,
      step_count: steps.length,
      housing_context: housingContext,
      form_first: formFirst
    }, 'lead_capture_presented');
  }

  next.addEventListener('click', continueToProperty);
  back.addEventListener('click', function () {
    emit(contract.EVENTS.LEAD_CAPTURE_BACK_SELECTED, {
      stage: contract.STAGES.LEAD_CAPTURE,
      step: 2,
      step_count: steps.length
    });
    showStep(0, { focus: true });
  });

  form.addEventListener('submit', function (event) {
    if (!active) return;
    if (current === 0) {
      event.preventDefault();
      event.stopImmediatePropagation();
      continueToProperty();
      return;
    }
    if (form.checkValidity()) {
      emit(contract.EVENTS.LEAD_CAPTURE_STEP_COMPLETED, {
        stage: contract.STAGES.LEAD_CAPTURE,
        step: 2,
        step_count: steps.length
      }, 'lead_capture_step_2_completed');
    }
  });

  document.addEventListener('408farmers:home-lead-revealed', activate);

  window.HomeLeadProgressive = Object.freeze({
    build: contract.BUILD,
    isActive: function () { return active; },
    currentStep: function () { return current + 1; }
  });
})(window, document);
