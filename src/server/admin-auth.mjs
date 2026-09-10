import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, chmodSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { randomBytes, createHash, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
const scrypt = promisify(scryptCallback);
export const COOKIE = 'mozart_admin';
export const SESSION_SECONDS = 12 * 60 * 60;
export const passwordValid = value => typeof value === 'string' && value.length >= 8 && value.length <= 128 && /[A-Z]/.test(value) && /[0-9]/.test(value);
const fingerprint = value => createHash('sha256').update(value).digest('hex');
let database;
function db() {
  if (database) return database;
  const file = resolve(process.env.ADMIN_AUTH_DB || '.private/admin.sqlite');
  mkdirSync(dirname(file), { recursive: true, mode: 0o700 });
  database = new DatabaseSync(file);
  chmodSync(file, 0o600);
  database.exec(`PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS administrator (id INTEGER PRIMARY KEY CHECK(id=1), username TEXT NOT NULL, hash TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS attempts (bucket TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL);`);
  return database;
}
async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = await scrypt(password, salt, 64, { N: 32768, maxmem: 64 * 1024 * 1024 });
  return `${salt}:${hash.toString('hex')}`;
}
async function verify(password, stored) {
  if (typeof password !== 'string' || password.length > 128) return false;
  const [salt, hex] = stored.split(':');
  const actual = await scrypt(password, salt, 64, { N: 32768, maxmem: 64 * 1024 * 1024 });
  return timingSafeEqual(actual, Buffer.from(hex, 'hex'));
}
export async function initializeAdmin(username, password) {
  if (!/^[a-zA-Z0-9._-]{1,64}$/.test(username) || !passwordValid(password)) throw Error('Usuario o contraseña no válidos.');
  const hash = await hashPassword(password);
  db().prepare('INSERT INTO administrator(id,username,hash) VALUES(1,?,?)').run(username, hash);
}
export function sessionValid(token) {
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return false;
  return !!db().prepare('SELECT token FROM sessions WHERE token=? AND expires>?').get(fingerprint(token), Date.now());
}
function issueSession() {
  const token = randomBytes(32).toString('hex');
  db().prepare('DELETE FROM sessions WHERE expires<=?').run(Date.now());
  db().prepare('INSERT INTO sessions VALUES(?,?)').run(fingerprint(token), Date.now() + SESSION_SECONDS * 1000);
  return token;
}
export function revokeSession(token) {
  if (token) db().prepare('DELETE FROM sessions WHERE token=?').run(fingerprint(token));
}
export function allowAttempt(bucket) {
  const now = Date.now();
  db().prepare('DELETE FROM attempts WHERE expires<=?').run(now);
  // Atomic across Node processes. Global cap also prevents unbounded hashing work.
  const row = db().prepare(`INSERT INTO attempts VALUES(?,1,?) ON CONFLICT(bucket) DO UPDATE SET count=count+1 RETURNING count`).get(bucket, now + 5 * 60 * 1000);
  return row.count <= 20;
}
export async function login(username, password) {
  const admin = db().prepare('SELECT * FROM administrator WHERE id=1').get();
  // An unprovisioned install fails closed; no default credentials exist.
  if (!admin) return null;
  const valid = await verify(password, admin.hash);
  if (!valid || username !== admin.username) return null;
  // Prevent a login with the old hash racing a password change.
  db().exec('BEGIN IMMEDIATE');
  try {
    if (db().prepare('SELECT hash FROM administrator WHERE id=1').get().hash !== admin.hash) {
      db().exec('ROLLBACK'); return null;
    }
    const token = issueSession(); db().exec('COMMIT'); return token;
  } catch (error) { db().exec('ROLLBACK'); throw error; }
}
export async function changePassword(token, current, next) {
  if (!sessionValid(token)) return { error: 'unauthorized' };
  if (!passwordValid(next)) return { error: 'policy' };
  const admin = db().prepare('SELECT * FROM administrator WHERE id=1').get();
  if (!await verify(current, admin.hash)) return { error: 'current' };
  const hash = await hashPassword(next);
  db().exec('BEGIN IMMEDIATE');
  try {
    if (!sessionValid(token) || db().prepare('SELECT hash FROM administrator WHERE id=1').get().hash !== admin.hash) {
      db().exec('ROLLBACK'); return { error: 'unauthorized' };
    }
    db().prepare('UPDATE administrator SET hash=? WHERE id=1').run(hash);
    db().exec('DELETE FROM sessions');
    const replacement = issueSession();
    db().exec('COMMIT'); return { token: replacement };
  } catch (error) { db().exec('ROLLBACK'); throw error; }
}
