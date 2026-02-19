
import { SkillCategory } from './types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Programming',
    icon: 'code_blocks',
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    items: ['C#', 'TypeScript', 'JavaScript', 'SQL', 'Python', 'C++']
  },
  {
    name: 'Frontend',
    icon: 'web',
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    items: ['React', 'Vue.js', 'TailwindCSS', 'CSS3', 'HTML5', 'Bootstrap']
  },
  {
    name: 'Backend',
    icon: 'dns',
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    items: ['.NET 8', 'ASP.NET Core', 'Node.js', 'Django', 'REST API', 'Microservices']
  },
  {
    name: 'Database',
    icon: 'database',
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    items: ['SQL Server', 'PostgreSQL', 'MySQL', 'MongoDB', 'Supabase', 'Firestore']
  },
  {
    name: 'DevOps & Cloud',
    icon: 'cloud_sync',
    color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400',
    items: ['Docker', 'AWS', 'Azure', 'CI/CD', 'Unit/Integration Testing', 'Nginx']
  },
  {
    name: 'Architecture & Design',
    icon: 'architecture',
    color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
    items: ['Agile / Scrum', 'Code Review', 'Production Support', 'Scalability', 'UI/UX']
  }
];




