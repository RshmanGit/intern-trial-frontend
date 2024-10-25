'use client'
import React, { useEffect, useState } from 'react';
import ResearchPaper from './ResearchPaper'
const FetchPapers = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/researchPapers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPapers(data); // Assuming data is an array of research papers
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-lg font-medium">Research Papers</h2>
      <ul>
        {papers.map((paper) => (
          <li key={paper.id} className="p-4 border-b">
          <ResearchPaper
            name={paper.paperName}
            description={paper.paperDescription}
            author={paper.authorName}
          />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchPapers;
