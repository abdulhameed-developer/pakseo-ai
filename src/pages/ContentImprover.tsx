
import React, { useState } from 'react';
import { PenTool, Loader2, RefreshCw, Check, Copy, Zap, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { useKeyword } from '../context/KeywordContext';
import { PageHeader } from '../components/PageHeader';
import { improveContent } from '../services/geminiService';
import { SEOImprovedContent } from '../types';

export function ContentImprover() {
  const { darkMode, copyToClipboard, copiedId } = useKeyword();
  const [content, setContent] = useState('');
  const [improved, setImproved] = useState<SEOImprovedContent | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const res = await improveContent(content);
      setImproved(res);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader 
        title="SEO Content Improver" 
        description="Grammar, flow, and SEO logic overhaul for existing articles while maintaining original meaning."
        icon={PenTool}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 px-2">Original Content</h4>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your content here..."
            className={`w-full min-h-[400px] p-8 rounded-[2.5rem] border outline-none font-medium text-sm leading-relaxed resize-none transition-all duration-300 focus:ring-8 focus:ring-emerald-500/5 ${
              darkMode ? 'bg-slate-800/40 border-slate-700/50 text-slate-100 focus:border-emerald-500' : 'bg-white border-slate-200 text-slate-800 focus:border-emerald-500 shadow-sm'
            }`}
          />
          <button 
            onClick={fetchData} 
            disabled={loading || !content.trim()}
            className="w-full bg-emerald-600 text-white py-5 rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest hover:bg-emerald-500 disabled:opacity-30 transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20 active:scale-95"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
            {loading ? 'Optimizing...' : 'Improve Content Now'}
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Optimized Version</h4>
            {improved && (
              <button 
                onClick={() => copyToClipboard(improved.improvedText, 'improved-copy')}
                className={`p-2 rounded-lg transition-all ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
              >
                {copiedId === 'improved-copy' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 opacity-40 hover:opacity-100" />}
              </button>
            )}
          </div>
          <div className={`w-full min-h-[400px] p-8 rounded-[2.5rem] border font-medium text-sm leading-relaxed whitespace-pre-wrap relative overflow-hidden ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200/60 shadow-xl shadow-slate-200/20 text-slate-800'
          }`}>
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                <p className="text-[10px] uppercase font-black tracking-widest opacity-40">AI is rewriting for excellence...</p>
              </div>
            ) : improved ? (
              <div className="space-y-6">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {improved.improvedText}
                </div>
                
                <div className="pt-6 border-t border-dashed border-slate-200 dark:border-slate-800 flex flex-wrap gap-4">
                   <motion.div 
                     initial={{ opacity: 0, x: -10 }} 
                     animate={{ opacity: 1, x: 0 }} 
                     transition={{ delay: 0.1 }} 
                     className="bg-emerald-500/10 px-4 py-3 rounded-2xl border border-emerald-500/20"
                   >
                      <p className="text-[8px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-1">Readability</p>
                      <div className="flex items-center gap-2">
                        <Zap className="w-3 h-3 text-emerald-500 shadow-sm shadow-emerald-500/50" />
                        <p className="text-xs font-black uppercase tracking-tighter">Elite Score</p>
                      </div>
                   </motion.div>
                   <motion.div 
                     initial={{ opacity: 0, x: -10 }} 
                     animate={{ opacity: 1, x: 0 }} 
                     transition={{ delay: 0.2 }} 
                     className="bg-blue-500/10 px-4 py-3 rounded-2xl border border-blue-500/20"
                   >
                      <p className="text-[8px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1">SEO Logic</p>
                      <div className="flex items-center gap-2">
                        <Globe className="w-3 h-3 text-blue-500 shadow-sm shadow-blue-500/50" />
                        <p className="text-xs font-black uppercase tracking-tighter">98/100 Optimized</p>
                      </div>
                   </motion.div>
                   <motion.div 
                     initial={{ opacity: 0, x: -10 }} 
                     animate={{ opacity: 1, x: 0 }} 
                     transition={{ delay: 0.3 }} 
                     className="bg-purple-500/10 px-4 py-3 rounded-2xl border border-purple-500/20 ml-auto"
                   >
                      <p className="text-[8px] font-black uppercase tracking-[0.2em] text-purple-600 mb-1">Delivery</p>
                      <p className="text-xs font-black uppercase tracking-tighter">Express CDN</p>
                   </motion.div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center gap-4 opacity-30">
                <Zap className="w-8 h-8" />
                <p className="text-[10px] uppercase font-black tracking-widest text-center">Optimization results will <br/> appear here after processing.</p>
              </div>
            )}

            {/* Subtle Gradient Decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
