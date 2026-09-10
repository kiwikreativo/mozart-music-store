import type { APIRoute } from 'astro';
import { COOKIE, allowAttempt, changePassword, passwordValid } from '../../../server/admin-auth.mjs';
import { readBody, reply, setSession } from '../../../server/auth-http';
export const prerender = false;
export const POST: APIRoute = async context => {
  let body; try { body = await readBody(context); } catch { return reply('Solicitud no válida.', 400); }
  if (!allowAttempt('password')) return reply('Demasiados intentos. Inténtalo de nuevo en cinco minutos.', 429);
  if (!passwordValid(body.next)) return reply('La contraseña debe tener entre 8 y 128 caracteres, una mayúscula y un número.', 400, 'next');
  if (body.next !== body.confirm) return reply('Las contraseñas no coinciden.', 400, 'confirm');
  const result = await changePassword(context.cookies.get(COOKIE)?.value, body.current, body.next);
  if (result.error === 'current') return reply('La contraseña actual es incorrecta.', 400, 'current');
  if (result.error) return reply('Tu sesión ha terminado. Inicia sesión de nuevo.', 401);
  setSession(context, result.token!); return reply('Contraseña actualizada correctamente.');
};
