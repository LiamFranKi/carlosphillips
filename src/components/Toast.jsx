import { AnimatePresence, motion } from 'framer-motion'
import { IconCheck } from './Icons'

export default function Toast({ toast }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-[80] flex justify-center px-4 sm:top-5 sm:justify-end">
      <AnimatePresence>
        {toast ? (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            className="pointer-events-auto flex max-w-sm items-start gap-3 rounded-2xl border border-white/50 bg-ink/95 px-4 py-3 text-white shadow-xl backdrop-blur-md"
          >
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-bright/20 text-teal-bright">
              <IconCheck className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-bold">{toast.title}</p>
              {toast.message ? <p className="mt-0.5 text-xs text-white/70">{toast.message}</p> : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
