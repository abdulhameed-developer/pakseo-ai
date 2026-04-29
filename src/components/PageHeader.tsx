
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useKeyword } from '../context/KeywordContext';

interface PageHeaderProps {
  title: string;
  description: string;
  icon: any;
}

export function PageHeader({ title, description, icon: Icon }: PageHeaderProps) {
  const { darkMode } = useKeyword();
  return (
    <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-4">
        <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:opacity-70 transition-opacity">
          <ChevronLeft className="w-3 h-3" /> Back to Home
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Icon className="text-white w-6 h-6 md:w-7 md:h-7" />
          </div>
          <h2 className="text-2xl md:text-5xl font-black tracking-tighter leading-none uppercase">{title}</h2>
        </div>
        <p className={`text-xs md:text-sm opacity-60 max-w-xl ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          {description}
        </p>
      </div>
    </div>
  );
}
