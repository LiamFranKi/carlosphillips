export const TABS = [
  { id: 'pretest', label: 'Pre-Test', short: 'Pre', icon: 'clipboard' },
  { id: 'capacitacion', label: 'Capacitación', short: 'Módulo', icon: 'book' },
  { id: 'prompts', label: 'Prompts', short: 'Prompts', icon: 'spark' },
  { id: 'posttest', label: 'Post-Test', short: 'Post', icon: 'award' },
  { id: 'dashboard', label: 'Resultados', short: 'Stats', icon: 'chart' },
]

export const PRE_QUESTIONS = [
  {
    id: 'pre_q1',
    text: '¿Qué es principalmente NotebookLM de Google?',
    options: [
      { value: 'A', label: 'Un buscador web general para descargar diapositivas.' },
      { value: 'B', label: 'Un cuaderno inteligente que analiza tus propios documentos cargados.' },
      { value: 'C', label: 'Una red social exclusiva para profesores.' },
    ],
  },
  {
    id: 'pre_q2',
    text: '¿Qué ocurre cuando haces una pregunta en NotebookLM?',
    options: [
      { value: 'A', label: 'Responde basándose en tus documentos de la carpeta o biblioteca subida.' },
      { value: 'B', label: 'Inventa respuestas sacadas de foros aleatorios.' },
      { value: 'C', label: 'Solo te reacciona con emojis.' },
    ],
  },
  {
    id: 'pre_q3',
    text: '¿Qué utilidad tiene la función "Audio Overview" (Podcast)?',
    options: [
      { value: 'A', label: 'Graba el audio de tu clase presencial.' },
      { value: 'B', label: 'Genera una conversación sintética en audio analizando tus fuentes subidas.' },
      { value: 'C', label: 'Es una lista de reproducción de música instrumental.' },
    ],
  },
]

export const POST_QUESTIONS = [
  {
    id: 'post_q1',
    text: '¿Cuál es el primer paso para empezar a trabajar en NotebookLM?',
    options: [
      { value: 'A', label: 'Crear un cuaderno y subir tus archivos fuente (PDF, Word, enlaces).' },
      { value: 'B', label: 'Buscar imágenes públicas en Google.' },
    ],
  },
  {
    id: 'post_q2',
    text: '¿Por qué NotebookLM ofrece respuestas confiables para elaborar sesiones?',
    options: [
      { value: 'A', label: 'Porque se ciñe a la documentación cargada por el usuario, citando las fuentes.' },
      { value: 'B', label: 'Porque descarga automáticamente plantillas editables.' },
    ],
  },
  {
    id: 'post_q3',
    text: '¿Qué aporta la función "Audio Overview"?',
    options: [
      { value: 'A', label: 'Facilita el repaso rápido del tema en formato conversación de podcast.' },
      { value: 'B', label: 'Reemplaza por completo el trabajo en el aula.' },
    ],
  },
]

export const CORRECT_ANSWERS = {
  PRE: { pre_q1: 'B', pre_q2: 'A', pre_q3: 'B' },
  POST: { post_q1: 'A', post_q2: 'A', post_q3: 'A' },
}

export const PROMPTS = [
  {
    id: 'prompt-1',
    tag: 'Planificación CNEB',
    meta: 'Sesión Didáctica',
    tone: 'teal',
    title: 'Generar Sesión Completa de Ciencia y Tecnología',
    blurb: 'Estructura la sesión completa manteniendo competencia, criterios y momentos didácticos.',
    text: `Actúa como un experto pedagógico del Ministerio de Educación de Perú. Utilizando la información de las fuentes subidas sobre "Los Sentidos y los Alimentos", genera una Sesión de Aprendizaje de 90 minutos para 5to Grado de Primaria.

Incluye:
1. Datos Informativos (IE 5084 Carlos Phillips, Área, Grado).
2. Propósito de Aprendizaje con la competencia "Indaga mediante métodos científicos para construir sus conocimientos" y 2 criterios de evaluación.
3. Secuencia Didáctica (Inicio, Desarrollo y Cierre) con una situación retadora y conflicto cognitivo.
4. Plan de indagación con estaciones de trabajo práctico.`,
  },
  {
    id: 'prompt-2',
    tag: 'Indagación Práctica',
    meta: 'Estaciones de Trabajo',
    tone: 'ink',
    title: 'Diseñar Estaciones Sensoriales de Experimentos',
    blurb: 'Dinámicas grupales con muestras de alimentos reales para el recojo de datos.',
    text: `A partir del texto subido sobre los órganos de los sentidos y la nutrición, diseña 3 estaciones de indagación sensorial para el aula de 5to Grado:

• Estación 1: La Vista (Comparar alimento fresco vs. ultraprocesado con colorantes).
• Estación 2: El Olfato (Reconocer frescura en pan o fruta).
• Estación 3: El Tacto (Identificar textura de frutas turgentes vs. oxidadas).

Para cada estación detalla: Materiales sencillos, instrucción clara para el estudiante de 10 años y una pregunta guía para su ficha de registro.`,
  },
  {
    id: 'prompt-3',
    tag: 'Evaluación',
    meta: 'Lista de Cotejo',
    tone: 'amber',
    title: 'Crear Lista de Cotejo y Ficha de Registro',
    blurb: 'Instrumentos de evaluación formativa alineados a la competencia.',
    text: `Genera una Lista de Cotejo para evaluar a 30 estudiantes de 5to Grado B en la sesión "Indagamos: ¿Cómo nos ayudan los sentidos a elegir alimentos sanos?".

Define 2 Criterios de Evaluación precisados:
1. Planteamiento de hipótesis sobre apariencia/olor y estado de conservación.
2. Registro y comparación de datos sensoriales para validar o refutar su hipótesis.

Incluye además una Ficha de Registro individual en formato de tabla para que el alumno complete sus explicaciones iniciales vs. explicaciones finales.`,
  },
  {
    id: 'prompt-4',
    tag: 'Metacognición',
    meta: 'Preguntas Clave',
    tone: 'sky',
    title: 'Preguntas de Conflicto Cognitivo y Cierre',
    blurb: 'Preguntas abiertas para pensamiento crítico en el Inicio y metacognición en el Cierre.',
    text: `Redacta 5 preguntas de Conflicto Cognitivo para el inicio de la clase que desafíen a los alumnos de 5to grado sobre por qué no todo alimento con aroma bonito o color brillante es saludable (ej. snacks o golosinas).

Asimismo, redacta 5 preguntas de Metacognición para el Cierre de la clase que conecten lo aprendido con la vida diaria (por ejemplo, cómo usarán sus sentidos al comprar alimentos en el quiosco de la escuela o en el mercado).`,
  },
]
