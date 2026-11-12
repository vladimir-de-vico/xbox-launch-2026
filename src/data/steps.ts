interface Vec3 {
  x: number
  y: number
  z: number
}

interface Step {
  id: number
  menuLabel: string
  /** `*word*` renders as emphasis */
  titleLines: [string, string] | []
  description: string
  ctaLabel: string
  ctaId: string
  alignment: 'left' | 'center' | 'right'
  images?: string[]
  meshPosition: Vec3
  meshRotation: Vec3
  cinematicMainBack: Vec3 & { intensity: number }
  cinematicMainFront: Vec3
  innerLight: Vec3 & { intensity: number; angle: number }
}

const gallery = [
  '1_1',
  '1',
  '1_2',
  '2_1',
  '2_2',
  '2_3',
  '2_4',
  '2_5',
  '2_6',
  '3_1',
  '3_2',
  '3_3',
  '3_4',
  '3_5',
  '3_6',
].map((name) => `/images/${name}.webp`)

const steps: Step[] = [
  {
    id: 0,
    menuLabel: 'Introduzione',
    titleLines: ['XBOX', 'Series X'],
    description: '',
    ctaLabel: '',
    ctaId: '',
    alignment: 'center',
    meshPosition: { x: 0, y: -2, z: -3 },
    meshRotation: { x: 0.05, y: 0.78, z: 0 },
    cinematicMainBack: { x: -35, y: 4, z: -50, intensity: 0 },
    cinematicMainFront: { x: -5.2, y: -2, z: 3 },
    innerLight: { x: 0, y: -8, z: -2.2, intensity: 0, angle: 0 },
  },
  {
    id: 1,
    menuLabel: 'Performance',
    titleLines: ['La più *veloce* e', 'potente di sempre'],
    description:
      'Progettata per farti percepire la velocità. Tempi di caricamento, drasticamente ridotti grazie alla nuova unità SSD da 1TB espandibile, e alla nuova CPU. Salta tra i tuoi titoli preferiti con un click e vivi esperienze di gioco ancora più fluide con i nuovi 120 fps.',
    ctaLabel: 'Scopri di più',
    ctaId: 'speed-cta',
    alignment: 'left',
    meshPosition: { x: 1.7, y: -0.45, z: -5.5 },
    meshRotation: { x: 0.3, y: -1, z: 0 },
    cinematicMainBack: { x: 50, y: 11, z: -50, intensity: 1 },
    cinematicMainFront: { x: 6, y: -2, z: 3 },
    innerLight: { x: 1.7, y: -9, z: -7.3, intensity: 100, angle: 0.099 },
  },
  {
    id: 2,
    menuLabel: 'Design',
    titleLines: ['Progettata per', '*durare* nel tempo'],
    description:
      'L’elegante design monolitico di Xbox Series X è il risultato della combinazione di innovazioni hardware e software elaborate con l’unico scopo di ottenere il massimo delle prestazioni e della velocità, mantenendo alto il coefficiente di affidabilità.',
    ctaLabel: 'Scopri di più',
    ctaId: 'design-cta',
    alignment: 'right',
    meshPosition: { x: -1.7, y: -0.45, z: -5.5 },
    meshRotation: { x: 0.3, y: 1, z: 0 },
    cinematicMainBack: { x: -50, y: 11, z: -50, intensity: 1 },
    cinematicMainFront: { x: -6, y: -2, z: 3 },
    innerLight: { x: -1.7, y: -9, z: -7.3, intensity: 100, angle: 0.099 },
  },
  {
    id: 3,
    menuLabel: 'Intrattenimento',
    titleLines: ['*Goditi* al massimo', 'i tuoi giochi preferiti'],
    description:
      'Con Xbox Series X potrai vivere esperienze di gioco ancora più immersive grazie al supporto per risoluzioni fino a 4K a 120 fps e HDR. Tempi di caricamento e input lag diminuiti drasticamente per garantirti il massimo del divertimento e del controllo.',
    ctaLabel: 'Scopri di più',
    ctaId: 'entertainment-cta',
    alignment: 'left',
    images: gallery,
    meshPosition: { x: 0, y: 0, z: -8 },
    meshRotation: { x: 0, y: 0, z: 0 },
    cinematicMainBack: { x: 0, y: 4, z: -50, intensity: 0 },
    cinematicMainFront: { x: -10, y: 20, z: 3 },
    innerLight: { x: 0, y: -8, z: -8, intensity: 100, angle: 0.099 },
  },
  {
    id: 4,
    menuLabel: 'Iscriviti',
    titleLines: ['Con il Game Pass', 'divertimento *illimitato*'],
    description: '',
    ctaLabel: 'Abbonati',
    ctaId: 'subscription-cta',
    alignment: 'center',
    meshPosition: { x: 4, y: -1.35, z: 0 },
    meshRotation: { x: 0.45, y: -2.7, z: 0 },
    cinematicMainBack: { x: 0, y: 4, z: -50, intensity: 0 },
    cinematicMainFront: { x: -10, y: 20, z: 3 },
    innerLight: { x: 4, y: -8, z: -4, intensity: 100, angle: 0.099 },
  },
  {
    id: 5,
    menuLabel: 'Acquista',
    titleLines: [],
    description: '',
    ctaLabel: 'Acquista',
    ctaId: 'buy-cta',
    alignment: 'center',
    meshPosition: { x: 0, y: 0, z: -7 },
    meshRotation: { x: 0, y: 0, z: 0 },
    cinematicMainBack: { x: 0, y: 4, z: -50, intensity: 0 },
    cinematicMainFront: { x: -10, y: 20, z: 3 },
    innerLight: { x: 0, y: -8, z: -8, intensity: 100, angle: 0.099 },
  },
]

export type { Step }
export { steps }
