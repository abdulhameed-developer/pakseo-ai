
import React, { createContext, useContext } from 'react';
import { KeywordContextType } from '../types';

export const KeywordContext = createContext<KeywordContextType | undefined>(undefined);

export function useKeyword() {
  const context = useContext(KeywordContext);
  if (!context) throw new Error('useKeyword must be used within Provider');
  return context;
}
