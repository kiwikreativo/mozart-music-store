import type { APIRoute } from 'astro';
import { allowAttempt, login } from '../../../server/admin-auth.mjs';
import { readBody, reply, setSession } from '../../../server/auth-http';
export const prerender = false;
export const POST: APIRoute = async context => {
  let body; try { body = await readBody(context); } catch { return reply('Solicitud no válida.', 400); }
  if (!allowAttempt('login')) return reply('Demasiados intentos. Inténtalo de nuevo en cinco minutos.', 429);
  if (typeof body.username !== 'string' || body.username.length > 64 || typeof body.password !== 'string') return reply('El nombre de usuario o la contraseña son incorrectos.', 401);
  const token = await login(body.username, body.password);
  if (!token) return reply('El nombre de usuario o la contraseña son incorrectos.', 401);
  setSession(context, token); return reply('Sesión iniciada.');
};
