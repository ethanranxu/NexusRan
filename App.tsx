
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
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark transition-colors duration-300 selection:bg-primary/30">
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
                    <span className="w-2 h-2 rounded-full bg-primary mr-2.5 motion-safe:animate-pulse"></span>
                    Available for new opportunities
                  </span>
                  <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.1]">
                    <span className="font-black animate-gradient-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent bg-[length:200%_auto]">Senior Software</span> <br />
                    <span className="text-primary italic">Engineer</span>
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl my-10 text-pretty">
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
                  <a href="#projects" className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-base font-bold rounded-2xl text-white bg-primary hover:bg-primary-dark transition-all shadow-glow hover:shadow-primary/40 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-gray-900">
                    View Projects
                  </a>
                  <a href="https://github.com/XuRan2024" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-10 py-4 border border-gray-200 dark:border-gray-700 text-base font-bold rounded-2xl text-gray-700 dark:text-gray-200 bg-white dark:bg-card-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-gray-900">
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
              <h2 className="text-4xl font-black text-gray-900 dark:text-white">Technical <span className="relative inline-block"><span className="absolute inset-0 animate-gradient-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent bg-[length:200%_auto]">Core</span><span className="relative z-10 animate-text-shimmer bg-[linear-gradient(110deg,transparent_45%,rgba(255,255,255,0.8)_50%,transparent_55%)] bg-[length:200%_100%] bg-clip-text text-transparent bg-no-repeat">Core</span></span></h2>
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
                      <p className="text-gray-500 dark:text-gray-400 mono-text text-sm flex gap-x-4 whitespace-nowrap min-w-0">
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
              <h2 className="text-4xl font-black text-gray-900 dark:text-white">Global <span className="relative inline-block"><span className="absolute inset-0 animate-gradient-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent bg-[length:200%_auto]">Portfolio</span><span className="relative z-10 animate-text-shimmer bg-[linear-gradient(110deg,transparent_45%,rgba(255,255,255,0.8)_50%,transparent_55%)] bg-[length:200%_100%] bg-clip-text text-transparent bg-no-repeat">Portfolio</span></span></h2>
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
                      } focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-gray-900`}
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
                      width={600}
                      height={400}
                      loading="lazy"
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

            <p className="text-gray-600 dark:text-gray-300 text-2xl md:text-3xl font-light leading-relaxed max-w-4xl mb-16 reveal" style={{ transitionDelay: '0.1s' }}>
              <span className="font-bold text-primary">Senior Software Engineer</span> bridging the gap between <span className="font-bold text-primary">complex requirements</span> and elegant solutions across the globe.
            </p>

            <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-lg font-bold reveal" style={{ transitionDelay: '0.2s' }}>
              <a href="mailto:hello@xuran.dev" className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-primary transition-all group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none rounded-lg p-1 dark:focus-visible:ring-offset-gray-900">
                <svg className="w-6 h-6 fill-current group-hover:rotate-12 group-hover:scale-125 transition-transform" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                Email
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-[#0077B5] transition-all group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none rounded-lg p-1 dark:focus-visible:ring-offset-gray-900">
                <svg className="w-6 h-6 fill-current group-hover:rotate-12 group-hover:scale-125 transition-transform" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
                </svg>
                LinkedIn
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none rounded-lg p-1 dark:focus-visible:ring-offset-gray-900">
                <svg className="w-6 h-6 fill-current group-hover:rotate-12 group-hover:scale-125 transition-transform" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
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
