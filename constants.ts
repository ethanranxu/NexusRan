
import { Project, SkillCategory } from './types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Programming',
    icon: 'code_blocks',
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    items: ['C#', 'C++', 'Python', 'JavaScript', 'TypeScript', 'SQL']
  },
  {
    name: 'Frontend',
    icon: 'web',
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    items: ['React', 'Vue.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap']
  },
  {
    name: 'Backend',
    icon: 'dns',
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    items: ['Node.js', 'ASP.NET Core', 'Django', 'REST API', 'Microservices']
  },
  {
    name: 'Database',
    icon: 'database',
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    items: ['SQL Server', 'MySQL', 'PostgreSQL', 'Supabase', 'MongoDB', 'Firestore']
  },
  {
    name: 'DevOps & Cloud',
    icon: 'cloud_sync',
    color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400',
    items: ['Docker', 'AWS', 'Azure', 'CI/CD', 'Git', 'Nginx']
  },
  {
    name: 'Architecture & Design',
    icon: 'architecture',
    color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
    items: ['System Architecture', 'Requirement Analysis', 'Scalability', 'UI/UX', 'Agile']
  }
];

// Dynamically load all project images from public/images
const projectImages = import.meta.glob('/public/images/**/*.jpg', { eager: true, as: 'url' });

// Helper to get images for a specific project ID
const getProjectImages = (projectId: string) => {
  const images = Object.keys(projectImages)
    .filter(path => path.includes(`/public/images/${projectId}/`))
    .sort((a, b) => {
      // Sort by file name number (e.g. 1.jpg, 2.jpg)
      const aNum = parseInt(a.split('/').pop()?.split('.')[0] || '0');
      const bNum = parseInt(b.split('/').pop()?.split('.')[0] || '0');
      return aNum - bNum;
    })
    .map(path => path.replace('/public', '')); // Convert /public/images/... to /images/...

  return images.length > 0 ? images : undefined;
};

export const PROJECTS: Project[] = [
  {
    id: 'p-nz-01',
    title: 'EFC of East Coast Bays Official Website',
    role: 'Full-Stack Developer',
    description: 'Solely designed, developed, and deployed the official website for EFC of East Coast Bays, covering UI/UX design, requirements analysis, front-end and back-end development, testing, and launch.',
    keyResult: '150% increase in traffic',
    resultIcon: 'trending_up',
    tags: ['Next.js', 'React', 'Firestore', 'Tailwind CSS', 'Vercel'],
    image: '/images/p-nz-01/1.jpg',
    galleryImages: getProjectImages('p-nz-01'),
    link: 'https://www.efcecb.com/',
    region: 'New Zealand',
    order: 100
  },
  {
    id: 'p-nz-02',
    title: 'Nurses Thriving at Work Research Collaborative Website',
    role: 'Full-Stack Maintenance Engineer',
    description: 'Maintained and optimized a University of Auckland research project website by improving code efficiency, fixing two critical bugs, redeploying it, and uploading updated materials, ensuring smooth front-end and back-end performance.',
    keyResult: 'Optimized performance',
    resultIcon: 'speed',
    tags: ['React', 'Vite', 'MUI', 'Sanity CMS', 'Tailwind CSS', 'AWS'],
    image: '/images/p-nz-02/1.jpg',
    galleryImages: getProjectImages('p-nz-02'),
    link: 'https://www.nurses-thriving.com/',
    region: 'New Zealand',
    order: 90
  },
  {
    id: 'p3',
    title: 'FinTech Trading Engine',
    role: 'Lead Architect',
    description: 'Optimized high-frequency trading platforms for a major fintech unicorn in Shanghai. Handled over 50k transactions per second.',
    keyResult: '50k+ TPS Handled',
    resultIcon: 'bolt',
    tags: ['C++', 'Python', 'Redis'],
    image: 'https://picsum.photos/seed/trading/800/400',
    link: '#',
    region: 'China',
    order: 80
  },
  {
    id: 'p-usa-01',
    title: 'Global E-commerce Scale',
    role: 'Senior Engineer',
    description: 'Rearchitected the checkout flow for a major US retailer, improving conversion rates by streamlining microservice calls.',
    keyResult: '15% Conversion Increase',
    resultIcon: 'analytics',
    tags: ['Go', 'Azure', 'React'],
    image: '/images/p-usa-01/1.jpg',
    galleryImages: getProjectImages('p-usa-01'),
    link: '#',
    region: 'USA',
    order: 70
  }
];
