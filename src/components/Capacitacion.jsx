import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { absoluteAsset, asset, googlePdfViewer } from '../lib/assets'
import { IconDownload, IconExpand, IconExternal, IconHeadphones, IconPlay } from './Icons'

export default function Capacitacion() {
  const [infografiaError, setInfografiaError] = useState(false)
  const [showPdf, setShowPdf] = useState(false)
  const videoRef = useRef(null)
  const videoShellRef = useRef(null)
  const reelRef = useRef(null)
  const reelShellRef = useRef(null)

  const infografiaSrc = asset('assets/infografia.png')
  const videoSrc = asset('assets/video.mp4')
  const reelSrc = asset('assets/video1.mp4')
  const pdfPath = 'assets/presentacion.pdf'
  const pptxHref = asset('assets/presentacion.pptx')

  const pdfDirect = useMemo(() => absoluteAsset(pdfPath), [])
  const pdfViewer = useMemo(() => googlePdfViewer(pdfPath), [])

  function openPdf(event) {
    event.preventDefault()
    // En móvil, el visor de Google es más fiable que el PDF nativo.
    const opened = window.open(pdfViewer, '_blank', 'noopener,noreferrer')
    if (!opened) {
      window.location.assign(pdfViewer)
    }
  }

  async function enterFullscreen(shellRef, videoRefTarget) {
    const shell = shellRef.current
    const video = videoRefTarget.current
    if (!shell || !video) return

    try {
      if (shell.requestFullscreen) {
        await shell.requestFullscreen()
      } else if (video.webkitEnterFullscreen) {
        // iOS Safari: fullscreen nativo del video
        video.webkitEnterFullscreen()
        return
      } else if (shell.webkitRequestFullscreen) {
        await shell.webkitRequestFullscreen()
      }
      await video.play().catch(() => {})
    } catch {
      video.play().catch(() => {})
    }
  }

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
          Escucha el podcast, mira el video, revisa la presentación y consulta la infografía guía.
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

      {/* Video vertical tipo TikTok / Reel */}
      <section className="overflow-hidden rounded-3xl border border-ink/8 bg-white/90 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col gap-3 border-b border-ink/8 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber/15 text-amber">
              <IconPlay className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h3 className="font-display text-lg font-bold text-ink">Reel rápido</h3>
                <span className="rounded-md bg-ink/8 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-ink/70">
                  Vertical
                </span>
              </div>
              <p className="text-xs text-ink-soft/70">
                Resumen corto estilo TikTok — ideal para ver en el celular.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => enterFullscreen(reelShellRef, reelRef)}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-bold text-white transition hover:bg-teal sm:w-auto"
          >
            <IconExpand className="h-4 w-4" />
            Pantalla completa
          </button>
        </div>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,380px)_1fr]">
          {/* Columna video */}
          <div className="flex justify-center bg-gradient-to-b from-ink to-ink-soft px-4 py-6 sm:px-6 sm:py-8 lg:justify-end lg:pr-6">
            <div
              ref={reelShellRef}
              className="relative h-[min(70vh,620px)] w-[min(100%,calc(min(70vh,620px)*9/16))] overflow-hidden rounded-[1.75rem] border-[3px] border-white/15 bg-black shadow-2xl ring-1 ring-white/10"
            >
              {/* notch decorativo */}
              <div className="pointer-events-none absolute top-2.5 left-1/2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/25" />
              <video
                ref={reelRef}
                className="h-full w-full object-cover bg-black"
                controls
                playsInline
                preload="metadata"
                controlsList="nodownload"
              >
                <source src={reelSrc} type="video/mp4" />
                Tu navegador no soporta la reproducción de video.
              </video>
            </div>
          </div>

          {/* Panel lateral — solo desktop/tablet ancha; llena el espacio del formato vertical */}
          <aside className="relative hidden overflow-hidden lg:block">
            <img
              src={infografiaSrc}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-30 blur-[2px] scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-ink/92 via-ink/85 to-teal/40" />
            <div className="relative flex h-full min-h-[420px] flex-col justify-between p-7 text-white xl:p-9">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-bright">
                  IE 5084 Carlos Phillips
                </p>
                <h4 className="font-display mt-3 text-2xl font-bold leading-tight xl:text-3xl">
                  NotebookLM en formato rápido
                </h4>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-sky/90">
                  Mira este reel para captar la idea en segundos. Luego pasa al video completo y a la presentación.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm text-white/85">
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-bright" />
                    Ideal para compartir con colegas por WhatsApp
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-bright" />
                    Complementa la infografía guía del módulo
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-bright" />
                    Usa pantalla completa para verlo como en el celular
                  </li>
                </ul>
              </div>

              <div className="mt-8 overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-md">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-white/60">
                  Referencia del módulo
                </p>
                <img
                  src={infografiaSrc}
                  alt="Vista previa de la infografía guía"
                  className="h-40 w-full rounded-xl object-cover object-top xl:h-48"
                />
              </div>
            </div>
          </aside>

          {/* Tip móvil bajo el reel */}
          <div className="border-t border-ink/8 bg-mist/50 px-4 py-3 text-center lg:hidden">
            <p className="text-xs text-ink-soft/75">
              Tip: usa <strong className="text-ink">Pantalla completa</strong> para verlo como un TikTok.
            </p>
          </div>
        </div>
      </section>

      {/* Video explicativo horizontal */}
      <section className="overflow-hidden rounded-3xl border border-ink/8 bg-white/90 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col gap-3 border-b border-ink/8 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal/12 text-teal">
              <IconPlay className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-lg font-bold text-ink">Video explicativo</h3>
              <p className="mt-0.5 text-xs text-ink-soft/70">
                Tutorial paso a paso de NotebookLM para docentes.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => enterFullscreen(videoShellRef, videoRef)}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-bold text-white transition hover:bg-teal sm:w-auto"
          >
            <IconExpand className="h-4 w-4" />
            Pantalla completa
          </button>
        </div>

        <div ref={videoShellRef} className="relative w-full bg-ink">
          <div className="relative aspect-video w-full">
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-contain bg-black"
              controls
              playsInline
              preload="metadata"
              controlsList="nodownload"
            >
              <source src={videoSrc} type="video/mp4" />
              Tu navegador no soporta la reproducción de video.
            </video>
          </div>
        </div>
      </section>

      {/* Presentación */}
      <section className="rounded-3xl border border-ink/8 bg-white/85 p-5 shadow-sm backdrop-blur-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-ink">Presentación de la capacitación</h3>
            <p className="mt-1 text-xs text-ink-soft/70">
              En celular úsala con el visor integrado o el botón Abrir PDF.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={openPdf}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-ink/10 bg-mist px-3.5 py-2.5 text-xs font-bold text-ink transition hover:bg-sky/40"
            >
              <IconExternal className="h-4 w-4" />
              Abrir PDF
            </button>
            <button
              type="button"
              onClick={() => setShowPdf(true)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-teal px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-teal-bright md:hidden"
            >
              Ver aquí
            </button>
            <a
              href={pptxHref}
              download
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-ink px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-ink-soft"
            >
              <IconDownload className="h-4 w-4" />
              Descargar PPTX
            </a>
          </div>
        </div>

        {/* Desktop: PDF nativo */}
        <div className="mt-5 hidden overflow-hidden rounded-2xl border border-ink/10 bg-ink md:block">
          <iframe
            title="Presentación PDF"
            src={`${asset(pdfPath)}#view=FitH&toolbar=1&navpanes=0`}
            className="h-[620px] w-full border-0"
          />
        </div>

        {/* Móvil: visor Google (más compatible) */}
        <div className="mt-5 md:hidden">
          {showPdf ? (
            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
              <iframe
                title="Presentación PDF móvil"
                src={pdfViewer}
                className="h-[70vh] min-h-[420px] w-full border-0"
                allow="fullscreen"
              />
              <div className="flex gap-2 border-t border-ink/8 p-3">
                <a
                  href={pdfDirect}
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-ink/10 bg-mist px-3 text-xs font-bold text-ink"
                >
                  Descargar PDF
                </a>
                <button
                  type="button"
                  onClick={openPdf}
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-ink px-3 text-xs font-bold text-white"
                >
                  Pantalla completa
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowPdf(true)}
              className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-teal/35 bg-teal/8 px-4 py-8 text-center active:scale-[0.99]"
            >
              <span className="text-sm font-bold text-ink">Toca para ver la presentación</span>
              <span className="text-xs text-ink-soft/70">
                Se abre un visor compatible con Android e iPhone
              </span>
            </button>
          )}
        </div>
      </section>

      {/* Infografía */}
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
