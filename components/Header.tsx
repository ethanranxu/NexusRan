
import React from 'react';

interface HeaderProps {
  isDark: boolean;
  toggleDark: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, toggleDark }) => {
  return (
    <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-black text-xl shadow-glow group-hover:scale-110 transition-transform">XR</div>
            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">Xu Ran</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors" href="#home">Home</a>
            <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors" href="#skills">Skills</a>
            <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors" href="#projects">Projects</a>
            <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors" href="#footer">Contact</a>
            
            <button 
              onClick={toggleDark}
              className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-all shadow-sm"
              aria-label="Toggle dark mode"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
          </nav>

          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleDark}
              className="p-2 text-gray-600 dark:text-gray-300"
            >
              <span className="material-symbols-outlined">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <button className="text-gray-600 dark:text-gray-300 hover:text-primary">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
