# Aireal Estudio: tu web y tu modelo de negocio

La web ya está preparada en `dist/`. Es una web estática completa: puedes publicarla sin instalar dependencias, compilar ni contratar una API de IA. El nombre visible es **Aireal Estudio**; `horizoncompany.es` solo se utiliza como dirección técnica y dominio canónico.

## Para verla al llegar a casa

1. Descomprime este ZIP.
2. Abre `dist/index.html` en tu navegador. Imágenes, fuentes y páginas están incluidas y funcionan sin descargarlas de terceros.
3. Si tienes Node.js 20 o posterior, puedes abrir una terminal en esta carpeta y ejecutar `npm run dev`. La web se verá en `http://localhost:4321`. No hace falta `npm install`.

El servidor opcional sirve exclusivamente `dist/`, no tus documentos internos. Para detenerlo, pulsa Ctrl+C. `npm run check` comprueba referencias locales y cálculos.

## Para publicarla

**Sube únicamente el contenido de `dist/` a la raíz pública de tu alojamiento.** `index.html` debe quedar en la raíz, junto a `assets/` y el resto de páginas. No subas la carpeta del proyecto completa: los documentos de negocio son internos.

- Alojamiento tradicional: copia el contenido de `dist/` en la carpeta pública configurada (a menudo `public_html`). Haz antes una copia de tu web actual y respeta cualquier configuración de otras aplicaciones que compartan el servidor.
- Cloudflare Pages con carga directa: entra en Workers & Pages, abre tu proyecto de carga directa o crea uno, selecciona un nuevo despliegue y carga `dist/`. También puedes usar el ZIP `publicar-solo-web.zip` incluido. Ese ZIP contiene únicamente archivos públicos. Después revisa el dominio personalizado en el panel.
- Cloudflare Pages conectado a Git: actualiza el repositorio que ya utiliza el proyecto, mantén su rama y usa `dist` como directorio de salida, sin framework ni paso de compilación. Un proyecto conectado a Git no admite la misma carga por arrastrar archivos; conserva su flujo normal.
- VPS: configura tu servidor para servir `dist/` como raíz estática. Si ya tiene un dominio y certificado, reutiliza esa configuración. No hay proceso Node que mantener en producción.

Referencia del flujo de carga directa: https://developers.cloudflare.com/pages/get-started/direct-upload/

La carpeta `dist/` es la fuente editable y también el resultado listo para publicar. **No se ha publicado esta versión ni se ha sustituido tu web actual.** El ZIP de solo web refleja los archivos de esta entrega: si editas `dist/`, vuelve a comprimir su contenido o sube la carpeta actualizada.

## Los datos que debes revisar

1. `dist/assets/config.js`: correo, Instagram y, si lo quieres, WhatsApp real o enlace a una agenda. El correo se ha recuperado de tu web actual: `williamluisgonzalez@gmail.com`. El teléfono anterior era de ejemplo y se ha eliminado.
2. `dist/aviso-legal.html` y `dist/privacidad.html`: completa los campos `[COMPLETAR: ...]` con titular, NIF, domicilio, proveedores y conservación. Son borradores expresamente marcados; la web anterior también tenía esos datos pendientes. La versión está lista técnicamente, pero estos datos deben resolverse para su publicación comercial.
3. Precios y alcance: los planes de 590, 990 y 1.490 €/mes son una propuesta comercial nueva, no tarifas que hayas confirmado. Revisa que quieres ofrecerlos. No se aplica automáticamente ningún tipo impositivo.
4. Si cambias de dominio, actualiza `siteUrl` en configuración **y** las URL de las etiquetas canonical/og:url de las páginas, `robots.txt`, `sitemap.xml` y la información legal. La variable por sí sola no reescribe los archivos HTML.

## Cómo funciona el contacto

El visitante rellena su consulta, pulsa «Preparar mi consulta» y obtiene un borrador. «Abrir mi correo» prepara el mensaje en su aplicación de email, donde debe enviarlo. También puede copiarlo o descargarlo como texto. No hay envío automático, backend, base de datos ni un formulario que simule haber enviado un mensaje.

Sin JavaScript, el botón de preparación queda desactivado y se mantiene el enlace directo a tu correo. Si el equipo no tiene una aplicación de correo configurada o el borrador es demasiado largo para ese cliente, puede usar copiar/descargar y enviarlo desde su correo web. No se guarda el borrador en esta web.

## Qué incluye

- Página principal con servicios, portfolio conceptual, presentación del estudio, proyectos reales enlazados, planes, dos calculadoras, proceso, preguntas frecuentes y contacto.
- Tres páginas de concepto: alojamiento, restaurante y producto.
- Imágenes generadas con IA, convertidas a WebP y tamaños adaptativos. Se identifican expresamente como conceptos.
- Aviso legal y privacidad en borrador, página de cookies y error 404.
- Tipografía Hanken Grotesk incluida con su licencia, favicon, metadatos, sitemap y robots.
- Cabeceras de seguridad para plataformas que soportan `_headers`. En otros alojamientos, consulta `docs/DESPLIEGUE.md`.
- `docs/MODELO_NEGOCIO.pdf` y versión editable `.md`: posicionamiento, ofertas, costes, márgenes, capacidad, captación y plan de 90 días.
- `docs/AUDITORIA_Y_CAMBIOS.md`, documentación de edición y registro de validación.

Las automatizaciones y la IA descritas son **servicios de la agencia**, no integraciones activas dentro de la web. No hay claves ni gastos de API incluidos.
