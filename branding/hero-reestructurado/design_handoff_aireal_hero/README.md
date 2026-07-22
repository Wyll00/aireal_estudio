# Handoff: Aireal Estudio — Hero / Landing

## Overview
Sección hero de la web de **Aireal Estudio**, un estudio de fotografía y vídeo aéreo con dron en Tenerife. Incluye header sticky con navegación, hero de dos columnas (logo grande + titular + CTAs a la izquierda, foto aérea a la derecha), barra de confianza y footer oscuro con el logo grande centrado.

## About the Design Files
Los archivos de este paquete son **referencias de diseño creadas en HTML** — prototipos que muestran el aspecto y comportamiento previstos, no código de producción para copiar directamente. La tarea es **recrear estos diseños en el entorno existente del codebase de destino** (React, Vue, SwiftUI, etc.) usando sus patrones y librerías establecidos — o, si aún no existe entorno, elegir el framework más apropiado e implementar los diseños ahí.

El archivo principal `Aireal Hero.dc.html` usa un runtime propio de la herramienta de diseño (`support.js`, plantillas con `{{ }}`); ignora esa mecánica y lee el markup/estilos inline como especificación.

## Fidelity
**High-fidelity (hifi)**: colores, tipografía, espaciados e interacciones finales. Recrear pixel-perfect con las librerías del codebase.

## Screens / Views

### 1. Header (sticky)
- **Purpose**: navegación principal + CTA.
- **Layout**: sticky top, z-index 10; fondo `rgba(245,240,232,.92)` con `backdrop-filter: blur(8px)`; borde inferior `1px solid #DCD4C4`. Contenedor interior max-width 1200px, padding 0 28px, altura 76px, flex space-between, gap 24px.
- **Components**:
  - **Monograma "a"**: solo la letra "a" (Hanken Grotesk 300, 30px, `#2A241E`) con una bolita (`.17em` de diámetro, `#BF5B33`) posicionada `top:-.36em` centrada sobre la letra, con animación de salto (ver Animaciones).
  - **Nav**: enlaces "Servicios · Trabajo · Tarifas · Contacto", 14.5px, weight 500, color `#2A241E`, hover `#BF5B33`, gap 34px.
  - **CTA "Reserva tu vuelo"**: pill (border-radius 99px), fondo `#BF5B33`, texto `#F5F0E8` 14px weight 600, padding 11px 22px; hover fondo `#8F4022`; transición background .2s.

### 2. Hero (dos columnas)
- **Layout**: max-width 1200px centrado, padding 64px 28px 88px; CSS grid `grid-template-columns: 1.1fr .9fr`, gap 72px, `align-items: stretch` (⚠ clave: la columna de la foto se estira a la altura de la columna de texto — el borde superior de la foto queda a la altura del logo y el inferior alineado con los botones).
- **Columna izquierda** (texto):
  1. **Logo grande** (margin-bottom 40px): "aireal" en Hanken Grotesk 300, **108px**, line-height .95, letter-spacing .01em, `#2A241E`. La "i" se escribe como "ı" (sin punto) con la bolita `#BF5B33` absoluta encima (mismo patrón que el header) animada con salto. Debajo, "ESTUDIO" en 22px, weight 600, letter-spacing .62em, uppercase, `#8A7F6C`, margin-top 12px, padding-left 4px.
  2. **Eyebrow**: raya de 26×1.5px `#BF5B33` + "FOTOGRAFÍA Y VÍDEO AÉREO · TENERIFE" 12.5px weight 600 letter-spacing .3em uppercase `#BF5B33`, flex gap 12px.
  3. **H1**: "Tu espacio, visto desde donde nadie lo ha mirado." — Hanken Grotesk 300, `clamp(40px, 4.8vw, 62px)`, line-height 1.1, letter-spacing -.015em, `#2A241E`, margin 22px 0 0, `text-wrap: pretty`. El punto final en `#BF5B33`.
  4. **Párrafo**: 17px/1.65 `#5C5546`, max-width 46ch, margin-top 26px. Copy: "Imágenes aéreas que hacen que un hotel, una propiedad o un restaurante se entiendan de un vistazo. Trabajamos en toda la isla para turismo, inmobiliarias, alojamientos y negocios locales."
  5. **Botones** (flex gap 14px, margin-top 36px):
     - Primario "Reserva tu vuelo": igual que el CTA del header pero 15px, padding 15px 30px; hover además `translateY(-2px)`.
     - Secundario "Ver tarifas": borde 1.5px `#BF5B33`, texto `#BF5B33`, padding 13.5px 30px, pill; hover invierte (fondo `#BF5B33`, texto `#F5F0E8`).
- **Columna derecha** (foto): contenedor flex estirado (`align-self:stretch`), con flotación suave (ver Animaciones):
  - Marco decorativo: caja absoluta desplazada `inset: 14px -14px -14px 14px`, borde 1.5px `#C79A3C`, radius 18px, opacity .55 (queda detrás/abajo-derecha de la foto).
  - Foto: llena la columna (flex:1), border-radius 16px, overflow hidden, fondo placeholder `#6E6B4A`, sombra `0 24px 60px -24px rgba(51,41,31,.35)`. En el prototipo es un slot de imagen arrastrable; en producción, `<img>`/background con `object-fit: cover`.

### 3. Barra de confianza
- **Layout**: franja full-width con `border-top/bottom 1px solid #DCD4C4`, fondo `#EFE9DE`; interior max-width 1200px, padding 20px 28px, flex wrap centrado, gap 14px 26px.
- **Items** (12px, weight 600, letter-spacing .22em, uppercase, `#6B6252`), separados por puntos de 5px `#BF5B33`: "Operador registrado AESA" · "Seguro de RC" · "Entrega en 72 h" · "Toda la isla de Tenerife".

### 4. Footer
- **Layout**: fondo `#33291F`, texto `#F5F0E8`; interior max-width 1200px, padding 78px 28px 34px, columna centrada.
- **Components**:
  - Logo "aireal" 60px (tamaño ajustable 36–120px en el prototipo), weight 300, `#F5F0E8`, con la misma bolita animada `#BF5B33`.
  - "ESTUDIO": 12px, weight 600, letter-spacing .55em (compensar con padding-left .55em), uppercase, `#B7AB94`, margin-top 14px.
  - Tagline "Fotografía y vídeo aéreo · Tenerife": 13.5px `#8A7F6C`, letter-spacing .04em, margin-top 22px.
  - Separador: línea 1px `#4A3E30`, margin-top 52px.
  - Fila legal (padding-top 22px, 11.5px, letter-spacing .2em, uppercase, `#B7AB94`, flex space-between): "© 2026 Aireal Estudio" | enlaces `hola@airealestudio.com` (hover `#C79A3C`) y `@airealestudio` (color `#C79A3C`, hover `#F5F0E8`).

## Interactions & Behavior

### Animaciones
- **Bolita de la "i" (dotHop)** — la firma de la marca. La "i" se renderiza como "ı" y el punto es un span absoluto que salta periódicamente:
  ```css
  @keyframes dotHop{0%,10%,34%,100%{transform:translate(-50%,0)}
    16%{transform:translate(-50%,-.5em)}
    24%{transform:translate(-50%,-.14em)}
    29%{transform:translate(-50%,-.05em)}}
  ```
  Duración 3.4s ease-in-out infinite; delays escalonados: header/hero .9s, footer 1.8s.
- **Flotación de la foto (floatY)**: `translateY(0 → -10px → 0)`, 6.5s ease-in-out infinite, delay 1.2s.
- **Entrada (fadeUp)**: opacity 0 + translateY(18px) → visible; .7s `cubic-bezier(.2,.7,.2,1)`; en cascada: eyebrow/título 0s, párrafo .15s, botones .28s; columna foto `fadeIn` .9s delay .25s.
- Hovers: enlaces nav → `#BF5B33`; botón primario → `#8F4022` + translateY(-2px); botón secundario → relleno terracota.

### Navegación
Anclas internas: `#servicios`, `#trabajo`, `#tarifas`, `#contacto` (secciones aún no diseñadas). CTA del header y del hero → `#contacto`.

### Responsive
El prototipo es desktop (1200px). Sugerencia para producción: colapsar el grid a 1 columna bajo ~900px (foto debajo del texto, altura fija ~420px), reducir logo a ~64px y ocultar el nav tras un menú.

## State Management
Sin estado de datos. Props/flags del prototipo (opcionales en producción):
- `animarPunto: boolean` (default true) — activa/desactiva dotHop.
- `flotarFoto: boolean` (default true) — activa/desactiva floatY.
- `logoFooterPx: number` (default 60) — tamaño del logo del footer.
Respetar `prefers-reduced-motion` desactivando dotHop/floatY.

## Design Tokens
**Colores**
- Fondo crema: `#F5F0E8` · Fondo crema oscuro (franja): `#EFE9DE`
- Tinta: `#2A241E` · Texto secundario: `#5C5546` · Texto atenuado: `#8A7F6C` / `#6B6252`
- Terracota (marca/acento): `#BF5B33` · Terracota hover: `#8F4022`
- Ocre (marco/detalles): `#C79A3C`
- Footer: fondo `#33291F`, línea `#4A3E30`, texto atenuado `#B7AB94`
- Bordes claros: `#DCD4C4`

**Tipografía**: Hanken Grotesk (Google Fonts), weights 300 (logo/titulares), 400, 500 (nav), 600 (labels/botones). Escala: 108px logo hero, 58–62px h1, 30px monograma header, 22px "estudio", 17px body, 14–15px nav/botones, 11.5–13px labels (uppercase con letter-spacing .2–.62em).

**Radios**: pills 99px, foto 16px, marco 18px.
**Sombra foto**: `0 24px 60px -24px rgba(51,41,31,.35)`.
**Contenedor**: max-width 1200px, padding lateral 28px.

## Assets
- Sin imágenes finales: el hueco de la foto aérea es un placeholder (el cliente debe aportar la foto real, aspect libre, cover).
- Sin archivos de logo: el logotipo es tipográfico (Hanken Grotesk 300 + bolita CSS), reconstruible en código.

## Files
- `Aireal Hero.dc.html` — prototipo completo (markup + estilos inline + keyframes en `<style>`).
- `image-slot.js` — utilidad del placeholder de imagen del prototipo (solo para el preview; no portar).
