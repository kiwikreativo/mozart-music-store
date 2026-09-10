# Autenticación del administrador

Una sola cuenta compartida, sin registro, perfiles, recuperación ni usuarios adicionales.

## Configuración

Requiere Node 22.13 o posterior, un servidor Node y un disco privado persistente. `ADMIN_AUTH_DB` establece la ruta absoluta del archivo SQLite; por defecto se usa `.private/admin.sqlite`, excluido de Git. No lo sitúes en `public/`, `dist/` ni en un directorio servido por HTTP. El directorio debe pertenecer al usuario del servidor y persistir entre despliegues. SQLite coordina las escrituras de los procesos que comparten este mismo disco local; no usar discos efímeros ni réplicas con archivos separados.

Ejecuta `pnpm admin:setup` desde una terminal del servidor (con el mismo `ADMIN_AUTH_DB` que usará la aplicación). Solicita usuario y contraseña sin mostrar la contraseña. Solo permite crear la cuenta inicial; si ya existe, no la sustituye. No hay contraseña predeterminada. No guardes credenciales en archivos del proyecto ni variables públicas.

Construye con `pnpm build` y ejecuta `node dist/server/entry.mjs`. Configura HTTPS en el proxy de producción y la URL pública correcta para que las cookies sean Secure. No servir el panel desde una compilación estática antigua. Las páginas públicas siguen prerenderizadas; `/music/`, `/music/login/`, `/music/cambiar-contrasena/` y sus endpoints se ejecutan en Node.

## Comportamiento

Las contraseñas se guardan con scrypt y sal aleatoria. Sesiones opacas de 12 horas, almacenadas como hashes y entregadas mediante cookies HttpOnly, SameSite=Strict y Secure bajo HTTPS. Los POST requieren el Origin del sitio y JSON de tamaño limitado. Los intentos de login y cambio están limitados globalmente a 20 por cinco minutos para esta única cuenta. El cambio de contraseña valida la actual, aplica la política de 8–128 caracteres con mayúscula y número, invalida todas las sesiones y emite una sesión nueva para quien realizó el cambio. Cerrar sesión revoca el token en el servidor.

El CRUD del catálogo mantiene su implementación previa en memoria del navegador; esta tarea protege el acceso administrativo, no añade persistencia de productos.

## Verificación

`pnpm test:auth` prueba hashing, cuenta única, política, cambio real, revocación y límites con un archivo temporal. Para pruebas manuales, usa una instancia aislada con su propio `ADMIN_AUTH_DB` y una cuenta de prueba. No pruebes cambios de contraseña sobre la cuenta real de la tienda.
