import { defineMiddleware } from 'astro:middleware';
import { COOKIE, sessionValid } from './server/admin-auth.mjs';
export const onRequest = defineMiddleware(async (context, next) => {
  let path: string;
  try { path = decodeURIComponent(context.url.pathname).replace(/\/+/g, '/').replace(/\/+$/, '').toLowerCase(); }
  catch { return new Response('Solicitud no válida.', {status:400}); }
  if (path !== '/music' && !path.startsWith('/music/')) return next();
  const publicRoute = path === '/music/login' || path === '/music/api/login';
  try {
    const authenticated = sessionValid(context.cookies.get(COOKIE)?.value);
    if (!publicRoute && !authenticated) {
      if (path.startsWith('/music/api/')) return new Response(JSON.stringify({message:'Tu sesión ha terminado. Inicia sesión de nuevo.'}), {status:401,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
      return new Response(null, {status:303, headers:{Location:'/music/login/', 'Cache-Control':'no-store'}});
    }
    if (path === '/music/login' && authenticated) return new Response(null, {status:303, headers:{Location:'/music/', 'Cache-Control':'no-store'}});
    const response = await next();
    response.headers.set('Cache-Control', 'no-store');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'same-origin');
    return response;
  } catch {
    return new Response('El acceso administrativo no está disponible temporalmente.', {status:503,headers:{'Cache-Control':'no-store'}});
  }
});
