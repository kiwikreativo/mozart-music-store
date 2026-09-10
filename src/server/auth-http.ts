import type { APIContext } from 'astro';
import { COOKIE, SESSION_SECONDS } from './admin-auth.mjs';
export function setSession(context: APIContext, token: string) {
  context.cookies.set(COOKIE, token, { httpOnly: true, sameSite: 'strict', secure: context.url.protocol === 'https:', path: '/music', maxAge: SESSION_SECONDS });
}
export const reply = (message: string, status = 200, field?: string) => new Response(JSON.stringify({ message, field }), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
export async function readBody(context: APIContext) {
  if (context.request.headers.get('origin') !== context.url.origin) throw Error('origin');
  if (!context.request.headers.get('content-type')?.includes('application/json')) throw Error('type');
  const reader = context.request.body?.getReader();
  if (!reader) throw Error('body');
  let length = 0; const chunks: Uint8Array[] = [];
  while (true) {
    const {done, value} = await reader.read(); if (done) break;
    length += value.length;
    if (length > 4096) { await reader.cancel(); throw Error('size'); }
    chunks.push(value);
  }
  const body = JSON.parse(Buffer.concat(chunks).toString());
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw Error('body');
  return body;
}
