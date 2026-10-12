export type ProjectId = 'veriflow' | 'klink' | 'quiz'

export interface Project {
  id: ProjectId
  index: string
  name: string
  title: string
  category: string
  description: string
  tech: string[]
  highlights?: { label: string; items: string[] }
  /** Only set when a real public repository exists. */
  repo?: string
  /** Only set when a real deployment exists. Intentionally empty for now. */
  live?: string
}

export const projects: Project[] = [
  {
    id: 'veriflow',
    index: '01',
    name: 'VeriFlow',
    title: 'VeriFlow — Trusted Data. Transparent Verification.',
    category: 'Full Stack Development',
    description:
      'VeriFlow is a full-stack verification-management application designed to organize verification records and administrative workflows through a structured, role-based interface.',
    tech: [
      'Angular 17',
      'TypeScript',
      'Node.js',
      'Express.js',
      'REST APIs',
      'JWT',
      'bcrypt',
      'RxJS',
      'JSON-based local storage',
    ],
    highlights: {
      label: 'Key features',
      items: [
        'Authentication',
        'Role-based access control',
        'Admin and general-user experiences',
        'Verification record management',
        'Search and filtering',
        'Sorting and pagination',
        'Dashboard statistics',
        'Administrative user management',
        'Protected routes and API authorization',
      ],
    },
    repo: 'https://github.com/Lavanya-Ram1801/veriflow',
  },
  {
    id: 'klink',
    index: '02',
    name: 'K-LINK AI',
    title: 'K-LINK AI — Cross-Cultural Multilingual Workplace Intelligence',
    category: 'Artificial Intelligence | NLP | Generative AI',
    description:
      'K-LINK AI is a multilingual workplace intelligence platform designed to analyze professional communication, identify possible miscommunication, interpret cultural intent, and improve workplace interactions.',
    tech: ['Python', 'FastAPI', 'React', 'JavaScript', 'NLP', 'LLM concepts', 'RAG concepts'],
    highlights: {
      label: 'Four modules',
      items: [
        'Workplace Miscommunication Predictor',
        'Cultural Intent Detection',
        'Meeting Intelligence',
        'Communication Simulator',
      ],
    },
  },
  {
    id: 'quiz',
    index: '03',
    name: 'Interactive Technical Quiz',
    title: 'Interactive Technical Quiz',
    category: 'Frontend Development | Interactive Learning',
    description:
      'An interactive technical quiz interface with category-based navigation for technical learning areas, including frontend frameworks and database fundamentals.',
    tech: ['React', 'JavaScript', 'HTML', 'CSS'],
  },
]
