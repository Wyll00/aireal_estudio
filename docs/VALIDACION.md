# Validación de la entrega

Fecha: 8 de septiembre de 2026.

| Comprobación ejecutada | Resultado |
| --- | --- |
| Páginas HTML y metadatos básicos | 8 páginas; idioma, descripción y un H1 por página |
| Referencias locales a archivos y anclas | 175 referencias resueltas, sin recursos locales ausentes |
| Imágenes de contenido | 3 conceptos revisados visualmente; 6 versiones WebP incluidas |
| Fuente local | WOFF2 válida, 34.704 bytes, licencia incluida |
| Sintaxis JavaScript | Los 3 archivos públicos de JavaScript se analizan correctamente |
| Calculadoras y modelo económico | 15 comprobaciones numéricas aprobadas, incluidos cero, saldo negativo y escenarios del negocio |
| Datos de ejemplo originales | Teléfono 600 000 000 y bloques «Tu foto aérea» retirados de la portada |
| Formulario | En el código se cancela el envío HTTP; preparación local y enlace de correo; botón desactivado sin JavaScript |
| Recursos públicos | 24 archivos, 947.714 bytes antes de comprimir |
| PDF del modelo | 9 páginas, renderizadas e inspeccionadas; tablas legibles, sin contenido recortado |

## Qué no se ha comprobado

No se ha ejecutado una prueba visual de la web en navegadores, una puntuación Lighthouse ni un envío de correo real. No se ha verificado la titularidad actual del email o Instagram más allá de recuperarlos de la web publicada. No se ha accedido a cuentas de alojamiento ni se ha publicado esta versión.

Los textos legales siguen marcados como borradores donde faltan datos del titular o de proveedores. Completa esa información y realiza la revisión descrita en `DESPLIEGUE.md` antes de la publicación comercial.

## Repetir comprobaciones de código

Desde la carpeta principal, con Node.js 20 o posterior, ejecuta `npm run check`. No requiere instalar paquetes. Comprueba el código público y los casos numéricos incluidos; no es una prueba de navegador ni garantiza resultados comerciales.
