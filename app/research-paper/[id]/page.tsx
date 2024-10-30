'use client'
import React, { useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";
import { useResearchPaper } from '@/app/ResearchPaperContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CommentForm from '@/components/CommentFrom';
import { ThumbsUpIcon, ThumbsDownIcon, MessageCircleMoreIcon, Eye } from 'lucide-react';
// import { Button } from "./ui/button";
type Engagements= {
  views: number;
  likes: number;
  dislikes: number;
  comments: number;
  onLike: () => void;
  onDislike: () => void;
}
const Page = ({ params }: { params: { id: string } }) => {
  const { papers } = useResearchPaper();
  const paper = papers.find(p => p.id.toString() === params.id); 
  if (!paper) return <div>Paper not found</div>;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 
  const socket: Socket = io("http://localhost:5000");

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        // Simulate fetch and populate `paper` data if not found in context
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaper();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching paper: {error}</div>;

  const handleLike = (paperId: string) => {
    socket.emit("likePost", paperId);
  };

  const handleDislike = (paperId: string) => {
    socket.emit("dislikePost", paperId);
  };

  return (
    <div className="flex flex-col items-center  h-full">
      <div className="flex flex-col gap-4 w-4/5 sm:w-2/3 bg-white p-5 shadow h-full">
        <div className='flex flex-col gap-2'>
          <h2 className="text-lg md:text-4xl font-semibold">{paper.title}</h2>
          <p className="text-md italic text-gray-500">{paper.author}</p>
        </div>
        
        <div>
          <p className="text-gray-800 text-lg mb-4 m-5 text-pretty">{paper.description}</p>
          
        </div>
        <div className="flex gap-2 items-center">
      <Button size={"sm"}
        variant={"ghost"}
        className={`gap-1 transform transition-transform duration-200 hover:scale-125`}
      >
        <ThumbsUpIcon size={16} />
        {paper.likes}
      </Button>
      <Button
        size={"sm"}
        variant={"ghost"}
        className={`gap-1 transform transition-transform duration-200 hover:scale-125`}
      >
        <ThumbsDownIcon size={16} />
        {paper.dislikes}
      </Button>
      <Button
        size={"sm"}
        variant={"ghost"}
        className="gap-1 transform transition-transform duration-200 hover:scale-125"
      >
        <MessageCircleMoreIcon size={16} />
        {paper.comments.length}
      </Button>
      <div className="self-center flex items-center gap-1 text-sm">
        <Eye size={16} />
        {paper.views}
      </div>
    </div>
          <div>
            <div className='text-md'>Comments : {paper.comments.length}</div>
            {paper.comments.map((comment,idx) => (
              <div key={idx} className="mt-4">
                <div >
                  <p>{comment.text}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">-{comment.name}</p>
                  <hr/>
                </div>
              </div>
            ))}
          </div>

        <div className="flex justify-start">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={'outline'} className="w-full mt-4 sm:w-auto">Create comment</Button>
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
      </div>
    </div>
  );
};

export default Page;
