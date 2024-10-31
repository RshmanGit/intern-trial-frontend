"use client";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
  ThumbsDownIcon,
  ThumbsUpIcon,
  Eye,
  MessageCircleMoreIcon,
  Flame
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CommentForm from "@/components/CommentFrom";
import CommentCard from "@/components/CommentCard"; // Adjust the import path
interface ResearchPaper {
  id: string;
  title: string;
  description: string;
  authorName: string;
  views: number;
  likes: number;
  dislikes: number;
  comments: Comment[];
}
interface Comment {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}
const Page = ({ params }: { params: { id: string } }) => {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const socket: Socket = io('http://localhost:8000');

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/paper`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
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
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/paper/${params.id}/comment`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch comments");
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
        } else {
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

  const paper = papers?.find(
    (p: ResearchPaper) => p.id.toString() === params.id
  );
  console.log(paper);
  if (!paper) return <div>Paper not found</div>;

  const handleLike = (paperId: string) => {
    socket.emit("likePaper", paperId);
  };

  const handleDislike = (paperId: string) => {
    socket.emit("dislikePaper", paperId);
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex flex-col gap-4 w-4/5 sm:w-2/3 bg-white p-5 shadow h-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg md:text-4xl font-semibold">{paper.title}</h2>
          <p className="text-md italic text-gray-500">{paper.authorName}</p>
        </div>

        <div>
          <p className="text-gray-800 text-lg mb-4 m-5 text-pretty">
            {paper.description}
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <div className="grid grid-cols-2  gap-4 sm:flex flex-row justify-between mt-4 w-full sm:w-auto">

            <Button
              size={"sm"}
              variant={"ghost"}
              className={`gap-1 transform transition-transform duration-200 hover:scale-125`}
              onClick={() => {
                handleLike(paper.id);
                toast.info("You liked!", {
                  duration: 1000,
                  position: "top-right",
                });
              }}
            >
              <ThumbsUpIcon size={16} />
              <span className="ml-1">{paper?.likes}</span>
            </Button>
            <Button
              variant={"ghost"}
              className={`gap-1 transform transition-transform duration-200 hover:scale-125`}
              onClick={() => {
                handleDislike(paper.id);
                toast.info("you disliked!", {
                  duration: 1000,
                  position: "top-right",
                });
              }}
            >
              <ThumbsDownIcon size={16} />
              <span className="ml-1">{paper.dislikes}</span>
            </Button>
            <Button
              variant={"ghost"}
              className={`gap-1 transform transition-transform duration-200 hover:scale-125`}
            >
              <Eye size={16} />
              <span className="ml-1">{paper.views}</span>
            </Button>
            <Button
              variant={"ghost"}
              className={`gap-1 transform transition-transform duration-200 hover:scale-125`}
            >
              <MessageCircleMoreIcon size={16} />
              <span className="ml-1">{comments.length}</span>
            </Button>
            <Button
              variant={"ghost"}
              className={`gap-1 transform transition-transform duration-200 hover:scale-125`}
            >
              <Flame size={16} />
              <span className="ml-1">{paper.likes-paper.dislikes+(comments.length)}</span>
            </Button>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-bold">Comments : {comments.length}</h2>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentCard
                key={comment.id}
                name={comment.name}
                comment={comment.content}
              />
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
                <CommentForm paperId={paper.id} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
export default Page;
