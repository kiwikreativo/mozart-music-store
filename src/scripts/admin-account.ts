let cleanup: (() => void) | undefined;
function initializeAccount() {
  cleanup?.();
  const controller = new AbortController(); const options = {signal:controller.signal};
  cleanup = () => controller.abort();
  const request = async (action: string, body: object) => {
    const response = await fetch(`/music/api/${action}`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    const data = await response.json();
    return {response, data};
  };
  document.querySelectorAll<HTMLButtonElement>('[data-change-password]').forEach(button=>button.addEventListener('click',()=>{location.href='/music/cambiar-contrasena/';},options));
  let loggingOut = false;
  document.querySelectorAll<HTMLButtonElement>('[data-logout]').forEach(button=>button.addEventListener('click',async()=>{
    if (loggingOut) return; loggingOut=true; button.disabled=true;
    try {const {response}=await request('logout',{});if(response.ok||response.status===401){location.replace('/music/login/');return;}throw Error();}
    catch {let error=document.querySelector<HTMLElement>('[data-logout-error]');if(!error){error=document.createElement('p');error.dataset.logoutError='';error.setAttribute('role','alert');document.querySelector('.admin-header')?.after(error);}error.textContent='No se pudo cerrar la sesión. Inténtalo de nuevo.';}
    finally {loggingOut=false;button.disabled=false;}
  },options));
  document.querySelectorAll<HTMLButtonElement>('[data-theme-choice]').forEach(button=>button.addEventListener('click',()=>{
    const theme=button.dataset.themeChoice!;document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;try{localStorage.setItem('mozart-theme',theme)}catch{}
  },options));
  document.querySelectorAll<HTMLButtonElement>('[data-password-toggle]').forEach(button=>button.addEventListener('click',()=>{
    const field=document.getElementById(button.dataset.passwordToggle!) as HTMLInputElement;
    const visible=field.type==='password';field.type=visible?'text':'password';
    button.setAttribute('aria-pressed',String(visible));button.setAttribute('aria-label',`${visible?'Ocultar':'Mostrar'} ${button.dataset.label}`);
    button.querySelector('i')!.className=`ph-bold ${visible?'ph-eye-slash':'ph-eye'}`;
  },options));
  const form=document.querySelector<HTMLFormElement>('[data-auth-form]');if(!form)return;
  const feedback=form.querySelector<HTMLElement>('[data-auth-feedback]')!;
  const submit=form.querySelector<HTMLButtonElement>('[type=submit]')!;
  const isLogin=form.dataset.authForm==='login';const idle=submit.textContent!;let busy=false;
  const field=(name:string)=>form.elements.namedItem(name) as HTMLInputElement;
  const setError=(name:string,message:string)=>{const element=field(name);element.setAttribute('aria-invalid',String(!!message));const error=document.getElementById(`${name}-error`);if(error){error.textContent=message;error.hidden=!message;}};
  const validate=()=>{
    if(isLogin)return true;
    const next=field('next').value;const confirm=field('confirm').value;
    const rules={length:next.length>=8&&next.length<=128,uppercase:/[A-Z]/.test(next),number:/[0-9]/.test(next)};
    Object.entries(rules).forEach(([key,met])=>{const item=form.querySelector<HTMLElement>(`[data-rule="${key}"]`)!;item.dataset.met=String(met);item.querySelector('i')!.className=`ph-bold ${met?'ph-check-circle':'ph-circle'}`;item.querySelector('[data-rule-state]')!.textContent=met?': cumplido':': pendiente';});
    const score=Object.values(rules).filter(Boolean).length;(form.querySelector('[data-strength]') as HTMLMeterElement).value=score;form.querySelector('[data-strength-label]')!.textContent=score===3?'Segura':score===2?'Media':'Débil';
    const mismatch=!!confirm&&next!==confirm;setError('confirm',mismatch?'Las contraseñas no coinciden.':'');
    return score===3&&!mismatch;
  };
  form.addEventListener('input',event=>{if(event.target instanceof HTMLInputElement&&event.target.name!=='username')setError(event.target.name,'');feedback.hidden=true;validate();},options);
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(busy)return;
    if(!validate()){feedback.textContent='Revisa los requisitos de la nueva contraseña.';feedback.hidden=false;field('next').focus();return;}
    busy=true;submit.disabled=true;submit.textContent=isLogin?'Iniciando sesión…':'Actualizando…';feedback.hidden=true;
    const body=Object.fromEntries(new FormData(form));
    try {
      const {response,data}=await request(isLogin?'login':'password',body);
      if(!response.ok){if(response.status===401&&!isLogin){location.replace('/music/login/');return;}if(data.field)setError(data.field,data.message);feedback.dataset.success='false';feedback.textContent=data.message;feedback.hidden=false;return;}
      if(isLogin){location.replace('/music/');return;}
      form.reset();validate();feedback.dataset.success='true';feedback.textContent=data.message;feedback.hidden=false;
      form.querySelectorAll<HTMLButtonElement>('[data-password-toggle]').forEach(button=>{field(button.dataset.passwordToggle!).type='password';button.setAttribute('aria-pressed','false');button.setAttribute('aria-label',`Mostrar ${button.dataset.label}`);button.querySelector('i')!.className='ph-bold ph-eye';});
    } catch {feedback.dataset.success='false';feedback.textContent='No se pudo completar la solicitud. Inténtalo de nuevo.';feedback.hidden=false;}
    finally {busy=false;submit.disabled=false;submit.textContent=idle;}
  },options);
}
initializeAccount();
document.addEventListener('astro:page-load',initializeAccount);
document.addEventListener('astro:before-swap',()=>cleanup?.());
// A restored page must revalidate its private session before showing cached UI.
window.addEventListener('pageshow',event=>{if(event.persisted)location.reload();});
