// Run only against an isolated test instance with a disposable administrator.
import assert from 'node:assert/strict';
const base=process.env.AUTH_TEST_URL;
if(!base||!process.env.AUTH_TEST_USERNAME||!process.env.AUTH_TEST_PASSWORD)throw Error('Test instance and test credentials are required.');
const username=process.env.AUTH_TEST_USERNAME, password=process.env.AUTH_TEST_PASSWORD;
const updated='UpdatedTest456!';
let cookie='';
const post=async(action,body,origin=base)=>{
 const result=await fetch(`${base}/music/api/${action}`,{method:'POST',headers:{'Content-Type':'application/json',Origin:origin,Cookie:cookie},body:JSON.stringify(body),redirect:'manual'});
 const set=result.headers.get('set-cookie');if(set)cookie=set.split(';')[0];
 return {status:result.status,body:await result.json(),set};
};
for(const path of ['/music/','/music/cambiar-contrasena/']){const response=await fetch(base+path,{redirect:'manual'});assert.equal(response.status,303);assert.equal(response.headers.get('location'),'/music/login/');}
assert.equal((await post('password',{current:password,next:updated,confirm:updated})).status,401);
assert.equal((await post('login',{username,password},'https://untrusted.example')).status,400);
assert.equal((await post('login',{username,password:'incorrect'})).status,401);
const logged=await post('login',{username,password});assert.equal(logged.status,200);assert.match(logged.set,/HttpOnly/i);assert.match(logged.set,/SameSite=Strict/i);
let dashboard=await fetch(base+'/music/',{headers:{Cookie:cookie}});assert.equal(dashboard.status,200);assert.equal(dashboard.headers.get('cache-control'),'no-store');
assert.equal((await post('password',{current:'incorrect',next:updated,confirm:updated})).body.message,'La contraseña actual es incorrecta.');
assert.equal((await post('password',{current:password,next:'short',confirm:'short'})).status,400);
assert.equal((await post('password',{current:password,next:updated,confirm:'Mismatch123'})).body.message,'Las contraseñas no coinciden.');
const oldCookie=cookie;
assert.equal((await post('password',{current:password,next:updated,confirm:updated})).body.message,'Contraseña actualizada correctamente.');
assert.notEqual(cookie,oldCookie);
assert.equal((await fetch(base+'/music/',{headers:{Cookie:oldCookie},redirect:'manual'})).status,303);
assert.equal((await post('logout',{})).status,200);
assert.equal((await post('login',{username,password})).status,401);
assert.equal((await post('login',{username,password:updated})).status,200);
assert.equal((await post('password',{current:updated,next:password,confirm:password})).status,200);
assert.equal((await post('logout',{})).status,200);
console.log('HTTP authentication checks passed: redirects, Origin, error messages, real password update, rotation, old password rejection, new password login, logout.');
