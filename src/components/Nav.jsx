import { TABS } from '../lib/data'
import { TabIcon } from './Icons'

export default function Nav({ active, onChange }) {
  return (
    <>
      {/* Desktop / tablet tabs */}
      <nav className="mx-auto hidden max-w-5xl px-4 pt-6 sm:block sm:px-6">
        <div className="flex gap-1 overflow-x-auto rounded-2xl border border-ink/8 bg-white/70 p-1.5 shadow-sm backdrop-blur-md">
          {TABS.map((tab) => {
            const isActive = active === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChange(tab.id)}
                className={`flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold transition-all md:text-sm ${
                  isActive
                    ? 'bg-ink text-white shadow-md'
                    : 'text-ink-soft/70 hover:bg-mist hover:text-ink'
                }`}
              >
                <TabIcon name={tab.icon} className="h-4 w-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Mobile bottom bar */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-white/95 shadow-[0_-8px_30px_rgba(10,37,64,0.08)] backdrop-blur-xl sm:hidden safe-bottom">
        <div className="grid grid-cols-5 px-1 pt-1.5 pb-1">
          {TABS.map((tab) => {
            const isActive = active === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChange(tab.id)}
                className={`flex flex-col items-center gap-0.5 rounded-xl px-1 py-2 transition-colors ${
                  isActive ? 'text-teal' : 'text-ink/40'
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all ${
                    isActive ? 'bg-teal/12 scale-105' : ''
                  }`}
                >
                  <TabIcon name={tab.icon} className="h-5 w-5" />
                </span>
                <span className="text-[10px] font-bold tracking-tight">{tab.short}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
