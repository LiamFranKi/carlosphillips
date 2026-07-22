# Capacitación Docente — IE 5084 Carlos Phillips

Web de capacitación sobre **NotebookLM** para docentes de primaria.

**Repo:** https://github.com/LiamFranKi/carlosphillips  
**Pages:** https://liamfranki.github.io/carlosphillips/

## Desarrollo

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
npm run preview
```

## GitHub Pages (importante)

Antes era HTML estático desde `main`. Ahora es React/Vite, así que Pages debe usar **GitHub Actions**:

1. Ve a **Settings → Pages**
2. En **Build and deployment → Source** elige **GitHub Actions**
3. El workflow `.github/workflows/deploy-pages.yml` construye y publica automáticamente en cada push a `main`

Los recursos viven en `public/assets/`. Las respuestas del Pre/Post-Test se envían a Google Sheets.
