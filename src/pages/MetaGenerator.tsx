
import React, { useState } from 'react';
import { Search, LayoutGrid, Type, MousePointer2, Globe } from 'lucide-react';
import { useKeyword } from '../context/KeywordContext';
import { PageHeader } from '../components/PageHeader';
import { SubCard } from '../components/SubCard';
import { generateMeta } from '../services/geminiService';
import { SEOMeta } from '../types';

export function MetaGenerator() {
  const { darkMode, copyToClipboard, copiedId } = useKeyword();
  const [keyword, setKeyword] = useState('');
  const [meta, setMeta] = useState<SEOMeta | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    try {
      const res = await generateMeta(keyword);
      setMeta(res);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader 
        title="Meta Studio" 
        description="Localized snippets optimized for high click-through rates in regional search results."
        icon={LayoutGrid}
      />

      <div className={`p-2 sm:p-3 mb-10 rounded-2xl sm:rounded-full border flex flex-col sm:flex-row items-center gap-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/20'}`}>
        <div className="flex flex-1 items-center w-full px-4 sm:px-2">
          <Search className={`w-4 h-4 mr-3 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
          <input 
            type="text" 
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)} 
            placeholder="Enter keyword or topic..."
            className="bg-transparent border-none outline-none flex-1 text-sm font-bold py-3 sm:py-0"
            onKeyDown={(e) => e.key === 'Enter' && fetchData()}
          />
        </div>
        <button 
          onClick={fetchData} 
          disabled={loading || !keyword.trim()}
          className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-3.5 sm:py-2.5 rounded-xl sm:rounded-full text-[10px] font-black tracking-widest uppercase hover:bg-emerald-500 disabled:opacity-30 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
        >
          {loading ? 'Creating...' : 'Analyze Snippet'}
        </button>
      </div>

      {meta && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SubCard 
              title="Meta Title" 
              icon={<Type className="w-3.5 h-3.5" />}
              onCopy={() => copyToClipboard(meta.metaTitle, 'm-title')}
              isCopied={copiedId === 'm-title'}
              charCount={meta.metaTitle.length}
              limit={60}
            >
              <p className="text-base font-black">{meta.metaTitle}</p>
            </SubCard>
            
            <SubCard 
              title="Meta Description" 
              icon={<MousePointer2 className="w-3.5 h-3.5" />}
              onCopy={() => copyToClipboard(meta.metaDescription, 'm-desc')}
              isCopied={copiedId === 'm-desc'}
              charCount={meta.metaDescription.length}
              limit={160}
            >
              <p className="text-sm leading-relaxed opacity-80">{meta.metaDescription}</p>
            </SubCard>
          </div>

          <div className={`p-6 md:p-10 rounded-[2.5rem] border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xl'}`}>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-8 flex items-center gap-2">
              <Globe className="w-3 h-3" /> SERP Preview Simulation
            </h4>
            <div className="space-y-1.5 max-w-xl">
              <p className="text-xs text-[#202124] dark:text-slate-400 opacity-60">https://yourdomain.pk › blog › ...</p>
              <p className="text-xl md:text-2xl text-[#1a0dab] dark:text-blue-400 hover:underline cursor-pointer font-medium leading-tight">{meta.metaTitle}</p>
              <p className="text-sm md:text-base text-[#4d5156] dark:text-slate-400 leading-snug">{meta.metaDescription}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
