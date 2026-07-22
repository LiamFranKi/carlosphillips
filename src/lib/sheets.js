export const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzbyX1XcJ0R8UFVWn52iBePK8zd1ck7uBKQNBG4xZyUTV2ykkBxRsxOu18DwoGya1oa/exec'

export async function submitToSheets(answers, type) {
  if (!GOOGLE_SCRIPT_URL) return { ok: false, reason: 'missing-url' }

  const formData = new FormData()
  Object.entries(answers).forEach(([key, value]) => {
    formData.append(key, value)
  })
  formData.append('tipo', type)
  formData.append('fecha', new Date().toLocaleString('es-PE'))

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
    })
    return { ok: true }
  } catch (error) {
    console.error('[Google Sheet] Error de envío:', error)
    return { ok: false, reason: 'network', error }
  }
}
