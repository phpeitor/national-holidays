# Fiestas Patrias 🇵🇪🎉
[![forthebadge](https://forthebadge.com/images/badges/validated-html5.svg)](https://www.linkedin.com/in/drphp/)
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](https://www.linkedin.com/in/drphp/)

[![Video](https://img.youtube.com/vi/TRq8Ie4ubVU/0.jpg)](https://www.youtube.com/watch?v=TRq8Ie4ubVU)

[![Video Demo](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube)](https://www.youtube.com/watch?v=TRq8Ie4ubVU)

## Caracteristicas

- Ilustracion SVG animada con escena patriotica.
- Countdown automatico desde 1821.
- Animaciones de humo, fuegos artificiales, bandera, caballo y ambiente.
- Lightbox para visualizar el logo.
- Estructura simple sin frameworks ni proceso de build.

## Estructura

```txt
national-holidays/
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   └── TweenMax.min.js
├── resources/
│   └── logo.png
├── templates/
│   └── fusion-app/
│       ├── shell-open.html
│       ├── defs-and-sky.html
│       ├── ground.html
│       ├── back-building.html
│       ├── front-building.html
│       ├── background.html
│       ├── middleground.html
│       ├── foreground.html
│       ├── horse-mountie.html
│       ├── foreground-haze.html
│       └── shell-close.html
└── index.html
```

## Inicio Rapido

1. Clona el repositorio:

```bash
git clone https://github.com/phpeitor/national-holidays.git
cd national-holidays
```

2. Sirve el proyecto desde un servidor local.

Si usas Apache, copia o apunta el proyecto al directorio publico y abre:

```txt
http://127.0.0.1/national-holidays/
```

Tambien puedes usar cualquier servidor estatico. Ejemplo con Node.js:

```bash
npx serve .
```

## Notas

- No requiere instalacion de dependencias.
- `templates/fusion-app/` divide el SVG principal en parciales para evitar un archivo HTML gigante.
- `js/script.js` carga esos parciales, arma la escena e inicializa las animaciones e interacciones.
