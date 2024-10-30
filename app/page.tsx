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

import PaperForm from "@/components/paperForm";
import ResearchPaper from "@/components/ResearchPaper";
import { PenIcon } from "lucide-react";

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
  const { papers, setPapers } = useResearchPaper();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socket: Socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);

  useEffect(() => {

    // Set up the socket listener
    const handlePaperUpdated = (updatedPaper: ResearchPaper) => {
      console.log("paper updated");
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
      <div key={paper.id} className="sm:w-2/3 w-4/5 self-center">
        <ResearchPaper
          id={paper.id}
          title={paper.title}
          author={paper.author}
          views={paper.views}
          likes={paper.likes}
          dislikes={paper.dislikes}
          comments={paper.comments.length}
          description={paper.description}
          onLike={() => handleLike(paper.id)} // Pass down like handler
          onDislike={() => handleDislike(paper.id)} // Pass down dislike handler
        />
      </div>
    ));
  };

  return (
    <div className="w-full">
      <div>
        <h1 className="text-center text-3xl m-5">What&apos;s HOT</h1>

        <div className="flex justify-center p-4 sm:justify-end">
          <div className="fixed bottom-10 right-10">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-4 px-8 py-8 rounded-2xl"><PenIcon size={16} />Create paper</Button>
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
      </div>
      <div className="flex flex-col gap-6">{renderPapers()}</div>
    </div>
  );
}
