"use client";
import React from "react";
import { toast } from "sonner";
import {
  ThumbsDownIcon,
  ThumbsUpIcon,
  EyeIcon,
  MessageSquareCode,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CommentForm from "./CommentFrom";
import Link from "next/link";
const ResearchPaper = ({
  id,
  title,
  author,
  views,
  likes,
  dislikes,
  numberOfComments,
  description,
  onLike,
  onDislike,
}) => {
  return (
    <>
      <Card className="m-5 p-4 shadow-lg rounded-lg bg-white hover:custom-blue-shadow transition-shadow duration-300 max-w-[60%] mx-auto">
        <Link href={`/research-paper/${id}`}>
          <CardHeader>
          <h2>
            Score: <strong>{2 * likes - dislikes}</strong>
          </h2>
            <h2 className="text-lg md:text-xl font-semibold line-clamp-3">{title}</h2>{" "}
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>{" "}
          </CardContent>
        </Link>
        <div>
          <CardFooter>
            <p className="text-sm italic text-gray-500 flex-1"> -{author} </p>{" "}
          </CardFooter>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between mt-4">
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
          <div className="grid grid-cols-2  gap-4 sm:flex flex-row justify-between mt-4 w-full sm:w-auto">
            <Button
              variant={"ghost"}
              className="flex border border-black mb-4 md:mb-0 transform transition-transform duration-200 hover:scale-125"
              onClick={() => {
                onLike(id);
                toast.info("You liked!", {
                  duration: 1000,
                  position: "top-right",
                });
              }}
            >
              <ThumbsUpIcon size={16} />
              <span className="ml-1">{likes}</span> {/* Display the count */}
            </Button>

            {/* Thumbs Down Button */}
            <Button
              variant={"ghost"}
              className="flex border border-black mb-4 md:mb-0 transform transition-transform duration-200 hover:scale-125"
              onClick={() => {
                onDislike(id);
                toast.info("you disliked!", {
                  duration: 1000,
                  position: "top-right",
                });
              }}
            >
              <ThumbsDownIcon size={16} />
              <span className="ml-1">{dislikes}</span> {/* Display the count */}
            </Button>

            {/* views Button */}
            <Button
              variant={"ghost"}
              className="flex border border-black mb-4 md:mb-0 transform transition-transform duration-200 hover:scale-125"
            >
              <EyeIcon size={16} />
              <span className="ml-1">{views}</span>
              {/* Display the comment count */}
            </Button>

            {/* Comments Button */}
            <Button
              variant={"ghost"}
              className="flex border border-black mb-4 md:mb-0 transform transition-transform duration-200 hover:scale-125"
            >
              <MessageSquareCode size={16} />
              <span className="ml-1">{numberOfComments}</span>{" "}
              {/* Display the comment count */}
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};
export default ResearchPaper;
