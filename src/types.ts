
export interface SEOTitle {
  title: string;
}

export interface SEOMeta {
  metaTitle: string;
  metaDescription: string;
}

export interface SEOKeywords {
  primary: string;
  longTail: string[];
  lsi: string[];
  intents: {
    informational: string[];
    transactional: string[];
    local: string[];
  };
}

export interface SEOSchema {
  schema: string;
}

export interface SEOImprovedContent {
  improvedText: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface KeywordContextType {
  darkMode: boolean;
  setDarkMode: (d: boolean) => void;
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
}
