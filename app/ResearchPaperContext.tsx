// ResearchPaperContext.tsx
'use client'
import React, { createContext, useContext, useState } from 'react';

interface ResearchPaper {
  id: number;
  paperName: string;
  authorName: string;
  views: number;
  likes: number;
  dislikes: number;
  numberOfComments: number;
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
