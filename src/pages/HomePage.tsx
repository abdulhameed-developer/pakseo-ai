
import React from 'react';
import { Sparkles, Type, LayoutGrid, Tag, Braces, PenTool } from 'lucide-react';
import { useKeyword } from '../context/KeywordContext';
import { ToolCard } from '../components/ToolCard';

export function HomePage() {
  const { darkMode } = useKeyword();

  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-6">
          <Sparkles className="w-3 h-3" /> Professional SEO Intelligence
        </div>
        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-[1.05]">
          Generate High-Performance <br/>
          <span className="text-emerald-500 underline decoration-emerald-500/20 underline-offset-8">SEO Content Strategies</span>
        </h2>
        <p className={`text-base md:text-lg leading-relaxed opacity-70 max-w-xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Localized keyword strategies, semantic analysis, and structured outlines designed for the Pakistani digital market.
        </p>
      </div>

      {/* Tool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1400px] mx-auto">
        <ToolCard 
          title="Title Generator" 
          desc="Create high-CTR headlines optimized for Pakistani readers." 
          icon={<Type className="w-6 h-6" />}
          path="/title-generator"
          color="blue"
        />
        <ToolCard 
          title="Meta Suite" 
          desc="Perfectly balanced meta titles and descriptions for SERP dominance." 
          icon={<LayoutGrid className="w-6 h-6" />}
          path="/meta-generator"
          color="emerald"
        />
        <ToolCard 
          title="Keyword Engine" 
          desc="LSI, Long-tail, and Intent-based localized keyword research." 
          icon={<Tag className="w-6 h-6" />}
          path="/keyword-generator"
          color="amber"
          isHot
        />
        <ToolCard 
          title="Schema Generator" 
          desc="Generate Google-ready JSON-LD structured data for any page." 
          icon={<Braces className="w-6 h-6" />}
          path="/schema-generator"
          color="purple"
        />
        <ToolCard 
          title="Content Improver" 
          desc="Grammar, flow, and SEO logic overhaul for existing articles." 
          icon={<PenTool className="w-6 h-6" />}
          path="/content-improver"
          color="indigo"
          isHot
        />
      </div>
    </div>
  );
}
