import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { asset } from '../lib/assets'

const DURATION_MS = 5000
const BRAND = 'Carlos Phillips'

export default function Splash({ onDone }) {
  const [progress] = useProgress(DURATION_MS)

  useEffect(() => {
    const done = setTimeout(onDone, DURATION_MS)
    return () => clearTimeout(done)
  }, [onDone])

  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-6"
      style={{
        background:
          'radial-gradient(circle at 30% 20%, #1a4a6e 0%, transparent 40%), radial-gradient(circle at 80% 80%, #0f766e55 0%, transparent 35%), linear-gradient(160deg, #061525 0%, #0a2540 45%, #0c3a42 100%)',
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient orbs */}
      <motion.div
        className="pointer-events-none absolute -left-20 top-16 h-64 w-64 rounded-full bg-teal-bright/20 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 20, 0], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -right-16 bottom-24 h-72 w-72 rounded-full bg-sky/30 blur-3xl"
        animate={{ x: [0, -24, 0], y: [0, -16, 0], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative flex flex-col items-center">
        <div className="relative mb-8 flex h-36 w-36 items-center justify-center sm:h-40 sm:w-40">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120" aria-hidden>
            <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
            <motion.circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#14b8a6"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              initial={{ strokeDashoffset: circumference }}
            />
          </svg>

          <motion.div
            className="relative flex h-24 w-24 items-center justify-center rounded-[1.6rem] bg-white p-3 shadow-2xl sm:h-28 sm:w-28 sm:rounded-[1.85rem]"
            initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.15 }}
          >
            <img
              src={asset('assets/logo.png')}
              alt="Logo IE 5084 Carlos Phillips"
              className="max-h-full max-w-full object-contain"
            />
            <motion.span
              className="absolute inset-0 rounded-[1.6rem] ring-2 ring-teal-bright/40 sm:rounded-[1.85rem]"
              animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.04, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
          </motion.div>
        </div>

        <motion.p
          className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-bright"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          IE 5084
        </motion.p>

        <h1 className="font-display text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {BRAND.split('').map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              className="inline-block"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.04, duration: 0.35 }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mt-3 max-w-xs text-center text-sm font-medium text-sky"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          Capacitación Docente · NotebookLM
        </motion.p>

        <motion.div
          className="mt-8 h-1 w-40 overflow-hidden rounded-full bg-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <motion.div
            className="h-full origin-left rounded-full bg-gradient-to-r from-teal to-teal-bright"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: DURATION_MS / 1000, ease: 'linear' }}
          />
        </motion.div>

        <motion.p
          className="mt-3 text-[11px] font-medium tracking-wide text-white/45"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 5, times: [0, 0.2, 0.85, 1] }}
        >
          Preparando tu aula digital…
        </motion.p>
      </div>
    </motion.div>
  )
}

function useProgress(duration) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = performance.now()
    let frame

    const tick = (now) => {
      const pct = Math.min(100, ((now - start) / duration) * 100)
      setProgress(pct)
      if (pct < 100) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [duration])

  return [progress]
}
