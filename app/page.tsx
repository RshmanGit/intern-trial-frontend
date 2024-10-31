"use client";
import { Button } from "@/components/ui/button";
import { io,Socket} from "socket.io-client";
import React, { useEffect, useState } from "react";
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
  id: string;
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
interface Comment {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}
export default function Home() {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});
  const socket: Socket = io('http://localhost:8000');
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/paper`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPapers(data); 
        const commentsData = await Promise.all(
          data.map(async (paper: ResearchPaper) => {
            const commentsResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/paper/${paper.id}/comment`
            );
            if (!commentsResponse.ok) {
              throw new Error("Failed to fetch comments");
            }
            return { paperId: paper.id, comments: await commentsResponse.json() };
          })
        );
        const commentsMap: { [key: string]: Comment[] } = {};
        commentsData.forEach(({ paperId, comments }) => {
          commentsMap[paperId] = comments;
        });
        setComments(commentsMap);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchPapers();
    
    const handleNewPaperCreated = (newPaper: ResearchPaper) => {
      setPapers((prevPapers) => {
        const paperExists = prevPapers.some(
          (paper) => paper.id === newPaper.id
        );
        if (paperExists) {
          return prevPapers.map((paper) =>
            paper.id === newPaper.id ? newPaper : paper
          );
        } else {
          return [...prevPapers, newPaper];
        }
      });
      fetchPapers();
    };
    const handleNewCommentCreated = ()=>{
      fetchPapers();
    }
    const handleNewPaperCreatedtrue = (newPaper: ResearchPaper) => {
      fetchPapers();
    };
    socket.on("NewPaperCreated", handleNewPaperCreatedtrue);
    socket.on("postupdated", handleNewPaperCreated);
    socket.on("commentCreated", handleNewCommentCreated);
    return () => {
      socket.off("NewPaperCreated");
      socket.off("postupdated");
      socket.off("commentCreated");
    };
  }, []);

  const handleLike = (paperId: string) => {
    socket.emit("likePaper", paperId);
  };

  const handleDislike = (paperId: string) => {
    socket.emit("dislikePaper", paperId);
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  const renderPapers = () => {
    return papers.map((paper) => (
      <div key={paper.id} className="w-3/4 sm:w-2/3 self-center">

      <ResearchPaper
        key={paper.id}
        id={paper.id}
        title={paper.paperName}
        author={paper.authorName}
        views={paper.views}
        likes={paper.likes}
        dislikes={paper.dislikes}
        numberOfComments={comments[paper.id]?.length || 0}
        description={paper.description}
        onLike={handleLike}
        onDislike={handleDislike}
      />
      </div>
    ));
  };

  return (
    <div className="w-full">
      <div>
        <h1 className="text-center text-3xl m-5">What&apos;s HOT</h1>
        
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
      <div className="flex flex-col gap-3">{renderPapers()}</div>
    </div>
  );
}
