"use client";
import { Button } from "@/components/ui/button";
import { io, Socket } from "socket.io-client";
import React, { useEffect, useState } from "react";
import { useResearchPaper } from '@/app/ResearchPaperContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import PaperForm from "@/components/paperForm";
import ResearchPaper from "@/components/ResearchPaper";

// Define the ResearchPaper type
interface ResearchPaper {
  id: string; // or string based on your API
  title: string;
  author: string;
  views: number;
  likes: number;
  dislikes: number;
  description: string;
  comments: Array<any>;
}

export default function Home() {
  // const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const { papers,setPapers } = useResearchPaper();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socket: Socket = io("http://localhost:5000");

  useEffect(() => {
  //   const fetchPapers = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://r4b85zv7-8000.inc1.devtunnels.ms/api/v1/researchPaper",
  //         {
  //           method: "GET",
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setPapers(data); // Assuming data is an array of research papers
  //     } catch (error) {
  //       setError((error as Error).message); // Type assertion to extract message
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

    // fetchPapers();

    // Set up the socket listener
    const handlePaperUpdated = (updatedPaper: ResearchPaper) => {
      console.log("paper updated")
      setPapers((prevPapers) =>
        prevPapers.map((paper) =>
          paper.id === updatedPaper.id ? updatedPaper : paper
        )
      );
    };

    socket.on("PaperUpdated", handlePaperUpdated);

    // Cleanup function
    // return () => {
    //   socket.off("PaperUpdated", handlePaperUpdated);
    // };
    
  }, [papers]);

  const handleLike = (paperId: string) => {
    // socket.emit("likePost", paperId);
  };

  const handleDislike = (paperId: string) => {
    // socket.emit("dislikePost", paperId);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const renderPapers = () => {
    return papers.map((paper) => (
      <ResearchPaper
        key={paper.id}
        id={paper.id}
        title={paper.title}
        author={paper.author}
        views={paper.views}
        likes={paper.likes}
        dislikes={paper.dislikes}
        comments={paper.comments.length}
        description={paper.description}
        onLike={() => handleLike(paper.id)} // Pass down like handler
        onDislike={() => handleDislike(paper.id)}// Pass down dislike handler
      />
    ));
  };

  return (
    <div className="w-full">
      <div>
        <h1 className="text-center m-5">Conference Papers</h1>

        <div className="flex justify-center p-4 sm:justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create paper</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Fill paper details</DialogTitle>
                <DialogDescription>
                  <PaperForm />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>{renderPapers()}</div>
    </div>
  );
}
