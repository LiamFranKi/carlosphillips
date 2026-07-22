import { useState } from 'react'
import { motion } from 'framer-motion'
import { asset } from '../lib/assets'
import { IconDownload, IconExternal, IconHeadphones } from './Icons'

export default function Capacitacion() {
  const [infografiaError, setInfografiaError] = useState(false)
  const infografiaSrc = asset('assets/infografia.png')

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-4xl space-y-6"
    >
      <div>
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Módulo de capacitación</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft/75">
          Escucha el podcast, revisa la presentación y consulta la infografía guía. Empieza por el audio si estás en el móvil.
        </p>
      </div>

      {/* Podcast */}
      <section className="overflow-hidden rounded-3xl border border-ink/8 bg-gradient-to-br from-ink to-ink-soft p-5 text-white shadow-lg sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal/30 text-teal-bright">
            <IconHeadphones className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-lg font-bold">Podcast Audio Overview</h3>
            <p className="mt-1 text-xs text-sky/90">
              Resumen audible generado con NotebookLM para docentes.
            </p>
          </div>
        </div>
        <div className="mt-5">
          <audio controls preload="metadata" className="w-full rounded-xl">
            <source src={asset('assets/podcast.m4a')} type="audio/mp4" />
            Tu navegador no soporta el reproductor de audio.
          </audio>
        </div>
      </section>

      {/* Presentación */}
      <section className="rounded-3xl border border-ink/8 bg-white/85 p-5 shadow-sm backdrop-blur-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-ink">Presentación de la capacitación</h3>
            <p className="mt-1 text-xs text-ink-soft/70">Abre el PDF a pantalla completa o descarga el PPTX.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={asset('assets/presentacion.pdf')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-ink/10 bg-mist px-3.5 py-2 text-xs font-bold text-ink transition hover:bg-sky/40"
            >
              <IconExternal className="h-4 w-4" />
              Abrir PDF
            </a>
            <a
              href={asset('assets/presentacion.pptx')}
              download
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-ink px-3.5 py-2 text-xs font-bold text-white transition hover:bg-ink-soft"
            >
              <IconDownload className="h-4 w-4" />
              Descargar PPTX
            </a>
          </div>
        </div>

        {/* Desktop preview; mobile prefers open/download */}
        <div className="mt-5 hidden overflow-hidden rounded-2xl border border-ink/10 bg-ink md:block">
          <iframe
            title="Presentación PDF"
            src={`${asset('assets/presentacion.pdf')}#view=FitH&toolbar=1&navpanes=0`}
            className="h-[620px] w-full border-0"
          />
        </div>
        <div className="mt-5 rounded-2xl border border-dashed border-ink/15 bg-mist/60 p-5 text-center md:hidden">
          <p className="text-sm font-semibold text-ink">Vista previa en móvil limitada</p>
          <p className="mt-1 text-xs text-ink-soft/70">
            Usa <strong>Abrir PDF</strong> para ver las diapositivas a pantalla completa.
          </p>
        </div>
      </section>

      {/* Infografía — nombre de archivo sin acento: infografia.png */}
      <section className="rounded-3xl border border-ink/8 bg-white/85 p-5 shadow-sm backdrop-blur-sm sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="font-display text-lg font-bold text-ink">Infografía guía</h3>
          <a
            href={infografiaSrc}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal"
          >
            Ver completa <IconExternal className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="rounded-2xl border border-ink/8 bg-sand/40 p-2 sm:p-4">
          {infografiaError ? (
            <div className="flex flex-col items-center justify-center gap-3 px-4 py-10 text-center">
              <p className="text-sm font-semibold text-ink">No se pudo mostrar la infografía aquí.</p>
              <a
                href={infografiaSrc}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-ink px-4 py-2 text-xs font-bold text-white"
              >
                Abrir infografia.png <IconExternal className="h-4 w-4" />
              </a>
            </div>
          ) : (
            <img
              src={infografiaSrc}
              alt="Infografia guia NotebookLM"
              width={2752}
              height={1536}
              decoding="async"
              className="mx-auto block h-auto w-full max-w-full rounded-xl"
              onError={() => setInfografiaError(true)}
            />
          )}
        </div>
      </section>
    </motion.div>
  )
}
