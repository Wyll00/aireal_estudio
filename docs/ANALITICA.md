# Analítica de Aireal Estudio

Proyecto de Microsoft Clarity: `ynea67k393`, destinado a `https://horizoncompany.es/`.
Panel: https://clarity.microsoft.com/projects/view/ynea67k393/dashboard

## Qué mide

Visitas, páginas, procedencia, dispositivo, interacciones, mapas de clics y reproducciones de sesiones de quienes aceptan la analítica. No revela automáticamente el nombre ni el correo de los visitantes. El portafolio debe usar otro proyecto para mantener sus estadísticas separadas.

Eventos propios:

| Evento | Significado |
| --- | --- |
| `pedir_presupuesto` | Clic en una llamada a contactar/pedir presupuesto. |
| `ver_proyecto` | Apertura de un proyecto desde la web. |
| `preparar_consulta` | Generación local del borrador de consulta. |
| `abrir_correo` | Apertura de un enlace de correo; no confirma el envío. |
| `consulta_enviada` | Respuesta satisfactoria del servicio de formulario, solo si se configura el envío HTTP. |

El formulario actual prepara un borrador porque `formEndpoint` está vacío. Ningún evento propio lleva nombres, correos ni contenido de consultas. El formulario y su resultado llevan `data-clarity-mask="true"`.

## Consentimiento

`web/assets/analytics.js` carga Clarity únicamente tras aceptar analítica. Antes de elegir y al rechazar no se solicita el código remoto. Se envía `consentv2` con `analytics_Storage: 'granted'` y `ad_Storage: 'denied'` al aceptar.

La elección se recuerda en `localStorage`, clave `aireal_analytics_consent_v1`, durante 180 días. «Preferencias de cookies» permite cambiarla. Retirar el permiso comunica ambos estados `denied`, elimina las cookies `_clck` y `_clsk` accesibles y recarga la página para detener el código ya cargado. Esto no borra datos que Microsoft haya recibido previamente.

En el panel de Clarity, revisar que **Consent Mode** esté habilitado y comprobar el enmascaramiento. Microsoft lo activa por defecto para EEE, Reino Unido y Suiza. No añadir una segunda instalación manual del script ni una integración publicitaria sin revisar esta configuración.

## Publicar y verificar

1. Publicar el contenido de **`web/`** como raíz del sitio, incluidos `assets/analytics.js`, los HTML y `_headers`. Esta versión del repositorio sirve los archivos de `web/`; no basta con actualizar GitHub si el alojamiento no despliega esa carpeta. Si el servidor no interpreta `_headers`, aplicar su política de seguridad equivalente en el alojamiento.
2. Abrir el sitio publicado en una sesión limpia. Sin aceptar, verificar en la pestaña Red del navegador que no aparecen solicitudes a `clarity.ms`. Rechazar y navegar a otra página: la decisión debe mantenerse.
3. Abrir «Preferencias de cookies» y aceptar. Debe solicitarse una sola vez `https://www.clarity.ms/tag/ynea67k393`, seguido de peticiones de recogida a Clarity mientras se navega. Comprobar que no hay errores de política de seguridad.
4. Probar los clics de presupuesto/proyecto y preparar una consulta con datos ficticios. Comprobar después el enmascaramiento y los eventos en el panel. No enviar correos ni activar un proveedor de formulario para esta comprobación.
5. Retirar el permiso. Tras la recarga no debe cargarse Clarity ni persistir las cookies propias accesibles `_clck`/`_clsk`. La web y el formulario deben seguir funcionando.
6. Consultar el panel del proyecto. Las sesiones pueden aparecer enseguida; dejar un margen de hasta 2 horas para comprobar la actualización de datos y etiquetas. Revisar bloqueadores, el consentimiento y las solicitudes de red si no aparece actividad. Los visitantes que rechazan y quienes bloquean Clarity no se contabilizan aquí.

Antes de publicar, completar los datos del titular y proveedores que ya aparecen como `[COMPLETAR]` en las páginas legales. Los textos describen la integración; no constituyen una validación jurídica integral. Si se activa `formEndpoint`, también hay que actualizar la política de privacidad para reflejar el envío real y su proveedor.

## Referencias oficiales

Consultadas el 24 de septiembre de 2026:

- [Instalación y comprobación](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup).
- [Gestión del consentimiento](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-management).
- [Cookies](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies) y [plazos predeterminados del código de Microsoft](https://github.com/microsoft/clarity/blob/master/packages/clarity-js/types/data.d.ts).
- [Conservación de datos](https://learn.microsoft.com/en-us/clarity/setup-and-installation/data-retention): reproducciones 30 días; datos de clics/mapas y sesiones etiquetadas o favoritas 9 meses.
- [Privacidad y preguntas frecuentes](https://learn.microsoft.com/en-us/clarity/faq), incluida la actualización de etiquetas en 30 minutos a 2 horas.
