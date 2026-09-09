# Despliegue y mantenimiento

## Estructura

`dist/` contiene todos los archivos públicos y editables. `docs/` son documentos internos, `scripts/` contiene utilidades opcionales y `.openai/hosting.json` describe la salida estática para Sites, sin registro ni despliegue activo. No hay base de datos ni variables secretas.

## Publicación estática

Sube el contenido de `dist/` a la raíz pública de tu proyecto. No es necesario ejecutar un build. En Cloudflare Pages, `_headers` añade cabeceras; otros servidores pueden ignorarlo y necesitan configuración equivalente. El archivo no cambia nada por sí solo en Nginx o Apache.

El ZIP interior `publicar-solo-web.zip` es para carga directa. El ZIP exterior incluye información interna: no debe publicarse entero. Si el dominio ya sirve otras aplicaciones, publica en un proyecto de prueba y cambia únicamente la raíz de esta web cuando compruebes el resultado.

## Cabeceras para el servidor que ya utilices

Configura en el virtual host de esta web: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` y `Permissions-Policy: camera=(), microphone=(), geolocation=()`.

Política CSP de esta entrega:

```text
default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'none'
```

Esta política corresponde a una web sin backend, analítica, recursos externos ni envíos de formulario HTTP. Los borradores se abren mediante enlaces `mailto:`. Si añades formularios remotos, analítica, una agenda embebida o un chat, tendrás que permitir de forma específica los orígenes necesarios y revisar el consentimiento. No cambies la política a permisos generales por defecto.

Usa HTTPS en el alojamiento. Comprime HTML, CSS y JavaScript con la función de tu servidor. La caché de los recursos es de una hora, ya que los nombres no llevan hash; `config.js` y HTML deben revalidarse. Tras un cambio urgente, purga la caché del proveedor si hace falta.

Configura el documento 404 a `404.html` manteniendo código de estado 404. En Cloudflare Pages esa página estática se usa como página de error; en otros servidores configúrala según su documentación.

## Edición

- Textos, servicios y precios: `dist/index.html` y las páginas de concepto cuando corresponda.
- Color, tipografía y responsive: `dist/assets/styles.css`.
- Contacto y enlaces: `dist/assets/config.js`. Actualiza también los enlaces HTML de respaldo y la información legal si cambias el email.
- Menú, formulario y calculadoras: `dist/assets/app.js`. Fórmulas puras: `dist/assets/calculators.js`.
- Imágenes: sustituye los WebP conservando los tamaños/formatos o actualiza `src`, `srcset`, dimensiones y textos alternativos. No describas las imágenes generadas como fotografías de clientes.
- Metadatos: actualiza título, descripción, canonical, Open Graph, sitemap y robots cuando cambie el dominio o la estructura. Las páginas legales en borrador incluyen `noindex`; retirarlo cuando estén terminadas si deseas indexarlas.

## Revisión después de publicar

Abre portada y conceptos desde móvil y ordenador. Prueba menú, enlaces de planes, calculadoras con cero y valores negativos de resultado, preguntas frecuentes y preparación de email. Comprueba que el destinatario es correcto y envía una consulta real a tu propia cuenta. Revisa 404, HTTPS, imagen social y configuración del alojamiento. Los datos introducidos se quedan en el navegador hasta que el visitante decide abrir su aplicación de correo.

## Fuentes técnicas consultadas

- Carga directa de Cloudflare Pages: https://developers.cloudflare.com/pages/get-started/direct-upload/
- HTML estático en Pages: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/

No se ha contratado ningún proveedor ni ejecutado un despliegue en esta entrega.
