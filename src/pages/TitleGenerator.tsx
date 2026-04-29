
import React, { useState } from 'react';
import { Search, Sparkles, Copy, Check, Type } from 'lucide-react';
import { useKeyword } from '../context/KeywordContext';
import { PageHeader } from '../components/PageHeader';
import { SubCard } from '../components/SubCard';
import { generateTitles } from '../services/geminiService';
import { SEOTitle } from '../types';

export function TitleGenerator() {
  const { darkMode, copyToClipboard, copiedId } = useKeyword();
  const [keyword, setKeyword] = useState('');
  const [titles, setTitles] = useState<SEOTitle[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    try {
      const res = await generateTitles(keyword);
      setTitles(res);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const copyAll = () => {
    const text = titles.map(t => t.title).join('\n');
    copyToClipboard(text, 'copy-all');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader 
        title="SEO Title Generator" 
        description="Crafting headlines that demand attention and satisfy search algorithms with maximum CTR."
        icon={Type}
      />
      
      <div className={`p-2 sm:p-3 mb-10 rounded-2xl sm:rounded-full border flex flex-col sm:flex-row items-center gap-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/20'}`}>
        <div className="flex flex-1 items-center w-full px-4 sm:px-2">
          <Search className={`w-4 h-4 mr-3 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
          <input 
            type="text" 
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)} 
            placeholder="Enter seed keyword..."
            className="bg-transparent border-none outline-none flex-1 text-sm font-bold py-3 sm:py-0"
            onKeyDown={(e) => e.key === 'Enter' && fetchData()}
          />
        </div>
        <button 
          onClick={fetchData} 
          disabled={loading || !keyword.trim()}
          className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-3.5 sm:py-2.5 rounded-xl sm:rounded-full text-[10px] font-black tracking-widest uppercase hover:bg-emerald-500 disabled:opacity-30 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
        >
          {loading ? 'Thinking...' : 'Generate'}
        </button>
      </div>

      {titles.length > 0 && (
        <div className="flex justify-end mb-6">
          <button 
            onClick={copyAll}
            className={`px-6 py-2 rounded-xl text-[9px] font-black tracking-widest uppercase border transition-all flex items-center gap-2 ${darkMode ? 'bg-slate-900 border-slate-800 text-white hover:border-emerald-500' : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-500'}`}
          >
            {copiedId === 'copy-all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy All
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {titles.map((t, i) => (
          <SubCard 
            key={i}
            title={`Title Variant 0${i + 1}`}
            icon={<Sparkles className="w-3 h-3" />}
            onCopy={() => copyToClipboard(t.title, `title-${i}`)}
            isCopied={copiedId === `title-${i}`}
            charCount={t.title.length}
            limit={60}
          >
            <p className="text-sm font-black leading-snug">{t.title}</p>
          </SubCard>
        ))}
      </div>
    </div>
  );
}
