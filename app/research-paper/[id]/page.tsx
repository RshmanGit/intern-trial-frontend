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
// import ButtonGroup from '@/components/ButtonGroup';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CommentForm from '@/components/CommentFrom';// Adjust the import path
interface ResearchPaper {
  id: string; // Adjust according to your actual API structure
  title: string;
  description: string;
  authorName: string; // Use the correct key based on your API response
  views: number;
  likes: number;
  dislikes: number;
  comments: Array<any>;
}
const Page = ({ params }: { params: { id: string } }) => {
  const [papers, setPapers] = useState<ResearchPaper[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 
  // const socket: Socket = io("http://localhost:5000");

  
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

    fetchPapers();
  }, []); // Dependency array includes params.id to refetch when it changes

  // Handle loading and error states

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching papers: {error}</div>;

  const paper = papers?.find((p: ResearchPaper) => p.id.toString() === params.id);
  if (!paper) return <div>Paper not found</div>;


  const handleLike = (paperId: number) => {
    // socket.emit("likePost", paperId);
  };

  const handleDislike = (paperId: number) => {
    // socket.emit("dislikePost", paperId);
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
          - {paper?.authorName} {/* Adjusted to match the JSON structure */}
        </div>
        <div>
        <div className="grid grid-cols-2  gap-4 sm:flex flex-row justify-between mt-4 w-full sm:w-auto">
            <Button
               variant={"ghost"}
              className="flex border border-black mb-4 md:mb-0 gap-1 transform transition-transform duration-200 hover:scale-125"
              
              onClick={() => {
                // onLike(id)
                toast.info("You liked!", {
                  duration: 1000,
                  position: "top-right",
                });
              }}
            >
              <ThumbsUpIcon size={16} />
              <span className="ml-1">{0}</span> {/* Display the count */}
            </Button>

            {/* Thumbs Down Button */}
            <Button
               variant={"ghost"}
              className="flex border border-black mb-4 md:mb-0 gap-1 transform transition-transform duration-200 hover:scale-125"
              onClick={() => {
                // onDislike(id)
                toast.info("you disliked!", {
                  duration: 1000,
                  position: "top-right",
                });
              }}
            >
              <ThumbsDownIcon size={16} />
              <span className="ml-1">{0}</span> {/* Display the count */}
            </Button>

            {/* views Button */}
            <Button
               variant={"ghost"}
              className="flex border border-black mb-4 md:mb-0 gap-1 transform transition-transform duration-200 hover:scale-125"
            >
              <EyeIcon size={16} />
              <span className="ml-1">{0}</span>
              {/* Display the comment count */}
            </Button>

            {/* Comments Button */}
            <Button
               variant={"ghost"}
              className="flex border border-black mb-4 md:mb-0 gap-1 transform transition-transform duration-200 hover:scale-125"
            >
              <MessageSquareCode size={16} />
              <span className="ml-1">{0}</span>{" "}
              {/* Display the comment count */}
            </Button>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full mt-4 sm:w-auto">Create comment</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Comment</DialogTitle>
              <DialogDescription>
                <CommentForm />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Page;
