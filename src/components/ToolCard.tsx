
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useKeyword } from '../context/KeywordContext';

interface ToolCardProps {
  title: string;
  desc: string;
  icon: ReactNode;
  path: string;
  color: string;
  isHot?: boolean;
}

export function ToolCard({ title, desc, icon, path, color, isHot }: ToolCardProps) {
  const { darkMode } = useKeyword();
  const navigate = useNavigate();

  const colorMap: Record<string, string> = {
    blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20 shadow-blue-500/10',
    emerald: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/10',
    amber: 'text-amber-500 bg-amber-500/10 border-amber-500/20 shadow-amber-500/10',
    purple: 'text-purple-500 bg-purple-500/10 border-purple-500/20 shadow-purple-500/10',
    indigo: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20 shadow-indigo-500/10',
  };

  return (
    <button 
      onClick={() => navigate(path)}
      className={`relative group p-8 rounded-[2.5rem] border-2 text-left transition-all hover:-translate-y-2 active:scale-95 flex flex-col h-full ${
        darkMode 
        ? 'bg-slate-900 border-slate-800 hover:border-emerald-500/40' 
        : 'bg-white border-slate-100 hover:border-emerald-200 shadow-lg shadow-slate-200/40'
      }`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xl ${colorMap[color]}`}>
        {icon}
      </div>
      {isHot && (
        <span className="absolute top-8 right-8 px-2 py-0.5 rounded-full bg-red-500 text-[8px] font-black text-white uppercase tracking-widest animate-pulse">
          Hot
        </span>
      )}
      <h3 className="font-black text-xl mb-3 tracking-tighter uppercase group-hover:text-emerald-500 transition-colors">{title}</h3>
      <p className={`text-xs leading-relaxed opacity-60 flex-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
        {desc}
      </p>
      <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
        Launch Tool <ArrowRight className="w-3 h-3" />
      </div>
    </button>
  );
}
