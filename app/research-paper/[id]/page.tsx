'use client'
import React, { useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";
import {
  ThumbsDownIcon,
  ThumbsUpIcon,
  EyeIcon,
  MessageSquareCode,
} from "lucide-react";
import { useResearchPaper } from '@/app/ResearchPaperContext';
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CommentForm from '@/components/CommentFrom';
import CommentCard from '@/components/CommentCard';// Adjust the import path
interface ResearchPaper {
  id: string; // Adjust according to your actual API structure
  title: string;
  description: string;
  authorName: string; // Use the correct key based on your API response
  views: number;
  likes: number;
  dislikes: number;
  comments: Comment[];
}
interface Comment {
  id: string;
  name: string;
  content: string;
  createdAt: string; // Add any other properties you want to display
}
const Page = ({ params }: { params: { id: string } }) => {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 
  const [comments, setComments] = useState<Comment[]>([]);
  const socket: Socket = io("http://localhost:8000");

  
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/paper`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: ResearchPaper[] = await response.json();
        setPapers(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/paper/${params.id}/comment`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }

        const commentsData: Comment[] = await response.json();
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError((error as Error).message);
      }
    };
    fetchPapers();
    fetchComments();
    const handleNewPaperCreated = (newPaper: ResearchPaper) => {
      setPapers((prevPapers) => {
        const paperExists = prevPapers.some(
          (paper) => paper.id === newPaper.id
        );
        if (paperExists) {
          return prevPapers.map((paper) =>
            paper.id === newPaper.id ? newPaper : paper
          );
        } 
        else {
          return [...prevPapers, newPaper];
        }
      });
      fetchPapers();
    };
    const handleNewCommentCreated = (newComment: Comment) => {
      setComments((prevComments) => [...prevComments, newComment]);
      fetchComments();
    };
    socket.on("commentCreated", handleNewCommentCreated);
    socket.on("postupdated", handleNewPaperCreated);
    return () => {
      socket.off("postupdated");
      socket.off("commentCreated", handleNewCommentCreated);
    };
    
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching papers: {error}</div>;

  const paper = papers?.find((p: ResearchPaper) => p.id.toString() === params.id);
  console.log(paper);
  if (!paper) return <div>Paper not found</div>;


  const handleLike = (paperId: string) => {
    socket.emit("likePaper", paperId);
  };

  const handleDislike = (paperId: string) => {
    socket.emit("dislikePaper", paperId);
  };

  return (
    <>
      <div className='m-3'>
        <div className='flex justify-center text-xl'>
          {paper?.title}
        </div>
        <div>
          {paper?.description}
        </div>
        <div>
          - {paper?.authorName}
        </div>
        <div>
        <div className="grid grid-cols-2  gap-4 sm:flex flex-row justify-between mt-4 w-full sm:w-auto">
            <Button
               variant={"ghost"}
              className="flex border border-black mb-4 md:mb-0 gap-1 transform transition-transform duration-200 hover:scale-125"
              
              onClick={() => {
                handleLike(paper.id)
                toast.info("You liked!", {
                  duration: 1000,
                  position: "top-right",
                });
              }}
            >
              <ThumbsUpIcon size={16} />
              <span className="ml-1">{paper?.likes}</span> {/* Display the count */}
            </Button>

            {/* Thumbs Down Button */}
            <Button
               variant={"ghost"}
              className="flex border border-black mb-4 md:mb-0 gap-1 transform transition-transform duration-200 hover:scale-125"
              onClick={() => {
                handleDislike(paper.id)
                toast.info("you disliked!", {
                  duration: 1000,
                  position: "top-right",
                });
              }}
            >
              <ThumbsDownIcon size={16} />
              <span className="ml-1">{paper.dislikes}</span> {/* Display the count */}
            </Button>

            {/* views Button */}
            <Button
               variant={"ghost"}
              className="flex border border-black mb-4 md:mb-0 gap-1 transform transition-transform duration-200 hover:scale-125"
            >
              <EyeIcon size={16} />
              <span className="ml-1">{paper.views}</span>
              {/* Display the comment count */}
            </Button>

            {/* Comments Button */}
            <Button
               variant={"ghost"}
              className="flex border border-black mb-4 md:mb-0 gap-1 transform transition-transform duration-200 hover:scale-125"
            >
              <MessageSquareCode size={16} />
              <span className="ml-1">{comments.length}</span>{" "}
              {/* Display the comment count */}
            </Button>
          </div>
        </div>
        <div className="mt-6">
        <h2 className="text-lg font-bold">Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard key={comment.id} name={comment.name} comment={comment.content} />
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full mt-4 sm:w-auto">Create comment</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Comment</DialogTitle>
              <DialogDescription>
                <CommentForm paperId={paper.id}/>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

      </div>
    </>
  );
};

export default Page;
