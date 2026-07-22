import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Splash from './components/Splash'
import Header from './components/Header'
import Nav from './components/Nav'
import Toast from './components/Toast'
import QuizForm from './components/QuizForm'
import Capacitacion from './components/Capacitacion'
import Prompts from './components/Prompts'
import Dashboard from './components/Dashboard'
import { POST_QUESTIONS, PRE_QUESTIONS } from './lib/data'

const EMPTY_STATS = {
  preCount: 0,
  postCount: 0,
  preScores: [0, 0, 0],
  postScores: [0, 0, 0],
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [tab, setTab] = useState('pretest')
  const [stats, setStats] = useState(EMPTY_STATS)
  const [toast, setToast] = useState(null)

  const finishSplash = useCallback(() => setShowSplash(false), [])

  const notify = useCallback((payload) => {
    const id = Date.now()
    setToast({ id, ...payload })
    window.clearTimeout(notify._t)
    notify._t = window.setTimeout(() => setToast(null), 2600)
  }, [])

  function changeTab(next) {
    setTab(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleStats(type, scores) {
    setStats((prev) => {
      if (type === 'PRE') {
        return {
          ...prev,
          preCount: prev.preCount + 1,
          preScores: prev.preScores.map((v, i) => v + scores[i]),
        }
      }
      return {
        ...prev,
        postCount: prev.postCount + 1,
        postScores: prev.postScores.map((v, i) => v + scores[i]),
      }
    })
  }

  function handleQuizSuccess(type) {
    changeTab(type === 'PRE' ? 'capacitacion' : 'dashboard')
  }

  return (
    <>
      <AnimatePresence>{showSplash ? <Splash onDone={finishSplash} /> : null}</AnimatePresence>

      <Toast toast={toast} />

      <div className={`flex min-h-dvh flex-col ${showSplash ? 'invisible' : ''}`}>
        <Header />
        <Nav active={tab} onChange={changeTab} />

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8 safe-pb sm:pb-10">
          {tab === 'pretest' ? (
            <>
              <WelcomeBanner onStart={() => changeTab('capacitacion')} />
              <div className="mt-8">
                <QuizForm
                  type="PRE"
                  questions={PRE_QUESTIONS}
                  title="Evaluación de diagnóstico"
                  subtitle="Responde antes de revisar el material para medir tus conocimientos previos. Las respuestas se guardan en Google Sheets."
                  accent="ink"
                  submitLabel="Enviar Pre-Test"
                  onSuccess={handleQuizSuccess}
                  onStats={handleStats}
                  notify={notify}
                />
              </div>
            </>
          ) : null}

          {tab === 'capacitacion' ? <Capacitacion /> : null}

          {tab === 'prompts' ? <Prompts notify={notify} /> : null}

          {tab === 'posttest' ? (
            <QuizForm
              type="POST"
              questions={POST_QUESTIONS}
              title="Evaluación de salida"
              subtitle="Demuestra lo aprendido. Tus respuestas también se registran en Google Sheets."
              accent="emerald"
              submitLabel="Finalizar Post-Test"
              onSuccess={handleQuizSuccess}
              onStats={handleStats}
              notify={notify}
            />
          ) : null}

          {tab === 'dashboard' ? (
            <Dashboard
              stats={stats}
              onReset={() => {
                setStats(EMPTY_STATS)
                notify({ title: 'Vista reiniciada', message: 'Las estadísticas en pantalla volvieron a 0.' })
              }}
            />
          ) : null}
        </main>

        <footer className="mt-auto hidden border-t border-ink/8 bg-ink px-4 py-5 text-center text-[11px] text-sky/80 sm:block">
          © {new Date().getFullYear()} IE 5084 Carlos Phillips · Plan de Capacitación Tecnológica
        </footer>
      </div>
    </>
  )
}

function WelcomeBanner({ onStart }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05 }}
      className="relative overflow-hidden rounded-[1.75rem] bg-ink px-5 py-7 text-white sm:rounded-[2rem] sm:px-8 sm:py-9"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            'radial-gradient(700px 280px at 85% 20%, rgba(20,184,166,0.35), transparent 55%), radial-gradient(500px 240px at 10% 100%, rgba(197,220,232,0.22), transparent 50%)',
        }}
      />
      <div className="relative">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-bright">
          Taller pedagógico digital
        </p>
        <h2 className="font-display mt-3 max-w-xl text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
          IE 5084 Carlos Phillips
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-sky/95 sm:text-base">
          Potencia tus sesiones, unidades e instrumentos de evaluación con NotebookLM — sin perder el criterio pedagógico.
        </p>
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={onStart}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-teal px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-bright"
          >
            Ir al módulo
          </button>
          <span className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-white/80">
            Empieza por el Pre-Test ↓
          </span>
        </div>
      </div>
    </motion.section>
  )
}
