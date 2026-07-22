import { asset } from '../lib/assets'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-ink/95 text-white shadow-lg backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-3.5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-md sm:h-12 sm:w-12">
          <img src={asset('assets/logo.png')} alt="Logo IE 5084" className="max-h-full max-w-full object-contain" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="font-display truncate text-lg font-bold tracking-tight sm:text-xl">
            IE 5084 Carlos Phillips
          </h1>
          <p className="truncate text-[11px] font-medium text-sky sm:text-xs">
            NotebookLM en Educación Primaria
          </p>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-teal-bright sm:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-bright opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-bright" />
          </span>
          En vivo
        </div>
      </div>
    </header>
  )
}
