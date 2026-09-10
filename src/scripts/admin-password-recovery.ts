let recoveryCleanup: (() => void) | undefined;

function initializePasswordRecovery() {
  recoveryCleanup?.();
  const controller = new AbortController();
  const options = { signal: controller.signal };
  recoveryCleanup = () => controller.abort();
  const form = document.querySelector<HTMLFormElement>('[data-recovery-form]');
  if (!form) return;

  const feedback = form.querySelector<HTMLElement>('[data-recovery-feedback]')!;
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]')!;
  const field = (name: string) => form.elements.namedItem(name) as HTMLInputElement | null;
  const setError = (name: string, message: string) => {
    const input = field(name);
    const error = document.getElementById(`${name}-error`);
    input?.setAttribute('aria-invalid', String(Boolean(message)));
    if (error) { error.textContent = message; error.hidden = !message; }
  };
  const hideFeedback = () => { feedback.hidden = true; feedback.dataset.success = 'false'; };

  if (form.dataset.recoveryForm === 'request') {
    const email = field('email')!;
    email.addEventListener('input', () => { setError('email', ''); hideFeedback(); }, options);
    form.addEventListener('submit', event => {
      event.preventDefault();
      const valid = email.validity.valid;
      setError('email', valid ? '' : 'Ingresa un correo electrónico válido.');
      if (!valid) { email.focus(); return; }
      feedback.dataset.success = 'true';
      feedback.textContent = 'Formulario validado. El envío del correo se conectará cuando se implemente el servicio de recuperación.';
      feedback.hidden = false;
    }, options);
    return;
  }

  const validatePassword = () => {
    const next = field('next')!;
    const confirm = field('confirm')!;
    const rules = { length: next.value.length >= 8 && next.value.length <= 128, uppercase: /[A-Z]/.test(next.value), number: /[0-9]/.test(next.value) };
    Object.entries(rules).forEach(([key, met]) => {
      const item = form.querySelector<HTMLElement>(`[data-rule="${key}"]`)!;
      item.dataset.met = String(met);
      item.querySelector('i')!.className = `ph-bold ${met ? 'ph-check-circle' : 'ph-circle'}`;
      item.querySelector<HTMLElement>('[data-rule-state]')!.textContent = met ? ': cumplido' : ': pendiente';
    });
    const score = Object.values(rules).filter(Boolean).length;
    form.querySelector<HTMLMeterElement>('[data-strength]')!.value = score;
    form.querySelector<HTMLElement>('[data-strength-label]')!.textContent = score === 3 ? 'Segura' : score === 2 ? 'Media' : 'Débil';
    const mismatch = Boolean(confirm.value) && next.value !== confirm.value;
    setError('confirm', mismatch ? 'Las contraseñas no coinciden.' : '');
    return score === 3 && next.value === confirm.value;
  };

  form.addEventListener('input', event => {
    if (event.target instanceof HTMLInputElement) setError(event.target.name, '');
    hideFeedback();
    validatePassword();
  }, options);
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!validatePassword()) {
      feedback.textContent = 'Revisa los requisitos de la nueva contraseña.';
      feedback.hidden = false;
      field('next')?.focus();
      return;
    }
    feedback.dataset.success = 'true';
    feedback.textContent = 'Formulario validado. El cambio se conectará cuando se implemente el servicio de recuperación.';
    feedback.hidden = false;
  }, options);
}

initializePasswordRecovery();
document.addEventListener('astro:page-load', initializePasswordRecovery);
document.addEventListener('astro:before-swap', () => recoveryCleanup?.());
