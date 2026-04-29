
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { KeywordContext } from './context/KeywordContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { TitleGenerator } from './pages/TitleGenerator';
import { MetaGenerator } from './pages/MetaGenerator';
import { KeywordGenerator } from './pages/KeywordGenerator';
import { SchemaGenerator } from './pages/SchemaGenerator';
import { ContentImprover } from './pages/ContentImprover';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <KeywordContext.Provider value={{ darkMode, setDarkMode, copyToClipboard, copiedId }}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/title-generator" element={<TitleGenerator />} />
            <Route path="/meta-generator" element={<MetaGenerator />} />
            <Route path="/keyword-generator" element={<KeywordGenerator />} />
            <Route path="/schema-generator" element={<SchemaGenerator />} />
            <Route path="/content-improver" element={<ContentImprover />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </KeywordContext.Provider>
  );
}
