export const profile = {
  name: 'Lavanya R',
  brand: 'LAVANYA.R',
  title: 'AI Engineer & Full Stack Developer',
  location: 'Tamil Nadu, India',
  email: 'lavanyaram1801@gmail.com',
  github: 'https://github.com/Lavanya-Ram1801',
  linkedin: 'https://www.linkedin.com/in/lavanya-90390b2a4/',
  resumePath: '/Lavanya_R_Resume.pdf',
  /** true only when public/Lavanya_R_Resume.pdf exists at build time */
  hasResume: __HAS_RESUME__,
} as const

export const navItems = [
  { id: 'home', label: 'HOME' },
  { id: 'work', label: 'WORK' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'contact', label: 'CONTACT' },
] as const

export type NavId = (typeof navItems)[number]['id']

export const education = [
  {
    degree: 'B.Tech in Artificial Intelligence and Data Science',
    school: 'PSRR College of Engineering, Sivakasi',
    years: '2023–2027',
    score: 'CGPA: 8.4/10',
  },
  {
    degree: 'Higher Secondary Certificate',
    school: 'K.A.M.P. Meerania Higher Secondary School, Kalakkad',
    years: '2022–2023',
    score: 'Percentage: 76%',
  },
]

export const experience = [
  {
    role: 'Python Full Stack Development Intern',
    company: 'Elysium Intelligence Business Solution Private Limited (EIBS)',
    period: 'June 2025 – July 2025',
    points: [
      'Developed web application components using Python, HTML, CSS, and JavaScript.',
      'Worked across frontend and backend workflows.',
      'Contributed to database operations, testing, debugging, and feature improvements.',
      'Connected frontend components with backend services.',
    ],
  },
  {
    role: 'Full Stack Development Intern',
    company: 'Conprg Technologies (OPC) Pvt. Ltd.',
    period: 'December 2025',
    points: [
      'Contributed to frontend, backend, and database integration.',
      'Worked on application features, functional testing, debugging, and application data integration.',
    ],
  },
]

export const certifications = [
  { title: 'Data Mining', issuer: 'NPTEL' },
  { title: 'Artificial Intelligence', issuer: 'Novitech' },
  { title: 'Introduction to OpenAI GPT Models', issuer: 'Infosys Springboard' },
  { title: 'Natural Language Processing', issuer: 'Infosys Springboard' },
  { title: 'User Experience', issuer: 'Accenture' },
]
