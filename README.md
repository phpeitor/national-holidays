# Fiestas Patrias 🇵🇪🎉
[![forthebadge](https://forthebadge.com/images/badges/validated-html5.svg)](https://www.linkedin.com/in/drphp/)
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](https://www.linkedin.com/in/drphp/)

Una landing animada para celebrar las Fiestas Patrias del Peru. El proyecto esta construido con HTML, CSS y JavaScript vanilla, usando SVG para la ilustracion principal y animaciones ligeras para dar vida a la escena.

## Vista Previa

[![Video](https://img.youtube.com/vi/TRq8Ie4ubVU/0.jpg)](https://www.youtube.com/watch?v=TRq8Ie4ubVU)

[Ver demo en YouTube](https://www.youtube.com/watch?v=TRq8Ie4ubVU)

## Caracteristicas

- Ilustracion SVG animada con escena patriotica.
- Countdown automatico desde 1821 hasta el ano actual.
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
│   └── fusion-app.html
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
- `templates/fusion-app.html` contiene el SVG principal para mantener `js/script.js` mas limpio.
- `js/script.js` inicializa la plantilla, las animaciones y las interacciones.
