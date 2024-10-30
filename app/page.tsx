"use client";
import { Button } from "@/components/ui/button";
import { io, Socket } from "socket.io-client";
import React, { useEffect, useState } from "react";
import { useResearchPaper } from "@/app/ResearchPaperContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PenIcon } from "lucide-react";
import PaperForm from "@/components/paperForm";
import ResearchPaper from "@/components/ResearchPaper";
interface ResearchPaper {
  id: number;
  paperName: string;
  authorName: string;
  views: number;
  likes: number;
  dislikes: number;
  numberOfComments: number;
  description: string;
  comments: Comment[];
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
}
export default function Home() {
  
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  // const { papers,setPapers } = useResearchPaper();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const socket = io("ws://localhost:8000");
  console.log("hiiii");
  
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/paper", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPapers(data); // Assuming data is an array of research papers
      } catch (error) {
        setError((error as Error).message); // Type assertion to extract message
      } finally {
        setLoading(false);
      }
    };
    fetchPapers();
    // Set up the socket listener
    const handleNewPaperCreated = (newPaper: ResearchPaper) => {
      // console.log("hi chrome");
      setPapers((prevPapers) => {
        const paperExists = prevPapers.some(
          (paper) => paper.id === newPaper.id
        );
        if (paperExists) {
          return prevPapers.map((paper) =>
            paper.id === newPaper.id ? newPaper : paper
          );
        } else {
          return [...prevPapers, newPaper]; // Add new paper to the list
        }
      });
      fetchPapers();
    };
    const handleNewPaperCreatedtrue = (newPaper: ResearchPaper) => {
      fetchPapers();
    };

    socket.on("NewPaperCreated", handleNewPaperCreatedtrue);
    // socket.on("PaperLiked", handleLike);
    // socket.on("PaperDisliked", handleDislike);
    socket.on("postupdated", handleNewPaperCreated);
    return () => {
      socket.off("NewPaperCreated");
      socket.off("postupdated");
      // socket.off("LikeUpdate", handleLike);
      // socket.off("DislikeUpdate", handleDislike);
    };
  }, []);

  const handleLike = (paperId: number) => {
    socket.emit("likePaper", paperId.toString());
  };

  const handleDislike = (paperId: number) => {
    socket.emit("dislikePaper", paperId.toString());
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const renderPapers = () => {
    return papers.map((paper) => (
      <ResearchPaper
        key={paper.id}
        id={paper.id}
        title={paper.paperName}
        author={paper.authorName}
        views={paper.views}
        likes={paper.likes}
        dislikes={paper.dislikes}
        numberOfComments={paper.comments?.length || 0}
        description={paper.description}
        onLike={handleLike}
        onDislike={handleDislike}
      />
    ));
  };

  return (
    <div className="w-full">
      <div>
        <h1 className="text-center text-3xl m-5">Conference Papers</h1>
        
        <div className="flex flex-row fixed bottom-10 right-10">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-4 px-8 py-8 rounded-2xl">
                <PenIcon size={16} />
                Create paper
              </Button>
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
