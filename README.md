# Gestión de pedidos · Guías (prototipo de práctica)

Prototipo con datos **ficticios** de una pantalla de Guías con un paso de **revisión previa**:
quien sube el Excel del rastreo no actualiza los pedidos directamente; un técnico revisa y
**aprueba** o **devuelve con comentario**.

## Cómo abrirlo
Doble clic en `index.html`. No requiere instalar nada.

## Estructura

```
gestion-pedidos/
├── index.html        Estructura de la página (menú, ventanas) y carga de scripts
├── css/
│   └── styles.css    Colores (variables al inicio) y estilos
└── js/
    ├── data.js       Usuarios y guías de ejemplo
    ├── utils.js      Atajos, fecha, avisos y etiquetas de estado
    ├── state.js      Estado de la sesión y guardado en el navegador
    ├── actions.js    Enviar a revisión, aprobar/devolver, reenviar
    ├── views.js      HTML de cada pantalla
    └── app.js        Pinta la pantalla, maneja clics y arranca
```

El orden de los `<script>` en `index.html` importa: cada archivo usa lo definido en los anteriores.

## Flujo
1. **Sube el Excel** (rol "sube") elige un técnico y envía. Los pedidos no cambian todavía.
2. **Técnico revisor** abre el envío en *Revisiones*, ve la vista previa y decide.
3. **Aprobar**: las guías pasan a "Entregada". **Devolver**: comentario obligatorio.
4. Quien subió el Excel ve el comentario y puede **reenviar**.

Reglas: solo quien sube puede usar "Subir Excel"; solo el revisor asignado puede aprobar o devolver.

## Dónde cambiar cada cosa
| Quiero cambiar...                     | Archivo           |
|---------------------------------------|-------------------|
| Colores                               | `css/styles.css` (variables `:root`) |
| Usuarios y roles                      | `js/data.js`      |
| Reglas de aprobación / lo que cambia  | `js/actions.js`   |
| Cómo se ve una pantalla               | `js/views.js`     |
| Botones y clics                       | `js/app.js`       |

## Trabajar con Git
```powershell
git init
git add .
git commit -m "Prototipo inicial"
git checkout -b mejora-revision   # rama de práctica, main queda intacto
```

## Pendiente / ideas
- Aviso por correo al técnico asignado.
- Leer un Excel real (hoy se simula la lectura).
- Conectar con el sistema real solo en un entorno de pruebas.
