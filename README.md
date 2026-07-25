# Fiestas Patrias 🇵🇪🎉
[![forthebadge](https://forthebadge.com/images/badges/validated-html5.svg)](https://www.linkedin.com/in/drphp/)
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](https://www.linkedin.com/in/drphp/)

[![Video](https://img.youtube.com/vi/CfgApknJI8U/0.jpg)](https://www.youtube.com/watch?v=CfgApknJI8U)

[![Video Demo](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube)](https://www.youtube.com/watch?v=CfgApknJI8U)

## Features

- **Layered SVG composition** — each block is a separate template for isolated control.
- **Automated year countdown** — animates from 1821 to the current year.
- **Ambient animations** — smoke, haze, waving flag, horse sway, crowd movement.
- **Logo lightbox** — click-to-expand with backdrop blur and animated entrance.
- **National hymn toggle** — play/stop the anthem with floating musical notes.
- **Network-first service worker** — instant updates online, offline fallback.
- **Zero-config static stack** — deploy on Apache, cPanel, nginx, or any static server.

## Architecture

```
national-holidays/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   ├── sw.js
│   └── TweenMax.min.js
├── resources/
│   ├── logo.png
│   ├── himno_00.png
│   ├── himno_01.png
│   └── himno.mp3
└── templates/
    └── fusion-app/
        ├── shell-open.html
        ├── defs-and-sky.html
        ├── ground.html
        ├── back-building.html
        ├── front-building.html
        ├── background.html
        ├── middleground.html
        ├── foreground.html
        ├── horse-mountie.html
        ├── foreground-haze.html
        └── shell-close.html
```

## Template Composition

The main SVG is split into partials under `templates/fusion-app/`. `script.js` loads them in order via `fetch()`, concatenates the result, and injects it into `#fusion-app`. This keeps each file small and focused without a build step.

```js
const templateParts = [
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

```bash
git clone https://github.com/phpeitor/national-holidays.git
cd national-holidays
```

Serve with any HTTP server (templates require `fetch()` — `file://` won't work):

```bash
# Apache
# Point DocumentRoot to the project directory

# Node.js
npx serve .
```

Open in browser:

```
http://localhost:3000
```

## Development

### Principles

- **No build step** — edit any file and refresh to see changes.
- **Service worker** uses network-first strategy: fetches fresh content online, falls back to cache offline. No manual cache busting required.
- **Template cache busting** is handled automatically via `templateVersion` in `script.js`.

### Adding a new layer

1. Create a partial in `templates/fusion-app/` (e.g., `my-layer.html`).
2. Register it in `templateParts` in `js/script.js` at the correct visual order.
3. Add CSS in `css/style.css` if needed.

### Code boundaries

| Concern | Location |
|---|---|
| SVG markup | `templates/fusion-app/*.html` |
| Styling | `css/style.css` |
| Interactivity & loading | `js/script.js` |

## Validation

```bash
node --check js/script.js
```

Pre-release checklist:

- Page loads over HTTP, not `file://`
- All partials in `templates/fusion-app/` return `200`
- Console shows no errors (countdown, lightbox, animations working)
- Test both desktop and mobile viewports

## Deployment

Static deployment. Required files:

```
index.html
css/
js/
resources/
templates/
```

No server configuration needed — works on Apache, cPanel, nginx, Netlify, Vercel, or any static host.
