# Fiestas Patrias 🇵🇪🎉
[![forthebadge](https://forthebadge.com/images/badges/validated-html5.svg)](https://www.linkedin.com/in/drphp/)
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](https://www.linkedin.com/in/drphp/)

[![Video](https://img.youtube.com/vi/TRq8Ie4ubVU/0.jpg)](https://www.youtube.com/watch?v=TRq8Ie4ubVU)

[![Video Demo](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube)](https://www.youtube.com/watch?v=TRq8Ie4ubVU)

## Overview

Landing estatica e interactiva para Fiestas Patrias de Peru. La escena principal esta construida con SVG, CSS y JavaScript vanilla, sin framework ni proceso de build obligatorio.

El objetivo del proyecto es mantener una pieza visual ligera, facil de desplegar en Apache y sencilla de editar por capas: cielo, suelo, edificios, personajes, caballo y efectos.

## Features

- SVG ilustrado por capas para controlar cada bloque visual de forma independiente.
- Countdown automatico desde 1821.
- Animaciones de ambiente: fuegos artificiales, humo, neblina, bandera, caballo y publico.
- Lightbox para visualizar el logo sin salir de la pagina.
- Arquitectura estatica compatible con Apache, cPanel o cualquier servidor de archivos.
- Templates parciales para evitar un `script.js` o un HTML monolitico dificil de mantener.

## Architecture

```txt
national-holidays/
|-- index.html
|-- css/
|   `-- style.css
|-- js/
|   |-- script.js
|   `-- TweenMax.min.js
|-- resources/
|   `-- logo.png
`-- templates/
    `-- fusion-app/
        |-- shell-open.html
        |-- defs-and-sky.html
        |-- ground.html
        |-- back-building.html
        |-- front-building.html
        |-- background.html
        |-- middleground.html
        |-- foreground.html
        |-- horse-mountie.html
        |-- foreground-haze.html
        `-- shell-close.html
```

## Template Strategy

El SVG principal esta separado en parciales dentro de `templates/fusion-app/`. `js/script.js` define el orden de carga en `templateParts`, descarga cada archivo con `fetch()`, concatena el resultado y lo inserta en `#fusion-app`.

Esta decision mantiene el proyecto sin build step, pero evita archivos gigantes donde sea dificil ubicar una seccion especifica.

Orden actual de composicion:

```js
var templateParts = [
  "shell-open",
  "defs-and-sky",
  "ground",
  "back-building",
  "front-building",
  "background",
  "middleground",
  "foreground",
  "horse-mountie",
  "foreground-haze",
  "shell-close"
];
```

## Getting Started

Clona el repositorio:

```bash
git clone https://github.com/phpeitor/national-holidays.git
cd national-holidays
```

Sirve el proyecto desde Apache o cualquier servidor estatico. Si estas usando Apache local:

```txt
http://127.0.0.1/national-holidays/
```

Alternativa con Node.js:

```bash
npx serve .
```

## Development Notes

- No requiere `npm install` para funcionar.
- No abrir directamente `index.html` con `file://`, porque los parciales se cargan con `fetch()` y necesitan HTTP.
- Cuando cambies CSS, JS o templates, actualiza el cache busting en `index.html` y en `templateVersion` dentro de `js/script.js`.
- Si agregas una nueva capa visual, crea un parcial en `templates/fusion-app/` y registralo en `templateParts` en el orden correcto.
- Mantener la interactividad en `js/script.js`; mantener markup/SVG en `templates/fusion-app/`; mantener estilos en `css/style.css`.

## Validation

Comprobacion rapida de sintaxis JavaScript:

```bash
node --check js/script.js
```

Comprobaciones recomendadas antes de publicar:

- Abrir la pagina por HTTP y revisar la consola del navegador.
- Confirmar que todos los parciales en `templates/fusion-app/` respondan `200`.
- Probar desktop y mobile.
- Validar que el countdown, el lightbox y las animaciones sigan activos.

## Deployment

El proyecto se despliega como sitio estatico. Sube estos archivos al servidor manteniendo la estructura de carpetas:

- `index.html`
- `css/`
- `js/`
- `resources/`
- `templates/`

En Apache o cPanel, no se requiere configuracion especial mientras los archivos `.html`, `.css`, `.js` y assets se sirvan publicamente.
