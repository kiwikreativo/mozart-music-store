import type { APIRoute } from 'astro';
import { COOKIE, revokeSession } from '../../../server/admin-auth.mjs';
import { readBody, reply } from '../../../server/auth-http';
export const prerender = false;
export const POST: APIRoute = async context => {
  try { await readBody(context); } catch { return reply('Solicitud no válida.', 400); }
  revokeSession(context.cookies.get(COOKIE)?.value);
  context.cookies.delete(COOKIE, {path:'/music'});
  return reply('Sesión cerrada.');
};
