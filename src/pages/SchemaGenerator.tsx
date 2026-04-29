
import React, { useState, useMemo, useEffect } from 'react';
import { Braces, ChevronLeft, ChevronRight, Loader2, Zap, Code2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useKeyword } from '../context/KeywordContext';
import { PageHeader } from '../components/PageHeader';
import { SubCard } from '../components/SubCard';
import { useDragScroll } from '../hooks/useDragScroll';
import { generateSchema } from '../services/geminiService';
import { SEOSchema } from '../types';

export function SchemaGenerator() {
  const { darkMode, copyToClipboard, copiedId } = useKeyword();
  const [pageType, setPageType] = useState('Article');
  const [schemaData, setSchemaData] = useState<SEOSchema | null>(null);
  const [loading, setLoading] = useState(false);

  // Form States
  const [articleForm, setArticleForm] = useState({ 
    articleType: 'Article',
    headline: '', description: '', authorName: '', authorUrl: '', publisherName: '', 
    publisherLogo: '', articleUrl: '', images: [''], datePublished: '', dateModified: '', 
    section: '', keywords: '' 
  });
  
  const [faqForm, setFaqForm] = useState([{ q: '', a: '' }]);
  
  const [productForm, setProductForm] = useState({ 
    name: '', description: '', brand: '', sku: '', url: '', image: '', price: '', 
    currency: 'PKR', availability: 'InStock', condition: 'New', ratingValue: '', 
    reviewCount: '' 
  });
  
  const [businessForm, setBusinessForm] = useState({ 
    name: '', type: 'Organization', description: '', website: '', logo: '', image: '', 
    phone: '', email: '', address: '', city: '', region: '', postalCode: '', 
    country: 'Pakistan', mapsUrl: '', hours: '', priceRange: '' 
  });

  const [breadcrumbForm, setBreadcrumbForm] = useState([{ name: '', url: '' }]);
  const [webPageForm, setWebPageForm] = useState({ name: '', description: '', url: '' });
  const [personForm, setPersonForm] = useState({ name: '', jobTitle: '', website: '', sameAs: '', image: '' });
  const [videoForm, setVideoForm] = useState({ name: '', description: '', thumbnail: '', contentUrl: '', embedUrl: '', uploadDate: '' });
  const [howToForm, setHowToForm] = useState({ name: '', description: '', steps: [{ text: '' }] });
  const [eventForm, setEventForm] = useState({ name: '', description: '', startDate: '', endDate: '', locationName: '', address: '', image: '', price: '', currency: 'PKR' });
  const [reviewForm, setReviewForm] = useState({ itemReviewed: '', author: '', ratingValue: '5', reviewBody: '', datePublished: '' });

  const types = useMemo(() => [
    'Article', 'FAQPage', 'Product', 'LocalBusiness', 
    'BreadcrumbList', 'WebPage', 'Organization', 'Person', 
    'VideoObject', 'HowTo', 'Event', 'Review'
  ], []);

  const schemaTabsScroll = useDragScroll();
  const articleSubtypeScroll = useDragScroll();

  useEffect(() => {
    // Auto-scroll active tab into view
    const activeTab = document.querySelector('[data-active="true"]');
    if (activeTab) {
      activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    // Refresh overflow states
    setTimeout(() => {
      schemaTabsScroll.refresh();
      articleSubtypeScroll.refresh();
    }, 300); // Wait for scrollIntoView to finish
  }, [pageType, articleForm.articleType]);

  const fetchData = async () => {
    setLoading(true);
    setSchemaData(null);
    let payload = {};
    
    if (pageType === 'Article') payload = articleForm;
    else if (pageType === 'FAQPage') payload = { faqs: faqForm.filter(f => f.q && f.a) };
    else if (pageType === 'Product') payload = productForm;
    else if (pageType === 'LocalBusiness' || pageType === 'Organization') payload = businessForm;
    else if (pageType === 'BreadcrumbList') payload = { items: breadcrumbForm.filter(b => b.name && b.url) };
    else if (pageType === 'WebPage') payload = webPageForm;
    else if (pageType === 'Person') payload = personForm;
    else if (pageType === 'VideoObject') payload = videoForm;
    else if (pageType === 'HowTo') payload = howToForm;
    else if (pageType === 'Event') payload = eventForm;
    else if (pageType === 'Review') payload = reviewForm;

    try {
      const res = await generateSchema(pageType, JSON.stringify(payload));
      setSchemaData(res);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const renderInput = (label: string, value: string, onChange: (val: string) => void, type = "text", placeholder = "") => (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-500/60 px-1">{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full p-4 rounded-2xl border text-sm font-bold outline-none transition-all duration-300 focus:scale-[1.01] focus:ring-4 focus:ring-emerald-500/10 min-h-[120px] ${
            darkMode ? 'bg-slate-800/40 border-slate-700/50 text-white focus:border-emerald-500' : 'bg-white border-slate-200 text-slate-800 focus:border-emerald-500 shadow-sm'
          }`}
        />
      ) : (
        <input 
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full p-4 rounded-2xl border text-sm font-bold outline-none transition-all duration-300 focus:scale-[1.01] focus:ring-4 focus:ring-emerald-500/10 ${
            darkMode ? 'bg-slate-800/40 border-slate-700/50 text-white focus:border-emerald-500' : 'bg-white border-slate-200 text-slate-800 focus:border-emerald-500 shadow-sm'
          }`}
        />
      )}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader 
        title="Advanced Schema Studio" 
        description="Professional-grade JSON-LD structured data generator with comprehensive conditional inputs."
        icon={Braces}
      />

      <div className="mb-10 space-y-8">
        {/* Schema Type Tabs - Clean Flat System */}
        <div className="relative -mx-6 group">
          {/* SaaS Navigation Controls - Subtle Floating Arrows */}
          <AnimatePresence>
            {schemaTabsScroll.overflow.left && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute left-6 top-[22px] -translate-y-1/2 z-20"
              >
                <button 
                  onClick={() => schemaTabsScroll.scrollBy(-320)}
                  className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 transition-all active:scale-90"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {schemaTabsScroll.overflow.right && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute right-6 top-[22px] -translate-y-1/2 z-20"
              >
                <button 
                  onClick={() => schemaTabsScroll.scrollBy(320)}
                  className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 transition-all active:scale-90"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div 
            ref={schemaTabsScroll.ref}
            {...schemaTabsScroll.events}
            className="flex flex-nowrap overflow-x-auto pb-6 gap-3 no-scrollbar px-10 md:flex-wrap md:overflow-visible md:pb-0 cursor-grab active:cursor-grabbing select-none scroll-smooth snap-x touch-pan-x"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {types.map((type) => (
              <button
                key={type}
                data-active={pageType === type}
                onClick={() => {
                  if (schemaTabsScroll.dragged) return;
                  setPageType(type);
                  setSchemaData(null);
                }}
                className={`flex-shrink-0 px-7 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all duration-300 snap-center ${
                  pageType === type 
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-xl shadow-emerald-500/20 z-10' 
                  : darkMode 
                    ? 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300' 
                    : 'bg-white border-slate-200 text-slate-400 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Conditional Form Sections */}
        <div className={`p-8 md:p-12 rounded-[2.5rem] border space-y-10 transition-all duration-500 ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200/60 shadow-2xl shadow-slate-200/20'}`}>
          {pageType === 'Article' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="md:col-span-2 space-y-4">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-500/80">Article Configuration</label>
                <div className="relative -mx-6 group/subtype">
                  {/* Clean Navigation Arrows Without Heavy Gradients */}
                  <AnimatePresence>
                    {articleSubtypeScroll.overflow.left && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute left-6 top-[17px] -translate-y-1/2 z-20"
                      >
                        <button 
                          onClick={() => articleSubtypeScroll.scrollBy(-240)}
                          className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all active:scale-90"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {articleSubtypeScroll.overflow.right && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute right-6 top-[17px] -translate-y-1/2 z-20"
                      >
                        <button 
                          onClick={() => articleSubtypeScroll.scrollBy(240)}
                          className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all active:scale-90"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div 
                    ref={articleSubtypeScroll.ref}
                    {...articleSubtypeScroll.events}
                    className="flex flex-nowrap overflow-x-auto pb-4 gap-2 no-scrollbar px-10 md:flex-wrap md:overflow-visible md:pb-0 cursor-grab active:cursor-grabbing select-none scroll-smooth snap-x touch-pan-x"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                  >
                    {[
                      'Article', 'NewsArticle', 'BlogPosting', 'TechArticle', 
                      'Report', 'ScholarlyArticle', 'SocialMediaPosting', 'LiveBlogPosting'
                    ].map((t) => (
                      <button
                        key={t}
                        data-active={articleForm.articleType === t}
                        onClick={() => {
                          if (articleSubtypeScroll.dragged) return;
                          setArticleForm({...articleForm, articleType: t});
                        }}
                        className={`flex-shrink-0 px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all duration-300 snap-center ${
                          articleForm.articleType === t 
                          ? 'bg-emerald-600 border-emerald-500 text-white shadow-xl shadow-emerald-500/10' 
                          : darkMode 
                            ? 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-400' 
                            : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200 hover:bg-slate-100/50 hover:text-slate-600'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                {renderInput("Headline *", articleForm.headline, (v) => setArticleForm({...articleForm, headline: v}))}
              </div>
              {renderInput("Author Name", articleForm.authorName, (v) => setArticleForm({...articleForm, authorName: v}))}
              {renderInput("Author URL", articleForm.authorUrl, (v) => setArticleForm({...articleForm, authorUrl: v}), "url")}
              {renderInput("Publisher Name", articleForm.publisherName, (v) => setArticleForm({...articleForm, publisherName: v}))}
              {renderInput("Publisher Logo URL", articleForm.publisherLogo, (v) => setArticleForm({...articleForm, publisherLogo: v}), "url")}
              {renderInput("Article URL", articleForm.articleUrl, (v) => setArticleForm({...articleForm, articleUrl: v}), "url")}
              {renderInput("Date Published", articleForm.datePublished, (v) => setArticleForm({...articleForm, datePublished: v}), "date")}
              <div className="md:col-span-2">
                {renderInput("Keywords (comma separated)", articleForm.keywords, (v) => setArticleForm({...articleForm, keywords: v}))}
              </div>
              <div className="md:col-span-2">
                {renderInput("Article Description", articleForm.description, (v) => setArticleForm({...articleForm, description: v}), "textarea")}
              </div>
            </div>
          )}

          {pageType === 'FAQPage' && (
            <div className="space-y-6">
              {faqForm.map((faq, i) => (
                <div key={i} className={`p-6 rounded-3xl border-2 border-dashed ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase text-emerald-500/40">Question {i + 1}</span>
                    {faqForm.length > 1 && (
                      <button onClick={() => setFaqForm(faqForm.filter((_, idx) => idx !== i))} className="text-red-500 hover:scale-110 transition-transform">
                        <Trash2Icon />
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    {renderInput(`Question ${i + 1}`, faq.q, (v) => {
                      const n = [...faqForm]; n[i].q = v; setFaqForm(n);
                    })}
                    {renderInput(`Answer ${i + 1}`, faq.a, (v) => {
                      const n = [...faqForm]; n[i].a = v; setFaqForm(n);
                    }, "textarea")}
                  </div>
                </div>
              ))}
              <button 
                onClick={() => setFaqForm([...faqForm, { q: '', a: '' }])}
                className={`w-full py-4 rounded-2xl border-2 border-dashed text-[10px] font-black uppercase tracking-widest transition-all ${darkMode ? 'border-slate-800 hover:border-emerald-500/50 text-slate-500 hover:text-emerald-500' : 'border-slate-200 hover:border-emerald-500 hover:text-emerald-600 font-bold'}`}
              >
                + Add Another Question
              </button>
            </div>
          )}

          {(pageType === 'LocalBusiness' || pageType === 'Organization') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="md:col-span-2">
                 <p className="text-[9px] font-bold opacity-30 uppercase tracking-widest mb-2">Business Identity</p>
              </div>
              {renderInput("Business Name *", businessForm.name, (v) => setBusinessForm({...businessForm, name: v}))}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-500/60 px-1">Business Type</label>
                <select 
                  value={businessForm.type}
                  onChange={(e) => setBusinessForm({...businessForm, type: e.target.value})}
                  className={`w-full p-4 rounded-2xl border text-sm font-bold outline-none appearance-none transition-all duration-300 focus:scale-[1.01] focus:ring-4 focus:ring-emerald-500/10 ${
                    darkMode ? 'bg-slate-800/40 border-slate-700/50 text-white focus:border-emerald-500' : 'bg-white border-slate-200 text-slate-800 shadow-sm focus:border-emerald-500'
                  }`}
                >
                  <option value="LocalBusiness">General Local Business</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Store">Store</option>
                  <option value="HealthAndBeautyBusiness">Health & Beauty</option>
                  <option value="ProfessionalService">Professional Service</option>
                  <option value="AutomotiveBusiness">Automotive</option>
                  <option value="FinancialService">Financial Service</option>
                </select>
              </div>
              {renderInput("Website URL", businessForm.website, (v) => setBusinessForm({...businessForm, website: v}), "url")}
              {renderInput("Logo URL", businessForm.logo, (v) => setBusinessForm({...businessForm, logo: v}), "url")}
              {renderInput("Image URL", businessForm.image, (v) => setBusinessForm({...businessForm, image: v}), "url")}

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-dashed border-slate-100 dark:border-slate-800/50">
                <div className="md:col-span-2">
                   <p className="text-[9px] font-bold opacity-30 uppercase tracking-widest mb-2">Contact & Location</p>
                </div>
                {renderInput("Phone Number", businessForm.phone, (v) => setBusinessForm({...businessForm, phone: v}))}
                {renderInput("Email Address", businessForm.email, (v) => setBusinessForm({...businessForm, email: v}))}
                {renderInput("Street Address", businessForm.address, (v) => setBusinessForm({...businessForm, address: v}))}
                {renderInput("City", businessForm.city, (v) => setBusinessForm({...businessForm, city: v}))}
                {renderInput("Region/Province", businessForm.region, (v) => setBusinessForm({...businessForm, region: v}))}
                {renderInput("Postal Code", businessForm.postalCode, (v) => setBusinessForm({...businessForm, postalCode: v}))}
                {renderInput("Country", businessForm.country, (v) => setBusinessForm({...businessForm, country: v}))}
                {renderInput("Google Maps URL", businessForm.mapsUrl, (v) => setBusinessForm({...businessForm, mapsUrl: v}), "url")}
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-dashed border-slate-100 dark:border-slate-800/50">
                <div className="md:col-span-2">
                   <p className="text-[9px] font-bold opacity-30 uppercase tracking-widest mb-2">Extra Details</p>
                </div>
                {renderInput("Opening Hours", businessForm.hours, (v) => setBusinessForm({...businessForm, hours: v}), "text", "Mo-Fr 09:00-17:00")}
                {renderInput("Price Range", businessForm.priceRange, (v) => setBusinessForm({...businessForm, priceRange: v}), "text", "$$, $$$, 1000 PKR")}
                <div className="md:col-span-2">
                  {renderInput("Business Description", businessForm.description, (v) => setBusinessForm({...businessForm, description: v}), "textarea")}
                </div>
              </div>
            </div>
          )}

          <div className="pt-4">
            <button 
              onClick={fetchData} 
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase hover:bg-emerald-500 disabled:opacity-30 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 fill-current" />}
              {loading ? 'Analyzing & Building...' : 'Generate Advanced Schema'}
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="space-y-8">
           <div className={`p-10 rounded-[2.5rem] border-2 border-dashed flex flex-col items-center justify-center gap-6 ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="relative">
                <Loader2 className="w-12 h-12 animate-spin text-emerald-500" />
                <div className="absolute inset-0 blur-xl bg-emerald-500/20 animate-pulse" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500">Processing Engine</p>
                <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Optimizing for Fast Content Delivery...</p>
              </div>
           </div>
        </div>
      )}

      {schemaData && !loading && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <SubCard 
            title="JSON-LD Structured Data" 
            icon={<Code2 className="w-4 h-4" />}
            onCopy={() => copyToClipboard(schemaData.schema, 'schema-copy')}
            isCopied={copiedId === 'schema-copy'}
          >
            <div className="relative group">
              <pre className={`text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap p-6 rounded-2xl ${darkMode ? 'bg-slate-950 text-emerald-400 border border-slate-800' : 'bg-slate-50 text-slate-800 border border-slate-100 shadow-inner'}`}>
                {schemaData.schema}
              </pre>
            </div>
          </SubCard>
          
          <div className="flex justify-center">
            <button 
              onClick={fetchData}
              className={`px-8 py-3 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all hover:border-emerald-500 flex items-center gap-2 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}`}
            >
              <RefreshCw className="w-3.5 h-3.5" /> Regenerate
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function Trash2Icon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
  );
}
