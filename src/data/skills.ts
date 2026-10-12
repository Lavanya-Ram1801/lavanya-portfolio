export type SkillIcon = 'code' | 'brain' | 'layout' | 'server' | 'wrench'

export interface SkillGroup {
  title: string
  icon: SkillIcon
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming',
    icon: 'code',
    skills: ['Python', 'C', 'C++', 'Java', 'SQL'],
  },
  {
    title: 'AI & Machine Learning',
    icon: 'brain',
    skills: [
      'Machine Learning',
      'Natural Language Processing',
      'Generative AI',
      'Large Language Models',
      'Retrieval-Augmented Generation',
      'Multilingual NLP',
      'Intent Detection',
      'Text Analysis',
      'Prompt Engineering',
    ],
  },
  {
    title: 'Frontend',
    icon: 'layout',
    skills: ['React', 'Angular', 'HTML', 'CSS', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'Backend',
    icon: 'server',
    skills: ['FastAPI', 'Node.js', 'Express.js', 'REST APIs'],
  },
  {
    title: 'Tools & Concepts',
    icon: 'wrench',
    skills: [
      'Git',
      'GitHub',
      'VS Code',
      'SQL',
      'DBMS',
      'Data Structures and Algorithms',
      'Operating Systems',
    ],
  },
]
