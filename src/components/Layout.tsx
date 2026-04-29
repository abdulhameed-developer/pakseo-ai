
import React, { ReactNode, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Globe, Sun, Moon, Linkedin, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useKeyword } from '../context/KeywordContext';
import { ChatAssistant } from './ChatAssistant';

export function Layout({ children }: { children: ReactNode }) {
  const { darkMode, setDarkMode } = useKeyword();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 font-sans ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#FAFBFC] text-slate-900'}`}>
      <header className={`sticky top-0 z-50 transition-all border-b px-6 py-3 ${darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'} backdrop-blur-xl`}>
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:rotate-12 transition-transform">
              <Zap className="text-white w-5 h-5 fill-current" />
            </div>
            <h1 className="font-black text-xl tracking-tighter uppercase">PAKSEO <span className="text-emerald-500">AI</span></h1>
          </Link>
          
          <div className="flex items-center gap-4 text-xs">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl transition-all active:scale-95 ${darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 py-10 md:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <ChatAssistant />

      <footer className={`border-t py-20 text-center ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}>
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-base font-black uppercase tracking-[0.4em] mb-8 text-emerald-500">PakSEO AI Labs</p>
          <div className="flex flex-wrap justify-center gap-10 text-sm font-black uppercase tracking-widest">
            <a href="https://www.linkedin.com/in/abdul-hameed-website-developer" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-all hover:scale-105 flex items-center gap-3">
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
            <a href="https://github.com/abdulhameed-developer" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-all hover:scale-105 flex items-center gap-3">
              <Github className="w-5 h-5" /> GitHub
            </a>
          </div>
          <div className="mt-12 pt-12 border-t border-slate-500/10">
            <p className="text-sm font-bold opacity-60 tracking-[0.15em] uppercase mb-2">Developed by Abdul Hameed</p>
            <p className="text-[10px] font-medium opacity-30 tracking-widest uppercase">© {new Date().getFullYear()} Engineered for high-performance Pakistani SEO Teams</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
