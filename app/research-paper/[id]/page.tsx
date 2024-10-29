'use client'
import React, { useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";
import { useResearchPaper } from '@/app/ResearchPaperContext';
import ButtonGroup from '@/components/ButtonGroup';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import CommentForm from '@/components/CommentFrom';// Adjust the import path
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// interface ResearchPaper {
//   id: string; // Adjust according to your actual API structure
//   title: string;
//   description: string;
//   authorName: string; // Use the correct key based on your API response
//   views: number;
//   likes: number;
//   dislikes: number;
//   comments: Array<any>;
// }

const Page = ({ params }: { params: { id: string } }) => {
  // const [paper, setPaper] = useState<ResearchPaper | null>(null);
  const { papers } = useResearchPaper();
  const paper = papers.find(p => p.id.toString() === params.id); 
  if (!paper) return <div>Paper not found</div>;
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState<string | null>(null); 
  const socket: Socket = io("http://localhost:5000");        // State to manage error

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        // const response = await fetch(`https://r4b85zv7-8000.inc1.devtunnels.ms/api/v1/researchPaper/${params.id}`, {
        //   method: 'GET',
        // });
        const paper = papers.find(p => p.id.toString() === params.id); 

        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }

        // const data: ResearchPaper = await response.json();
        // setPaper(data); // Set the fetched paper data
      } catch (error) {
        setError((error as Error).message); // Set the error state
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchPaper();
  }, [params.id]); // Dependency array includes params.id to refetch when it changes

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching paper: {error}</div>;
  const handleLike = (paperId: string) => {
    socket.emit("likePost", paperId);
  };

  const handleDislike = (paperId: string) => {
    socket.emit("dislikePost", paperId);
  };
  return (
    <>
      <Card className='m-3 flex flex-col p-3 gap-5'>
        <div className='flex justify-center text-3xl text-wrap font-bold text-slate-800'>
          {paper?.title}
        </div>
        <div className='flex text-sm justify-self'>
          
{paper?.author}
        </div>
        <div className='text-wrap text-justify text-lg'>
          {paper?.description}
        </div>
        <div>
          <ButtonGroup 
            views={paper?.views} 
            likes={paper?.likes} 
            dislikes={paper?.dislikes} 
            comments={0} 
            onLike={() => handleLike(paper?.id)} // Pass the like handler
            onDislike={() => handleDislike(paper?.id)} // Pass the dislike handler// Use paper.comments.length for comments 
          />
        </div>
        <div className='py-3'>
          Comments : {paper?.comments.length}
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
      </Card>
    </>
  );
};

export default Page;
