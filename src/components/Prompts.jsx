import { useState } from 'react'
import { motion } from 'framer-motion'
import { PROMPTS } from '../lib/data'
import { IconCopy, IconCheck } from './Icons'

const TONE = {
  teal: 'bg-teal/12 text-teal',
  ink: 'bg-ink/10 text-ink',
  amber: 'bg-amber/15 text-amber',
  sky: 'bg-sky/50 text-ink-soft',
}

export default function Prompts({ notify }) {
  const [copied, setCopied] = useState(null)

  async function copyPrompt(prompt) {
    try {
      await navigator.clipboard.writeText(prompt.text)
      setCopied(prompt.id)
      notify({
        title: '¡Prompt copiado!',
        message: 'Pégalo directamente en NotebookLM.',
      })
      setTimeout(() => setCopied(null), 1800)
    } catch {
      notify({
        title: 'No se pudo copiar',
        message: 'Selecciona el texto manualmente.',
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-4xl"
    >
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Biblioteca de prompts</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft/75">
          Ejemplos aplicados a la sesión real de 5to de Primaria — Ciencia y Tecnología (IE 5084 Carlos Phillips).
        </p>
        <div className="mt-4 rounded-2xl border border-amber/25 bg-amber/10 px-4 py-3 text-xs leading-relaxed text-ink-soft">
          <strong className="text-ink">Cómo usar:</strong> sube tus fuentes a NotebookLM (CNEB, lecturas o guías) y pega cualquiera de estos prompts en el chat.
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {PROMPTS.map((prompt, index) => (
          <motion.article
            key={prompt.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="flex flex-col rounded-3xl border border-ink/8 bg-white/85 p-4 shadow-sm backdrop-blur-sm sm:p-5"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span className={`rounded-lg px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${TONE[prompt.tone]}`}>
                {prompt.tag}
              </span>
              <span className="text-[11px] font-semibold text-ink/40">{prompt.meta}</span>
            </div>
            <h3 className="font-display text-base font-bold text-ink">{prompt.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-soft/70">{prompt.blurb}</p>
            <pre className="mt-4 max-h-48 flex-1 overflow-auto whitespace-pre-wrap rounded-2xl border border-ink/8 bg-mist/50 p-3 font-sans text-[11px] leading-relaxed text-ink-soft select-all">
              {prompt.text}
            </pre>
            <button
              type="button"
              onClick={() => copyPrompt(prompt)}
              className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-ink px-4 py-2.5 text-xs font-bold text-white transition hover:bg-teal"
            >
              {copied === prompt.id ? (
                <>
                  <IconCheck className="h-4 w-4" /> Copiado
                </>
              ) : (
                <>
                  <IconCopy className="h-4 w-4" /> Copiar prompt
                </>
              )}
            </button>
          </motion.article>
        ))}
      </div>
    </motion.div>
  )
}
