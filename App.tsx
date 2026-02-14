
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ChatWidget from './components/ChatWidget';
import TechCube from './components/TechCube';
import { PROJECTS, SKILL_CATEGORIES } from './constants';

const App: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<string>('New Zealand');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDark = () => setIsDark(!isDark);

  const filteredProjects = PROJECTS.filter(p => p.region === activeRegion);

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark transition-colors duration-300">
      <Header isDark={isDark} toggleDark={toggleDark} />

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="home" className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-10 reveal">
                <div>
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary mb-6 border border-primary/20">
                    <span className="w-2 h-2 rounded-full bg-primary mr-2.5 animate-pulse"></span>
                    Available for new opportunities
                  </span>
                  <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.1]">
                    <span className="font-black animate-gradient-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent bg-[length:200%_auto]">Senior Software</span> <br />
                    <span className="text-primary italic">Engineer</span>
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl my-10">
                    Hi, I'm Xu Ran, a <span className="font-bold text-gray-900 dark:text-white">Senior Full-Stack Engineer</span>, with <span className="font-bold text-gray-900 dark:text-white underline decoration-primary/30 decoration-4 underline-offset-4">20+ years</span>  of experience delivering projects across New Zealand, the US, and China, passionate about turning ideas into robust web solutions.
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-4 my-10">
                  <div className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-100 dark:border-white/5">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    Auckland, New Zealand
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-100 dark:border-white/5 ml-5">
                    <span className="material-symbols-outlined text-primary">language</span>
                    English / Mandarin
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-100 dark:border-white/5">
                    <span className="material-symbols-outlined text-primary">verified</span>
                    VMware vSphere Certification
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#projects" className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-base font-bold rounded-2xl text-white bg-primary hover:bg-primary-dark transition-all shadow-glow hover:shadow-primary/40 hover:-translate-y-1">
                    View Projects
                  </a>
                  <a href="https://github.com/XuRan2024" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-10 py-4 border border-gray-200 dark:border-gray-700 text-base font-bold rounded-2xl text-gray-700 dark:text-gray-200 bg-white dark:bg-card-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>

              <div className="w-full max-w-lg mx-auto lg:max-w-none reveal" style={{ transitionDelay: '0.2s' }}>
                <ChatWidget />
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen flex items-center py-24 bg-white dark:bg-card-dark border-y border-gray-100 dark:border-gray-800 overflow-hidden transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 reveal">
              <h2 className="text-4xl font-black text-gray-900 dark:text-white">Technical Core</h2>
              <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">Refined skills across the full application lifecycle.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                {SKILL_CATEGORIES.map((cat, idx) => (
                  <div key={idx} className="group reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
                    <div className="flex items-center gap-4 mb-2">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-lg ${cat.color}`}>
                        <span className="material-symbols-outlined text-xl">{cat.icon}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{cat.name}</h3>
                    </div>
                    <div className="ml-14">
                      <p className="text-gray-500 dark:text-gray-400 mono-text text-sm flex gap-x-4 whitespace-nowrap">
                        {cat.items.map((item, i) => (
                          <span key={i} className="flex items-center group/item hover:text-primary transition-colors cursor-default">
                            {item}
                            {i < cat.items.length - 1 && <span className="ml-4 text-gray-200 dark:text-gray-800 font-light group-hover/item:text-gray-200">/</span>}
                          </span>
                        ))}
                      </p>
                      <div className="h-[2px] bg-gray-50 dark:bg-gray-800/50 w-full mt-3 group-hover:bg-primary/20 transition-colors"></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative -mt-20">
                <TechCube />
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 bg-background-light dark:bg-background-dark transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 reveal">
              <h2 className="text-4xl font-black text-gray-900 dark:text-white">Global Portfolio</h2>
              <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">Key achievements across New Zealand, China, and the USA.</p>
            </div>

            <div className="flex justify-center mb-16 reveal">
              <div className="bg-white dark:bg-card-dark p-1.5 rounded-[20px] shadow-sm border border-gray-200 dark:border-gray-800 inline-flex transition-colors">
                {['New Zealand', 'USA', 'China'].map(region => (
                  <button
                    key={region}
                    onClick={() => setActiveRegion(region)}
                    className={`px-10 py-3 rounded-2xl text-sm font-bold transition-all ${activeRegion === region
                      ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                      : 'text-gray-500 dark:text-gray-400 hover:text-primary'
                      }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
              {filteredProjects.length > 0 ? filteredProjects.map((project, idx) => (
                <div
                  key={project.id}
                  className="group bg-white dark:bg-card-dark rounded-[32px] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-soft hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 reveal"
                  style={{ transitionDelay: `${idx * 0.15}s` }}
                >
                  <div className="h-64 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end p-8">
                      <span className="text-white font-bold text-sm bg-primary/90 px-4 py-2 rounded-full backdrop-blur-sm">View Details</span>
                    </div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                    />
                  </div>
                  <div className="p-10">
                    <div className="mb-8">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-xl text-xs font-bold bg-primary/10 text-primary mb-4 border border-primary/20">
                        {project.role}
                      </span>
                      <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 mb-10 border border-gray-100 dark:border-white/5">
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
                        <span key={tag} className="px-4 py-1.5 bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 text-[11px] font-bold rounded-xl mono-text border border-gray-100 dark:border-white/5 transition-all group-hover:border-primary/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-full py-32 text-center text-gray-400 italic">
                  Archived projects in this region are currently being updated.
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="bg-gray-50 dark:bg-[#080e0b] py-24 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-4 mb-10 reveal">
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-3xl shadow-glow">XR</div>
              <span className="font-bold text-4xl tracking-tight text-gray-900 dark:text-white">Xu Ran</span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-2xl md:text-3xl font-light leading-relaxed max-w-3xl mb-16 reveal" style={{ transitionDelay: '0.1s' }}>
              I thrive on building <span className="font-bold text-primary">meaningful products</span> with teams that care about <span className="font-bold text-primary">craftsmanship</span>.
            </p>

            <div className="flex flex-wrap justify-center gap-12 text-lg font-bold reveal" style={{ transitionDelay: '0.2s' }}>
              <a href="mailto:hello@xuran.dev" className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-primary transition-all group">
                <span className="material-symbols-outlined text-2xl group-hover:rotate-12 group-hover:scale-125 transition-transform">mail</span>
                Email
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-all group">
                <span className="material-symbols-outlined text-2xl group-hover:rotate-12 group-hover:scale-125 transition-transform">share</span>
                LinkedIn
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all group">
                <span className="material-symbols-outlined text-2xl group-hover:rotate-12 group-hover:scale-125 transition-transform">terminal</span>
                GitHub
              </a>
            </div>

            <div className="w-full mt-24 pt-10 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 font-medium reveal" style={{ transitionDelay: '0.3s' }}>
              <p>© {new Date().getFullYear()} Xu Ran. Auckland, New Zealand.</p>
              <div className="flex gap-10 mt-6 md:mt-0">
                <a href="#" className="hover:text-primary transition-colors">Case Studies</a>
                <a href="#" className="hover:text-primary transition-colors">Resume (PDF)</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
