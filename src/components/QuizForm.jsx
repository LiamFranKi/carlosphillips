import { useState } from 'react'
import { motion } from 'framer-motion'
import { CORRECT_ANSWERS } from '../lib/data'
import { submitToSheets } from '../lib/sheets'

export default function QuizForm({
  type,
  questions,
  title,
  subtitle,
  accent = 'teal',
  submitLabel,
  onSuccess,
  onStats,
  notify,
}) {
  const [answers, setAnswers] = useState({})
  const [sending, setSending] = useState(false)

  const accentBtn =
    accent === 'emerald'
      ? 'bg-teal hover:bg-teal-bright focus-visible:ring-teal'
      : 'bg-ink hover:bg-ink-soft focus-visible:ring-ink'

  const accentRadio = accent === 'emerald' ? 'border-teal text-teal' : 'border-ink text-ink'

  async function handleSubmit(event) {
    event.preventDefault()
    if (sending) return

    const missing = questions.some((q) => !answers[q.id])
    if (missing) {
      notify({ title: 'Faltan respuestas', message: 'Completa todas las preguntas para continuar.' })
      return
    }

    setSending(true)

    const keyMap = CORRECT_ANSWERS[type]
    const scores = questions.map((q) => (answers[q.id] === keyMap[q.id] ? 1 : 0))
    onStats?.(type, scores)

    const result = await submitToSheets(answers, type)
    setSending(false)
    setAnswers({})

    notify({
      title: '¡Registro exitoso!',
      message: result.ok
        ? `Tus respuestas del ${type === 'PRE' ? 'Pre' : 'Post'}-Test se enviaron a Google Sheets.`
        : 'Guardado localmente. Revisa tu conexión si no aparece en Sheets.',
    })

    onSuccess?.(type)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-2xl"
    >
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-ink text-balance sm:text-3xl">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft/75">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {questions.map((question, index) => (
          <fieldset
            key={question.id}
            className="rounded-3xl border border-ink/8 bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-5"
          >
            <legend className="px-1 text-sm font-bold text-ink sm:text-base">
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-mist text-xs font-extrabold text-teal">
                {index + 1}
              </span>
              {question.text}
            </legend>

            <div className="mt-4 space-y-2.5">
              {question.options.map((option) => {
                const selected = answers[question.id] === option.value
                return (
                  <label
                    key={option.value}
                    className={`flex min-h-12 cursor-pointer items-start gap-3 rounded-2xl border px-3.5 py-3 transition-all active:scale-[0.99] ${
                      selected
                        ? `${accentRadio} border-current bg-mist/80`
                        : 'border-ink/10 bg-white hover:border-ink/20 hover:bg-mist/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option.value}
                      checked={selected}
                      onChange={() => setAnswers((prev) => ({ ...prev, [question.id]: option.value }))}
                      className="mt-1 h-4 w-4 shrink-0 accent-teal"
                      required
                    />
                    <span className="text-sm leading-snug text-ink-soft">
                      <span className="font-bold text-ink">{option.value})</span> {option.label}
                    </span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        ))}

        <button
          type="submit"
          disabled={sending}
          className={`flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-bold text-white shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 ${accentBtn}`}
        >
          {sending ? 'Enviando…' : submitLabel}
        </button>
      </form>
    </motion.section>
  )
}
