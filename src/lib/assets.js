/** Prefijo correcto para GitHub Pages (/carlosphillips/) y para local. */
export function asset(path) {
  const base = import.meta.env.BASE_URL || '/'
  const clean = String(path).replace(/^\/+/, '')
  return `${base}${clean}`
}

/** URL absoluta (necesaria para abrir PDF en móvil / visor externo). */
export function absoluteAsset(path) {
  const rel = asset(path)
  if (typeof window === 'undefined') return rel
  return new URL(rel, window.location.href).href
}

/** Visor de Google Docs: Android/iOS suelen fallar al abrir PDF directo. */
export function googlePdfViewer(path) {
  return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(absoluteAsset(path))}`
}
