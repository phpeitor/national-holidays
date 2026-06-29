# Agents Roles

Guia de agentes para trabajar en este proyecto. Cada agente tiene un foco claro para evitar mezclar responsabilidades y mantener el codigo facil de revisar.

## Principios

- Mantener el proyecto estatico: HTML, CSS, JavaScript vanilla y templates parciales.
- No volver a poner el SVG completo dentro de `js/script.js`.
- No crear un unico `templates/fusion-app.html` gigante.
- Trabajar por capas dentro de `templates/fusion-app/`.
- Registrar cualquier nuevo parcial en `templateParts` dentro de `js/script.js`.
- Actualizar cache busting cuando cambien CSS, JS o templates.

## Agent Collasuyo SVG

Responsable de SVG, ilustraciones, capas visuales e imagenes.

Trabaja en:

- `templates/fusion-app/*.html`
- `resources/`
- Clases SVG relacionadas con formas, paths, groups, ids y viewBox.

Debe:

- Mantener cada capa SVG en su parcial correspondiente.
- Usar ids y clases descriptivas cuando se agreguen nuevas piezas.
- Evitar duplicar SVG completo entre archivos.
- Validar que los cambios visuales no rompan animaciones existentes.
- Coordinar con Agent Chinchaysuyo Motion si el cambio incluye animacion.

No debe:

- Editar logica de negocio o loaders en `js/script.js`, salvo que sea estrictamente necesario para registrar un nuevo parcial.
- Agregar estilos inline si el cambio puede vivir en `css/style.css`.

## Agent Intisuyo Fonts

Responsable de tipografia, textos, rotulos y jerarquia visual.

Trabaja en:

- `css/style.css`
- Textos dentro de `templates/fusion-app/*.html`
- Titulos, labels, badges y copies en `README.md` cuando aplique.

Debe:

- Mantener legibilidad en desktop y mobile.
- Revisar contraste y tamanos de fuente.
- Evitar fuentes externas pesadas si no son necesarias.
- Usar familias fallback seguras.

No debe:

- Cambiar estructura SVG sin coordinar con Agent Collasuyo SVG.
- Introducir dependencias tipograficas sin justificar peso y licencia.

## Agent Antisuyo CSS

Responsable de estilos, layout, responsive y sistema visual.

Trabaja en:

- `css/style.css`
- Reglas visuales de templates y componentes.

Debe:

- Mantener estilos en CSS, no en HTML ni JS.
- Preferir selectores claros y acotados.
- Evitar `!important` salvo para sobrescribir clases SVG heredadas cuando no haya alternativa simple.
- Revisar mobile y desktop despues de cambios grandes.

No debe:

- Mover markup entre parciales sin coordinar con Agent Collasuyo SVG.
- Meter animaciones costosas que afecten rendimiento.

## Agent Chinchaysuyo Motion

Responsable de animaciones, efectos y transiciones.

Trabaja en:

- `css/style.css`
- `js/script.js`
- SVG animado en `templates/fusion-app/*.html`

Debe:

- Priorizar `transform` y `opacity`.
- Mantener animaciones sutiles y coherentes con la escena.
- Cuidar `prefers-reduced-motion` cuando se agreguen efectos relevantes.
- Verificar que TweenMax siga inicializando despues de cargar templates.

No debe:

- Crear animaciones que dependan de elementos antes de que los templates carguen.
- Duplicar timelines sin necesidad.

## Agent Qollasuyo Templates

Responsable de arquitectura de templates y composicion de `fusion-app`.

Trabaja en:

- `templates/fusion-app/`
- `js/script.js`, especificamente `templateParts` e `initFeature()`.

Debe:

- Mantener los parciales pequenos y nombrados por capa visual.
- Actualizar `templateParts` cuando se agregue, elimine o renombre un parcial.
- Mantener `shell-open.html` y `shell-close.html` solo para estructura envolvente.
- Evitar crear un parcial enorme que concentre multiples capas no relacionadas.

No debe:

- Regresar al patron de string HTML grande dentro de JavaScript.
- Crear dependencias de build sin aprobacion explicita.

## Agent Kuntisuyo JS

Responsable de comportamiento, eventos y carga dinamica.

Trabaja en:

- `js/script.js`

Debe:

- Mantener JS vanilla.
- Separar carga de templates, inicializacion de animaciones e interacciones.
- Validar con `node --check js/script.js` despues de cambios.
- Evitar logica que dependa de elementos antes de insertar los parciales.

No debe:

- Guardar SVG o HTML largo en constantes JS.
- Introducir frameworks sin necesidad real.

## Agent Amauta Docs

Responsable de documentacion, reglas y contexto para IA/devs.

Trabaja en:

- `README.md`
- `.ia-context/`
- `FRONTEND_RULES.md`

Debe:

- Mantener instrucciones claras, accionables y actualizadas.
- Documentar cambios de arquitectura, especialmente templates y flujo de carga.
- Evitar documentacion inflada o repetitiva.

No debe:

- Cambiar codigo de produccion durante tareas solo documentales, salvo que el usuario lo pida.

## Agent Apus QA

Responsable de verificacion, regresiones y checklist de release.

Trabaja en:

- Validacion manual del sitio.
- Comandos de verificacion.
- Revision de consola del navegador y rutas HTTP.

Debe:

- Ejecutar `node --check js/script.js` cuando cambie JS.
- Verificar que `/templates/fusion-app/*.html` responda `HTTP 200`.
- Confirmar que el countdown, lightbox, humo, caballo y animaciones principales funcionen.
- Revisar que no haya rutas rotas despues de cambiar cache busting.

No debe:

- Revertir cambios de otros agentes sin aprobacion.
- Saltar verificacion cuando se toquen templates o loaders.

## Flujo recomendado

1. Agent Amauta Docs define o actualiza reglas si cambia la arquitectura.
2. Agent Qollasuyo Templates organiza parciales y carga.
3. Agent Collasuyo SVG modifica la capa visual necesaria.
4. Agent Antisuyo CSS ajusta estilos.
5. Agent Chinchaysuyo Motion agrega o ajusta efectos.
6. Agent Kuntisuyo JS conecta interacciones.
7. Agent Apus QA valida rutas, consola y comportamiento.

## Checklist de cambios en templates

- El parcial nuevo vive en `templates/fusion-app/`.
- El nombre del archivo describe la capa visual.
- `templateParts` incluye el parcial en el orden correcto.
- `templateVersion` se actualizo si aplica.
- `index.html` actualizo version de CSS/JS si aplica.
- La pagina carga por HTTP, no por `file://`.
- No se reintrodujo un HTML/SVG gigante dentro de `script.js`.
