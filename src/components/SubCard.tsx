
import React, { ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';
import { useKeyword } from '../context/KeywordContext';

interface SubCardProps {
  title: string;
  children: ReactNode;
  icon: ReactNode;
  onCopy?: () => void;
  isCopied?: boolean;
  charCount?: number;
  limit?: number;
  className?: string;
  key?: React.Key;
}

export function SubCard({ title, children, icon, onCopy, isCopied, charCount, limit, className = "" }: SubCardProps) {
  const { darkMode } = useKeyword();
  return (
    <div className={`h-full border rounded-2xl flex flex-col transition-all duration-300 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 ${
      darkMode ? 'bg-slate-900 border-slate-800/80 shadow-inner shadow-black/20' : 'bg-white border-slate-200/60 shadow-sm'
    } ${className}`}>
      <div className={`px-4 py-2.5 border-b flex items-center justify-between ${darkMode ? 'border-slate-800/50' : 'border-slate-100'}`}>
        <div className="flex items-center gap-2">
          <div className="text-emerald-500 opacity-80">{icon}</div>
          <span className="text-[10px] font-black uppercase tracking-[0.15em] opacity-50">{title}</span>
        </div>
        {onCopy && (
          <button onClick={onCopy} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors group">
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500" />}
          </button>
        )}
      </div>
      <div className="p-5 flex-1">
        {children}
      </div>
      {charCount !== undefined && limit !== undefined && (
        <div className={`px-4 py-2 border-t flex justify-end ${darkMode ? 'border-slate-800/50' : 'border-slate-100'}`}>
          <span className={`text-[9px] font-black uppercase tracking-widest ${charCount > limit ? 'text-red-500' : 'text-emerald-500/40'}`}>
            {charCount} / {limit}
          </span>
        </div>
      )}
    </div>
  );
}
