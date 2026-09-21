# MANTENLO V1.8.2 — MVP conectado a Supabase

Esta versión es una **PWA** (Progressive Web App): se abre en navegador, funciona en celular y puede instalarse como aplicación. Es un prototipo funcional para validar la idea y presentar el concepto. **Ya usa Supabase como base de datos compartida entre dispositivos.** Todavía no incluye pagos reales, mapas/GPS reales ni autenticación de cuentas.

## Archivos
- `cliente.html` — aplicación del cliente.
- `socio.html` — aplicación del técnico/socio.
- `admin.html` — panel administrativo.
- `styles.css` — estilos.
- `app.js` — lógica y datos demo compartidos.
- `manifest.json` + `sw.js` — instalación como PWA.

## Opción más fácil: probarla en tu computadora
1. Descomprime `MANTENLO_V1.zip`.
2. Abre una terminal dentro de la carpeta.
3. Ejecuta:
   - Windows: `py -m http.server 8080`
   - Mac/Linux: `python3 -m http.server 8080`
4. Abre `http://localhost:8080`.
5. Prueba las tres interfaces.

No abras los HTML con doble clic si quieres probar la instalación PWA; necesita ejecutarse desde `http://localhost` o un dominio HTTPS.

## Probar en el celular dentro de la misma red Wi-Fi
1. Ejecuta el servidor como arriba.
2. Averigua la IP local de tu computadora:
   - Windows: `ipconfig`
   - Mac: `ifconfig` o `ipconfig getifaddr en0`
3. En el celular abre `http://IP-DE-TU-PC:8080`.
4. Para instalarla, usa "Agregar a pantalla de inicio" / "Instalar aplicación" si el navegador lo ofrece.

## Publicarla gratis para compartirla
La opción más sencilla para un principiante es Netlify Drop:
1. Crea una cuenta en Netlify.
2. Entra a Netlify Drop.
3. Arrastra la carpeta `MANTENLO_V1` al área de publicación.
4. Netlify generará una dirección HTTPS pública.
5. Comparte esa dirección con inversionistas, técnicos o clientes piloto.

También puedes subirla a GitHub Pages, Cloudflare Pages o Vercel.

## Importante sobre esta versión
Esta versión es un **MVP demostrable**, no todavía un sistema de producción. Para producción debemos agregar:
- Base de datos central (Supabase/PostgreSQL u otra).
- Autenticación real.
- Roles y permisos seguros.
- GPS y mapas reales.
- Notificaciones push.
- Matching real de técnicos.
- Backend/API.
- Pagos.
- Facturación.
- Protección de datos.
- Registro y validación de socios.
- Logs, monitoreo y seguridad.

## Flujo de demostración
1. Abre `cliente.html` y crea una solicitud.
2. Abre `socio.html`; la solicitud aparecerá en solicitudes disponibles.
3. El socio puede aceptarla.
4. Abre `admin.html`; el administrador verá la solicitud y su estado.
5. El flujo puede repetirse para demostrar el concepto.


## V1.8
- Calificación real de 1 a 5 estrellas.
- Comentario opcional.
- Guarda la evaluación en `ratings`.
- Intenta recalcular el promedio del socio en `partners`.
- Al finalizar, vuelve al inicio sin borrar el historial de Supabase.


## V1.8.2
Los problemas del menú Cliente ahora cambian según la categoría seleccionada. La opción Otro abre descripción libre y Boiler incluye aviso preventivo ante olor/fuga de gas.


## V1.8.2
Corrección de selección de problemas por categoría en cliente.html.
