
import { Project, SkillCategory } from './types';

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
    role: 'Senior Full-Stack Developer',
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
  },
  // China Projects
  {
    id: 'p-cn-30',
    Classification: "Healthcare Digital Transformation",
    title: "National Patient Experience Data Management Platform",
    role: "Architecture & Development",
    description: "Designed a layered architecture to efficiently store, process, and visualize patient experience data for over 1,800 hospitals.",
    resultIcon: "trending_up",
    keyResult: "Daily data processing capacity reaches millions of records",
    tags: ["Vue.js", "ASP.NET Core", "SQL Server", "REST API", "Docker"],
    image: "/images/p-cn-30/1.jpg",
    link: "#",
    region: "China",
    order: 30
  },
  {
    id: 'p-cn-28',
    Classification: "Healthcare Digital Transformation",
    title: "Patient Experience Data Analysis & Decision Support Platform",
    role: "Architecture & Development",
    description: "Built intelligent analytics and visualization modules to support hospital managers in making data-driven decisions.",
    resultIcon: "trending_up",
    keyResult: "Analysis accuracy improved by 30%",
    tags: ["Vue.js", "Django", "Python", "SQL Server", "Pandas", "Docker"],
    image: "/images/p-cn-28/1.jpg",
    link: "#",
    region: "China",
    order: 28
  },
  {
    id: 'p-cn-27',
    Classification: "Healthcare Digital Transformation",
    title: "Inpatient Satisfaction Survey System",
    role: "Full-Stack Developer",
    description: "Implemented questionnaire management, data collection, statistical analysis, and report generation to improve survey processing efficiency.",
    resultIcon: "speed",
    keyResult: "Data collection efficiency increased by 70%",
    tags: ["React", "Tailwind CSS", "Node.js", "MySQL", "Docker"],
    image: "/images/p-cn-27/1.jpg",
    link: "#",
    region: "China",
    order: 27
  },
  {
    id: 'p-cn-26',
    Classification: "Healthcare Digital Transformation",
    title: "Xinqiao Hospital Outpatient Data Management System",
    role: "Full-Stack Developer",
    description: "Supported outpatient patient information management and report generation, achieving automated data processing and fast query.",
    resultIcon: "trending_up",
    keyResult: "Data processing speed increased by 40%",
    tags: ["Vue.js", "Vite", "TypeScript", "ASP.NET", "PostgreSQL", "Docker"],
    image: "/images/p-cn-26/1.jpg",
    link: "#",
    region: "China",
    order: 26
  },
  {
    id: 'p-cn-25',
    Classification: "Healthcare Digital Transformation",
    title: "Allergy Reaction Center Information Database",
    role: "Full-Stack Developer",
    description: "Designed and implemented a unified system for patient allergy history, treatment records, and clinical data, enabling fast query and statistical analysis.",
    resultIcon: "speed",
    keyResult: "Query response time reduced by 50%",
    tags: ["WinForms", "C#", "SQL Server", "LINQ", "Crystal Reports"],
    image: "/images/p-cn-25/1.jpg",
    link: "#",
    region: "China",
    order: 25
  },
  {
    id: 'p-cn-24',
    Classification: "Healthcare Digital Transformation",
    title: "Vital Signs Monitoring & Localization System",
    role: "Full-Stack Developer",
    description: "Implemented real-time monitoring and localization of key patient indicators such as heart rate and blood pressure to support clinical management.",
    resultIcon: "trending_up",
    keyResult: "Data collection completeness reached 99%",
    tags: ["WinForms", "C#", "C++", "PostgreSQL", "MQTT", "TCP Socket"],
    image: "/images/p-cn-24/1.jpg",
    link: "#",
    region: "China",
    order: 24
  },
  {
    id: 'p-cn-23',
    Classification: "Smart City & Infrastructure Monitoring",
    title: "Elevator Safety Operation Dynamic Monitoring System",
    role: "Full-Stack Developer",
    description: "Monitored elevator status, faults, and safety alerts in real-time, supporting multi-terminal remote supervision and notifications.",
    resultIcon: "trending_up",
    keyResult: "Second-level data collection and real-time anomaly alerts",
    tags: ["Vue.js", "ASP.NET Core", "SQL Server", "TCP Socket", "WebSocket", "Docker"],
    image: "/images/p-cn-23/1.jpg",
    link: "#",
    region: "China",
    order: 23
  },
  {
    id: 'p-cn-22',
    Classification: "Smart City & Infrastructure Monitoring",
    title: "Urban Parking Guidance System",
    role: "Full-Stack Developer",
    description: "Integrated urban parking resources to collect parking space status, publish dynamic guidance, and analyze data to improve traffic efficiency.",
    resultIcon: "trending_up",
    keyResult: "Parking space utilization improved by 35%",
    tags: ["Vue.js", "Bootstrap", "ASP.NET", "PostgreSQL", "UDP Socket", "REST API"],
    image: "/images/p-cn-22/1.jpg",
    link: "#",
    region: "China",
    order: 22
  },
  {
    id: 'p-cn-21',
    Classification: "Smart City & Infrastructure Monitoring",
    title: "Video-Based Vehicle Reverse Search System",
    role: "Full-Stack Developer",
    description: "Developed a vehicle reverse search system based on video recognition technology to quickly locate parked vehicles.",
    resultIcon: "speed",
    keyResult: "Search time reduced to under 10 seconds, 80% faster than manual search",
    tags: ["ASP.NET", "C++", "PostgreSQL", "OpenCV", "Tesseract", "TCP Socket"],
    image: "/images/p-cn-21/1.jpg",
    link: "#",
    region: "China",
    order: 21
  },
  {
    id: 'p-cn-20',
    Classification: "Smart City & Infrastructure Monitoring",
    title: "Changan Ford Welding & Unloading Platform Parking Guidance System",
    role: "Full-Stack Developer",
    description: "Supported internal logistics vehicle dispatch and parking guidance, including vehicle access management, loading/unloading scheduling, and real-time data statistics.",
    resultIcon: "trending_up",
    keyResult: "Logistics scheduling efficiency increased by 40%",
    tags: ["WinForms", "C#", "SQL Server", "Industrial IoT", "TCP Socket"],
    image: "/images/p-cn-20/1.jpg",
    link: "#",
    region: "China",
    order: 20
  },
  {
    id: 'p-cn-19',
    Classification: "Smart City & Infrastructure Monitoring",
    title: "Major Hazard Source Safety Monitoring System",
    role: "Full-Stack Developer",
    description: "Built a real-time hazard monitoring and alert platform, supporting multi-sensor data collection, anomaly alarms, and visualization management.",
    resultIcon: "security",
    keyResult: "Alert accuracy > 95%",
    tags: ["WinForms", "C#", "PostgreSQL", "MQTT", "TCP/UDP Sockets"],
    image: "/images/p-cn-19/1.jpg",
    link: "#",
    region: "China",
    order: 19
  },
  {
    id: 'p-cn-18',
    Classification: "Smart City & Infrastructure Monitoring",
    title: "Sewer & Septic Hazard Monitoring and Alarm Management System",
    role: "Full-Stack Developer",
    description: "Monitored gas concentration and environmental parameters in real-time, supporting automatic alarms and remote management.",
    resultIcon: "warning",
    keyResult: "Potential risks significantly reduced; incident response efficiency improved by 90%",
    tags: ["WinForms", "C#", "SQL Server", "MQTT", "TCP/UDP Sockets"],
    image: "/images/p-cn-18/1.jpg",
    link: "#",
    region: "China",
    order: 18
  },
  {
    id: 'p-cn-17',
    Classification: "Smart City & Infrastructure Monitoring",
    title: "River Illegal Sand Mining Supervision System",
    role: "Backend Developer",
    description: "Developed backend core modules for data collection, processing, law enforcement record management, and video stream interface, supporting multi-department joint supervision.",
    resultIcon: "trending_up",
    keyResult: "Response efficiency improved by 60%",
    tags: ["ASP.NET Core", "C++", "SQL Server", "UDP Socket", "REST API", "Docker"],
    image: "/images/p-cn-17/1.jpg",
    link: "#",
    region: "China",
    order: 17
  },
  {
    id: 'p-cn-16',
    Classification: "Smart City & Infrastructure Monitoring",
    title: "Power Transmission Line Remote Video Monitoring System",
    role: "Full-Stack Developer",
    description: "Monitored transmission line status, video streaming, and automatic anomaly recognition to enhance grid operation safety.",
    resultIcon: "trending_up",
    keyResult: "Fault alert lead time increased by 30%",
    tags: ["WinForms", "C#", "SQL Server", "RTSP"],
    image: "/images/p-cn-16/1.jpg",
    link: "#",
    region: "China",
    order: 16
  },
  {
    id: 'p-cn-15',
    Classification: "Smart City & Infrastructure Monitoring",
    title: "Smart Home Centralized Control System",
    role: "Frontend Developer",
    description: "Designed frontend UI and interactions to control lighting, security, air conditioning, and appliances with unified visualization.",
    resultIcon: "speed",
    keyResult: "Device response latency reduced to under 1 second",
    tags: ["React", "TypeScript", "WebSocket"],
    image: "/images/p-cn-15/1.jpg",
    link: "#",
    region: "China",
    order: 15
  },
  {
    id: 'p-cn-14',
    Classification: "Smart City & Infrastructure Monitoring",
    title: "Smart Public Restroom Management System",
    role: "Full-Stack Developer",
    description: "Built an environmental monitoring and operations management system for public restrooms, including traffic statistics, environment monitoring, device status, and remote maintenance.",
    resultIcon: "trending_up",
    keyResult: "Operation efficiency improved by 45%",
    tags: ["Vue.js", "ASP.NET Core", "MongoDB", "IoT", "Docker"],
    image: "/images/p-cn-14/1.jpg",
    link: "#",
    region: "China",
    order: 14
  },
  {
    id: 'p-cn-13',
    Classification: "Smart City & Infrastructure Monitoring",
    title: "Remote Flight Parameter Acquisition System",
    role: "Full-Stack Developer",
    description: "Implemented real-time flight parameter acquisition, data storage, and remote analysis to support flight safety management and historical data review.",
    resultIcon: "trending_up",
    keyResult: "Acquisition efficiency increased by 80%",
    tags: ["WinForms", "C#", "MySQL", "TCP Socket"],
    image: "/images/p-cn-13/1.jpg",
    link: "#",
    region: "China",
    order: 13
  },
  {
    id: 'p-cn-12',
    Classification: "Industrial Automation & Energy Systems",
    title: "CNG Station Central Management System",
    role: "Full-Stack Developer",
    description: "Managed CNG equipment operation, gas volume, sales, and safety data centrally with real-time monitoring, supporting multi-site supervision and statistics.",
    resultIcon: "trending_up",
    keyResult: "Operational efficiency improved by 35%",
    tags: ["React", "WinForms", "C#", "SQL Server", "WebSocket", "CAN Bus"],
    image: "/images/p-cn-12/1.jpg",
    link: "#",
    region: "China",
    order: 12
  },
  {
    id: 'p-cn-11',
    Classification: "Industrial Automation & Energy Systems",
    title: "LNG Station Automated Control System",
    role: "Backend Developer",
    description: "Developed software modules for automated control, including device status collection, execution of control logic, and anomaly alarms to ensure safe and stable operations.",
    resultIcon: "security",
    keyResult: "Automated control and real-time safety alerts",
    tags: ["WinForms", "C#", "SQL Server", "SCADA", "PLC Communication", "CAN Bus"],
    image: "/images/p-cn-11/1.jpg",
    link: "#",
    region: "China",
    order: 11
  },
  {
    id: 'p-cn-10',
    Classification: "Industrial Automation & Energy Systems",
    title: "Production Line Scheduling Dashboard",
    role: "Full-Stack Developer",
    description: "Developed a production data visualization and scheduling system to monitor production progress, equipment status, and capacity, helping management optimize decisions.",
    resultIcon: "trending_up",
    keyResult: "Scheduling efficiency improved by 40%",
    tags: ["React", "WinForms", "C#", "Supabase", "ECharts"],
    image: "/images/p-cn-10/1.jpg",
    link: "#",
    region: "China",
    order: 10
  },
  {
    id: 'p-cn-09',
    Classification: "Medical Imaging & Simulation",
    title: "Virtual Patient Simulation Platform",
    role: "Full-Stack Developer",
    description: "Developed a high-performance virtual patient simulation platform for clinical training, implementing real-time interaction and user data tracking for concurrent sessions.",
    resultIcon: "trending_up",
    keyResult: "Clinical training efficiency improved by 50%",
    tags: ["React", "Python", "SQL Server", "WebSockets", "Docker"],
    image: "/images/p-cn-09/1.jpg",
    link: "#",
    region: "China",
    order: 9
  },
  {
    id: 'p-cn-08',
    Classification: "Medical Imaging & Simulation",
    title: "Digital Human Anatomy Interactive Learning Platform",
    role: "Full-Stack Developer",
    description: "Developed an online interactive platform for medical imaging anatomy, enabling high-resolution image display, multi-level structure positioning, and dynamic interaction for students and clinicians.",
    resultIcon: "trending_up",
    keyResult: "Smooth online interaction of massive medical images achieved",
    tags: ["Vue.js", "WebGL", "Three.js", "ASP.NET", "SQL Server"],
    image: "/images/p-cn-08/1.jpg",
    link: "#",
    region: "China",
    order: 8
  },
  {
    id: 'p-cn-07',
    Classification: "Medical Imaging & Simulation",
    title: "China Digital Visible Human Image Registration Tool",
    role: "Backend & Algorithm Developer",
    description: "Developed automatic registration algorithms and backend processing for medical images, achieving multimodal image alignment and precise positioning to improve accuracy in analysis and teaching.",
    resultIcon: "trending_up",
    keyResult: "Image registration accuracy improved by 90%",
    tags: ["WinForms", "C#", "SQL Server", "OpenCV"],
    image: "/images/p-cn-07/1.jpg",
    link: "#",
    region: "China",
    order: 7
  },
  {
    id: 'p-cn-06',
    Classification: "Medical Imaging & Simulation",
    title: "Dermatology Clinical Simulation Diagnosis System",
    role: "Full-Stack Developer",
    description: "Developed a clinical simulation system to manage cases, simulate symptoms, and provide diagnostic workflow and treatment feedback, supporting clinical thinking training for students.",
    resultIcon: "trending_up",
    keyResult: "Student performance improved by 21%",
    tags: ["WinForms", "C#", "SQL Server"],
    image: "/images/p-cn-06/1.jpg",
    link: "#",
    region: "China",
    order: 6
  },
  {
    id: 'p-cn-05',
    Classification: "Medical Imaging & Simulation",
    title: "Virtual Liver Ultrasound Imaging System",
    role: "Full-Stack Developer",
    description: "Built a 3D virtual liver model, simulated ultrasound scanning, and automatically identified standard planes and liver segments, combining 2D and 3D display to improve teaching and diagnostic accuracy.",
    resultIcon: "trending_up",
    keyResult: "Student learning efficiency improved by 50%",
    tags: ["WinForms", "C#", "SQL Server", "OpenGL"],
    image: "/images/p-cn-05/1.jpg",
    link: "#",
    region: "China",
    order: 5
  },
  {
    id: 'p-cn-04',
    Classification: "Organizational Data Governance & Information Systems",
    title: "Financial Internal Control Management System",
    role: "Full-Stack Developer",
    description: "Designed and developed the full system for financial workflow management, budget control, approval configuration, and data analytics to improve transparency and compliance.",
    resultIcon: "trending_up",
    keyResult: "Approval efficiency improved by 60%",
    tags: ["ASP.NET Core", "SQL Server", "Docker"],
    image: "/images/p-cn-04/1.jpg",
    link: "#",
    region: "China",
    order: 4
  },
  {
    id: 'p-cn-03',
    Classification: "Organizational Data Governance & Information Systems",
    title: "Comprehensive Research & Academic Management System",
    role: "Full-Stack Developer",
    description: "Developed modules for research projects, outcomes submission, paper management, and funding, enabling unified data management and analytics for improved digital management.",
    resultIcon: "trending_up",
    keyResult: "Workflow efficiency improved by 30%",
    tags: ["Vue.js", "ASP.NET", "SQL Server", "REST API"],
    image: "/images/p-cn-03/1.jpg",
    link: "#",
    region: "China",
    order: 3
  },
  {
    id: 'p-cn-02',
    Classification: "Organizational Data Governance & Information Systems",
    title: "Teaching Archive Management System",
    role: "Full-Stack Developer",
    description: "Developed a digital platform for teaching materials and archives, including course info management, document storage and retrieval, and role-based access control.",
    resultIcon: "trending_up",
    keyResult: "Retrieval efficiency improved by 80%",
    tags: ["ASP.NET Core", "SQL Server", "Docker"],
    image: "/images/p-cn-02/1.jpg",
    link: "#",
    region: "China",
    order: 2
  },
  {
    id: 'p-cn-01',
    Classification: "Organizational Data Governance & Information Systems",
    title: "Teaching Quality Management & Evaluation System",
    role: "Architecture & Development",
    description: "Integrated data collection, cleaning, analysis, mining, and decision-making into a closed-loop system. Supported multi-source data capture and applied clustering and association algorithms to provide rich visual decision support.",
    resultIcon: "trending_up",
    keyResult: "Automated data capture coverage over 95%",
    tags: ["React", "ASP.NET", "Python", "SQL Server", "Pandas", "ECharts"],
    image: "/images/p-cn-01/1.jpg",
    link: "#",
    region: "China",
    order: 1
  },
  {
    id: 'p-cn-29',
    Classification: "Organizational Data Governance & Information Systems",
    title: "Telecommunication Knowledge Assessment System",
    role: "Backend Developer",
    description: "Developed an online exam and question bank system, including maintenance, automatic paper generation, online testing, score statistics and analysis, supporting large-scale user assessments.",
    resultIcon: "speed",
    keyResult: "Supports tens of thousands of concurrent online exam takers",
    tags: ["ASP.NET", "SQL Server", "Redis", "RabbitMQ", "Microservices"],
    image: "/images/p-cn-29/1.jpg",
    link: "#",
    region: "China",
    order: 29
  }
];
