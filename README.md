# Hydrox B&R AI — Sitio Web

**Sistema RE · Buscador de Propiedades Guatemala**
Sitio estático en GitHub Pages — Verde · Blanco · Gris

---

## 🗂 Estructura de archivos

```
hydrox-br/
├── index.html           ← Inicio (hero + cómo funciona + fuentes + planes)
├── planes.html          ← Planes, tabla comparativa y FAQ
├── como-funciona.html   ← Proceso detallado y tecnología
├── contacto.html        ← Formulario de búsqueda (3 pasos)
│
├── css/
│   ├── estilos.css      ← Variables, reset, header, footer, utilidades
│   └── componentes.css  ← Botones, hero, tarjetas, planes, formulario, CTA
│
├── js/
│   └── main.js          ← Header scroll, menú móvil, reveal, envío al webhook
│
└── assets/
    ├── logo-blanco.png  ← Logo para fondos verdes/oscuros (header, footer)
    ├── logo-verde.png   ← Logo para fondos blancos/claros (secciones interiores)
    └── logo-gris.png    ← Logo para contextos sobrios o documentos
```

---

## 🚀 Cómo publicar en GitHub Pages

### Paso 1 — Crear el repositorio
1. Ve a [github.com/new](https://github.com/new)
2. Nombre del repositorio: `hydrox-br`
3. Visibilidad: **Public** (GitHub Pages gratuito requiere repositorio público)
4. Haz clic en **Create repository**

### Paso 2 — Subir los archivos
**Opción A — Desde el navegador (más fácil):**
1. En tu repositorio recién creado, haz clic en **uploading an existing file**
2. Arrastra y suelta TODOS los archivos y carpetas
3. Haz clic en **Commit changes**

**Opción B — Con Git (recomendado para futuras actualizaciones):**
```bash
git clone https://github.com/moises1388/hydrox-br.git
# copia todos los archivos dentro de la carpeta clonada
git add .
git commit -m "🚀 Sitio Hydrox B&R AI v1.0"
git push origin main
```

### Paso 3 — Activar GitHub Pages
1. Ve a tu repositorio → **Settings** → **Pages** (menú lateral izquierdo)
2. En **Source** selecciona: `Deploy from a branch`
3. Branch: `main` / Folder: `/ (root)`
4. Haz clic en **Save**
5. En 1–2 minutos tu sitio estará en: `https://moises1388.github.io/hydrox-br`

---

## ⚙️ Configuraciones importantes

### Webhook de Make.com
El formulario de `contacto.html` envía los datos directamente al webhook.
Si necesitas cambiar la URL, edita esta línea en `js/main.js`:

```javascript
const WEBHOOK = 'https://hook.us2.make.com/z7bc9jug7fqt51x61ku8uyon9vijjovw';
```

### Correo de contacto
Busca `servicioshydrox@gmail.com` en los 4 archivos HTML y reemplaza si cambias de email.

### Logos
- `assets/logo-blanco.png` → se usa en header y footer (sobre fondos verdes)
- `assets/logo-verde.png`  → disponible para secciones claras
- `assets/logo-gris.png`   → disponible para contextos neutros

Para reemplazar logos, simplemente sube nuevos archivos PNG con el mismo nombre en la carpeta `assets/`.

---

## 🎨 Paleta de colores

| Nombre          | Hex       | Uso                              |
|-----------------|-----------|----------------------------------|
| Verde profundo  | `#123D29` | Hero, fondo plan destacado       |
| Verde noche     | `#0C2C1E` | Footer                           |
| Verde           | `#1E7A4D` | Tarjeta Telegram, elementos      |
| Verde claro     | `#2FA468` | Acentos, puntos, eyebrow         |
| Agua            | `#5BA8D6` | Botones principales, gota        |
| Agua claro      | `#9AD0EC` | Texto sobre verde profundo       |
| Piedra          | `#44515C` | Texto secundario                 |
| Hueso           | `#F6F8F4` | Fondos de sección alternos       |

Todas las variables están definidas en `css/estilos.css` (`:root`).

---

## 📦 Futura expansión

- [ ] Conectar dominio propio (ej. `hydroxbr.com`) en GitHub Pages Settings
- [ ] Agregar fuentes OLX y Urbania GT → actualizar chips en `index.html`
- [ ] Plan Pro activo → actualizar `planes.html`
- [ ] Blog / artículos de mercado inmobiliario
- [ ] Analytics: agregar Google Analytics o Plausible

---

## 🛠 Tecnologías

| Capa         | Herramienta                |
|--------------|----------------------------|
| Hosting      | GitHub Pages (gratis)      |
| CSS          | Vanilla CSS con variables  |
| Tipografía   | Google Fonts (Fraunces, Outfit, Space Mono) |
| Formulario   | HTML nativo → POST a Make.com |
| IA Búsqueda  | Claude Sonnet 4.6 (Anthropic) |
| Automatización | Make.com Scenario #5473661 |

---

*Hydrox Automatización Inteligente para Pymes · Sistema RE · Junio 2026*
