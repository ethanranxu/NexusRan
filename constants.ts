
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
    items: ['React', 'Vue.js', 'HTML5', 'CSS3', 'TailwindCSS', 'Bootstrap']
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

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'KiwiBank Core Migration',
    role: 'Principal Architect',
    description: 'Led the migration of legacy monolith systems to a microservices architecture on AWS for a major New Zealand financial institution.',
    keyResult: 'Reduced latency by 40%',
    resultIcon: 'trending_down',
    tags: ['AWS', 'Java', 'Kafka'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDndmCDAOzHm3ERBp1efaLQs7l6o2qhBbL45aPocFvXJkX5sk6mjeYr9hBzF69jLvDSR_buaM92bOKlGXCZ8rQQbQZenQTlGX9g8uHYJxqskwaqpiBhDgExZOYknxZiOtTfhGwRA5N5v_9gW9v1VRLNWx7klZI2FqeQiwgn6wnm9w8KFiisqbiKiKy2-UZqhk23_kyWrt7UJQ-e_-KjEErc6Ybf3EGDHHoAXeBwkyLBt3gt8XuBLhps5gfMkrBUg4d6qQOTCdaVcC4',
    region: 'New Zealand'
  },
  {
    id: 'p2',
    title: 'AgriTech IoT Platform',
    role: 'Lead Developer',
    description: 'Developed a real-time monitoring dashboard for dairy farms across the Waikato region using IoT sensors and edge computing.',
    keyResult: '99.99% Uptime Achieved',
    resultIcon: 'check_circle',
    tags: ['React', 'Node.js', 'MQTT'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKwiAdRDbjVFZ7MlmdRdf34JcK_nxXMvKEf-zZB1P_GENmoxMzs-BXZL4NVBbZOSQPIUeJ0dux4CfpkOXmTugvnScOCkiP4gqsS2ToIG1Pv-nENiZD1cdl83PB7khRuMzqc-JRqBwP6y9OfVLroAzNf6ULYszOA1XR3bkvXaIDugQ-s2nF1lIjTLCQOav9uaSxd0w3PY_OkY0qVn8iLwyhZXAQM443krVaz6YzFg31yDzkWU9nFsPzyYjpdOarGtjXsHFr2e2hcB0',
    region: 'New Zealand'
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
    region: 'China'
  },
  {
    id: 'p4',
    title: 'Global E-commerce Scale',
    role: 'Senior Engineer',
    description: 'Rearchitected the checkout flow for a major US retailer, improving conversion rates by streamlining microservice calls.',
    keyResult: '15% Conversion Increase',
    resultIcon: 'analytics',
    tags: ['Go', 'Azure', 'React'],
    image: 'https://picsum.photos/seed/retail/800/400',
    region: 'USA'
  }
];
