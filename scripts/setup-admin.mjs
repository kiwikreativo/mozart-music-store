import { createInterface } from 'node:readline/promises';
import { Writable } from 'node:stream';
import { initializeAdmin } from '../src/server/admin-auth.mjs';
if (!process.stdin.isTTY) throw Error('Ejecuta este comando en una terminal interactiva.');
let muted = false;
const output = new Writable({write(chunk,encoding,callback){if(!muted)process.stdout.write(chunk,encoding);callback();}});
const terminal = createInterface({input:process.stdin,output,terminal:true});
try {
  const username=await terminal.question('Nombre de usuario del administrador: ');
  process.stdout.write('Contraseña (8–128 caracteres, una mayúscula y un número): ');muted=true;
  const password=await terminal.question('');muted=false;process.stdout.write('\n');
  process.stdout.write('Confirmar contraseña: ');muted=true;
  const confirmation=await terminal.question('');muted=false;process.stdout.write('\n');
  if(password!==confirmation)throw Error('Las contraseñas no coinciden.');
  await initializeAdmin(username,password);console.log('Cuenta única creada. Ya puedes iniciar sesión en /music/login/.');
} catch(error) {console.error(error.code?.startsWith('ERR_SQLITE')?'La cuenta ya existe o el almacenamiento no está disponible. No se modificó la cuenta.':error.message);process.exitCode=1;}
finally {muted=false;terminal.close();}
