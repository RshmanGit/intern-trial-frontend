// ResearchPaperContext.tsx
'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import {papers1} from './data/papers';

type ResearchPaper ={
  id: string;
  title: string;
  author: string;
  views: number;
  likes: number;
  dislikes: number;
  description: string;
  comments: Array<any>;
}
interface ResearchPaperContextProps {
  papers: ResearchPaper[];
  setPapers: React.Dispatch<React.SetStateAction<ResearchPaper[]>>;
}

const ResearchPaperContext = createContext<ResearchPaperContextProps | undefined>(undefined);

export const ResearchPaperProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const dummyPapers = papers1;

  useEffect(() => {
    console.log(dummyPapers)
    setPapers(dummyPapers)
  },[])
  return (
    <ResearchPaperContext.Provider value={{ papers, setPapers }}>
      {children}
    </ResearchPaperContext.Provider>
  );
};

export const useResearchPaper = () => {
  const context = useContext(ResearchPaperContext);
  if (!context) {
    throw new Error('useResearchPaper must be used within a ResearchPaperProvider');
  }
  return context;
};
