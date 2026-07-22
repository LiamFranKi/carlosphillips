import { motion } from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { IconRefresh } from './Icons'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Dashboard({ stats, onReset }) {
  const total = stats.preCount + stats.postCount
  const prePct =
    stats.preCount > 0
      ? Math.round((stats.preScores.reduce((a, b) => a + b, 0) / (stats.preCount * 3)) * 100)
      : 0
  const postPct =
    stats.postCount > 0
      ? Math.round((stats.postScores.reduce((a, b) => a + b, 0) / (stats.postCount * 3)) * 100)
      : 0

  const preBar = stats.preScores.map((val) =>
    stats.preCount ? Math.round((val / stats.preCount) * 100) : 0,
  )
  const postBar = stats.postScores.map((val) =>
    stats.postCount ? Math.round((val / stats.postCount) * 100) : 0,
  )

  const data = {
    labels: ['Conceptos', 'Utilidad / Fuentes', 'Audio Overview'],
    datasets: [
      {
        label: 'Pre-Test (%)',
        data: preBar,
        backgroundColor: '#1a3a5c',
        borderRadius: 8,
        barPercentage: 0.65,
      },
      {
        label: 'Post-Test (%)',
        data: postBar,
        backgroundColor: '#14b8a6',
        borderRadius: 8,
        barPercentage: 0.65,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { boxWidth: 12, font: { family: 'Figtree', size: 11 } },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { callback: (v) => `${v}%`, font: { family: 'Figtree', size: 11 } },
        grid: { color: 'rgba(10,37,64,0.06)' },
      },
      x: {
        ticks: { font: { family: 'Figtree', size: 11 } },
        grid: { display: false },
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-4xl"
    >
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Resultados</h2>
          <p className="mt-2 text-sm text-ink-soft/75">
            Comparativa en vivo Pre-Test vs Post-Test en esta sesión.
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl border border-ink/10 bg-white px-3.5 py-2 text-xs font-bold text-ink transition hover:bg-mist"
        >
          <IconRefresh className="h-4 w-4" />
          Reiniciar vista
        </button>
      </div>

      <div className="mb-5 grid grid-cols-3 gap-2.5 sm:gap-4">
        <StatCard label="Respuestas" value={String(total)} tone="ink" />
        <StatCard label="Pre-Test" value={`${prePct}%`} tone="navy" />
        <StatCard label="Post-Test" value={`${postPct}%`} tone="teal" />
      </div>

      <div className="rounded-3xl border border-ink/8 bg-white/85 p-4 shadow-sm backdrop-blur-sm sm:p-6">
        <div className="h-64 sm:h-80">
          <Bar data={data} options={options} />
        </div>
        {total === 0 ? (
          <p className="mt-4 text-center text-xs text-ink/45">
            Aún no hay datos. Completa el Pre-Test o Post-Test para ver la gráfica.
          </p>
        ) : null}
      </div>
    </motion.div>
  )
}

function StatCard({ label, value, tone }) {
  const tones = {
    ink: 'bg-sand/70 text-ink',
    navy: 'bg-ink text-white',
    teal: 'bg-teal text-white',
  }
  return (
    <div className={`rounded-2xl px-3 py-4 text-center sm:rounded-3xl sm:px-4 sm:py-5 ${tones[tone]}`}>
      <p className="text-[10px] font-bold uppercase tracking-wider opacity-70 sm:text-xs">{label}</p>
      <p className="font-display mt-1 text-2xl font-bold sm:text-3xl">{value}</p>
    </div>
  )
}
