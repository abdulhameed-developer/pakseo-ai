
import React, { useState } from 'react';
import { Search, Tag, Loader2, RefreshCw, Copy, Check, Zap, ArrowRight, Globe, Type, MousePointer2 } from 'lucide-react';
import { useKeyword } from '../context/KeywordContext';
import { PageHeader } from '../components/PageHeader';
import { SubCard } from '../components/SubCard';
import { generateKeywords } from '../services/geminiService';
import { SEOKeywords } from '../types';

export function KeywordGenerator() {
  const { darkMode, copyToClipboard, copiedId } = useKeyword();
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState<SEOKeywords | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    try {
      const res = await generateKeywords(keyword);
      setData(res);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const copyAll = () => {
    if (!data) return;
    const text = `Primary: ${data.primary}\nLongtail: ${data.longTail.join(', ')}\nLSI: ${data.lsi.join(', ')}`;
    copyToClipboard(text, 'copy-all');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader 
        title="Keyword Intelligence" 
        description="Deep semantic mining and intent categorization filtered for the regional market."
        icon={Tag}
      />

      <div className={`p-2 sm:p-3 mb-10 rounded-2xl sm:rounded-full border flex flex-col sm:flex-row items-center gap-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/20'}`}>
        <div className="flex flex-1 items-center w-full px-4 sm:px-2">
          <Search className={`w-4 h-4 mr-3 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
          <input 
            type="text" 
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)} 
            placeholder="Seed keyword (e.g., SEO Karachi)..."
            className="bg-transparent border-none outline-none flex-1 text-sm font-bold py-3 sm:py-0"
            onKeyDown={(e) => e.key === 'Enter' && fetchData()}
          />
        </div>
        <button 
          onClick={fetchData} 
          disabled={loading || !keyword.trim()}
          className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-3.5 sm:py-2.5 rounded-xl sm:rounded-full text-[10px] font-black tracking-widest uppercase hover:bg-emerald-500 disabled:opacity-30 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
          {loading ? 'Mining...' : 'Research'}
        </button>
      </div>

      {data && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button 
              onClick={copyAll}
              className={`px-8 py-2.5 rounded-2xl font-black uppercase text-[10px] tracking-widest border transition-all flex items-center gap-2 ${darkMode ? 'border-slate-800 bg-slate-900 text-white hover:border-emerald-500/50' : 'border-slate-200 bg-white text-slate-800 hover:border-emerald-500'}`}
            >
              {copiedId === 'copy-all' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              Export Keywords
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SubCard title="Primary Seed" icon={<Zap className="w-3.5 h-3.5" />}>
              <p className="text-2xl font-black text-emerald-500">{data.primary}</p>
            </SubCard>

            <SubCard title="Long-Tail Variations" icon={<ArrowRight className="w-3.5 h-3.5" />}>
              <div className="flex flex-wrap gap-2">
                {data.longTail.map((kw, i) => (
                  <span key={i} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                    {kw}
                  </span>
                ))}
              </div>
            </SubCard>

            <SubCard title="Semantic Cluster (LSI)" icon={<Globe className="w-3.5 h-3.5" />}>
              <div className="flex flex-wrap gap-2">
                {data.lsi.map((kw, i) => (
                  <span key={i} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border border-dotted ${darkMode ? 'border-slate-700 bg-slate-950/30' : 'border-slate-200 bg-white shadow-sm'}`}>
                    {kw}
                  </span>
                ))}
              </div>
            </SubCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <SubCard title="Informational Intent" icon={<Type className="w-3.5 h-3.5" />}>
                <div className="space-y-3">
                   {data.intents.informational.map((kw, i) => (
                     <div key={i} className="flex items-center gap-3 text-xs font-bold opacity-70">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {kw}
                     </div>
                   ))}
                </div>
             </SubCard>
             <SubCard title="Transactional Intent" icon={<MousePointer2 className="w-3.5 h-3.5" />}>
                <div className="space-y-3">
                   {data.intents.transactional.map((kw, i) => (
                     <div key={i} className="flex items-center gap-3 text-xs font-bold opacity-70">
                       <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {kw}
                     </div>
                   ))}
                </div>
             </SubCard>
             <SubCard title="Local (City Specific)" icon={<Globe className="w-3.5 h-3.5" />}>
                <div className="space-y-3">
                   {data.intents.local.map((kw, i) => (
                     <div key={i} className="flex items-center gap-3 text-xs font-bold opacity-70">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> {kw}
                     </div>
                   ))}
                </div>
             </SubCard>
          </div>
        </div>
      )}
    </div>
  );
}
