import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Project } from '../types';

const RegionProjects: React.FC = () => {
    const { region } = useParams<{ region: string }>();
    const navigate = useNavigate();
    const { projects, loading, error } = useProjects();
    const [isDark, setIsDark] = React.useState(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    useScrollReveal([projects, region]);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleDark = () => setIsDark(!isDark);

    if (!region) {
        navigate('/');
        return null;
    }

    const decodedRegion = decodeURIComponent(region);
    const regionProjects = projects.filter(p => p.region === decodedRegion).sort((a, b) => (a.order || 999) - (b.order || 999));

    // Specific logic for China projects to group by Classification
    const isChina = decodedRegion === 'China';
    const groupedProjects: Record<string, Project[]> = {};

    if (isChina) {
        regionProjects.forEach(p => {
            const cat = p.Classification || 'Other';
            if (!groupedProjects[cat]) groupedProjects[cat] = [];
            groupedProjects[cat].push(p);
        });
    }

    const categories = [
        { name: "Healthcare Digital Transformation", icon: "cardiology", note: "8 Projects" },
        { name: "Smart City & Infrastructure Monitoring", icon: "domain", note: "5 Projects" },
        { name: "Industrial Automation & Energy Systems", icon: "precision_manufacturing", note: "7 Projects" },
        { name: "Medical Imaging & Simulation", icon: "view_in_ar", note: "4 Projects" },
        { name: "Organizational Data Governance & Information Systems", icon: "hub", note: "6 Projects" },
    ];

    const scrollToCategory = (catName: string) => {
        const id = catName.replace(/\s+/g, '-').toLowerCase();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark transition-colors duration-300 font-display">
            <Header isDark={isDark} toggleDark={toggleDark} />

            <main className="flex-grow px-4 md:px-10 lg:px-40 py-5">
                <div className="max-w-[1200px] mx-auto">
                    {/* Breadcrumb / Back Navigation */}
                    <div className="mb-8">
                        <Link to="/" state={{ region: decodedRegion }} className="flex items-center gap-2 text-[#618972] dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium">
                            <span className="material-symbols-outlined text-lg">arrow_back</span>
                            <span>Back to Main Portfolio</span>
                        </Link>
                    </div>

                    {/* Page Header */}
                    <div className="flex flex-col gap-4 mb-12">
                        <h1 className="text-[#111814] dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">{decodedRegion} Projects</h1>
                        <p className="text-[#618972] dark:text-gray-300 text-lg md:text-xl font-normal max-w-2xl leading-relaxed">
                            {isChina
                                ? "Architecting digital solutions for complex ecosystems across 30+ initiatives in healthcare, smart infrastructure, and industrial automation."
                                : `Exploring key projects and contributions in ${decodedRegion}.`
                            }
                        </p>
                    </div>

                    {isChina ? (
                        <>
                            {/* Category Grid for China */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                                {categories.map((cat, idx) => (
                                    <div key={idx} className="group relative bg-white dark:bg-[#1a2e22] rounded-xl p-8 flex flex-col gap-6 card-hover-effect border border-gray-100 dark:border-gray-800 shadow-sm transition-transform hover:-translate-y-1">
                                        <div className="flex justify-between items-start">
                                            <div className="bg-primary/10 p-4 rounded-lg text-primary">
                                                <span className="material-symbols-outlined text-4xl">{cat.icon}</span>
                                            </div>
                                            <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold px-3 py-1 rounded-full">{cat.note}</span>
                                        </div>
                                        <div className="flex flex-col gap-2 flex-grow">
                                            <h3 className="text-[#111814] dark:text-white text-xl font-bold leading-tight group-hover:text-primary transition-colors">{cat.name}</h3>
                                            <p className="text-[#618972] dark:text-gray-400 text-sm leading-relaxed">
                                                Explore projects in {cat.name}.
                                            </p>
                                        </div>
                                        <div className="flex items-center text-primary font-bold text-sm mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                                            <button
                                                onClick={() => scrollToCategory(cat.name)}
                                                className="flex items-center hover:underline bg-transparent border-none p-0 cursor-pointer text-inherit"
                                            >
                                                <span className="mr-2">Explore Category</span>
                                                <span className="material-symbols-outlined text-sm arrow-icon">arrow_forward</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Projects Grouped by Category */}
                            {categories.map((cat) => {
                                const catProjects = groupedProjects[cat.name] || [];
                                if (catProjects.length === 0) return null;
                                return (
                                    <section key={cat.name} id={cat.name.replace(/\s+/g, '-').toLowerCase()} className="mb-16 scroll-mt-24">
                                        <h2 className="text-2xl font-bold text-[#111814] dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">{cat.name}</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {catProjects.map(project => (
                                                <div key={project.id} className="bg-white dark:bg-card-dark rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
                                                    <div className="h-48 overflow-hidden">
                                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" loading="lazy" decoding="async" />
                                                    </div>
                                                    <div className="p-6">
                                                        <div className="flex justify-between items-start mb-4">
                                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                                                            <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded border border-primary/20 whitespace-nowrap ml-2">{project.role}</span>
                                                        </div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{project.description}</p>
                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                            {project.tags.slice(0, 3).map(tag => (
                                                                <span key={tag} className="px-2 py-1 bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 text-xs font-bold rounded mono-text border border-gray-100 dark:border-white/5">{tag}</span>
                                                            ))}
                                                        </div>
                                                        <div className="flex items-center text-sm font-bold text-gray-900 dark:text-gray-100 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                                                            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3">
                                                                <span className="material-symbols-outlined text-base">{project.resultIcon}</span>
                                                            </div>
                                                            {project.keyResult}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                );
                            })}
                        </>
                    ) : (
                        // Standard List for other regions
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {regionProjects.map((project) => (
                                <div key={project.id} className="bg-white dark:bg-card-dark rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
                                    <div className="h-64 overflow-hidden">
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" loading="lazy" decoding="async" />
                                    </div>
                                    <div className="p-8">
                                        <span className="inline-flex items-center px-4 py-1.5 rounded-xl text-xs font-bold bg-primary/10 text-primary mb-4 border border-primary/20">
                                            {project.role}
                                        </span>
                                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">{project.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6">
                                            {project.description}
                                        </p>
                                        <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 mb-6 border border-gray-100 dark:border-white/5">
                                            <h4 className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-black mb-3">Key Outcome</h4>
                                            <div className="flex items-center text-lg font-bold text-gray-900 dark:text-gray-100">
                                                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-4">
                                                    <span className="material-symbols-outlined text-xl">{project.resultIcon}</span>
                                                </div>
                                                {project.keyResult}
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2.5">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="px-4 py-1.5 bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 text-[11px] font-bold rounded-xl mono-text border border-gray-100 dark:border-white/5">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default RegionProjects;
