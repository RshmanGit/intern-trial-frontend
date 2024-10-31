"use client";
import React from "react";
import { toast } from "sonner";
import {
  ThumbsDownIcon,
  ThumbsUpIcon,
  Eye,
  MessageCircleMore,
  Flame
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "./ui/button";
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
            <h2 className="text-lg md:text-xl font-semibold line-clamp-3">{title}</h2>
            <p className="text-sm italic text-gray-500">
              {author}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>{" "}
          </CardContent>
        </Link>
          <CardFooter>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between mt-4">
          <div className="grid grid-cols-2  gap-4 sm:flex flex-row justify-between mt-4 w-full sm:w-auto">
            <Button
              size={"icon"}
              variant={"ghost"}
              className={`gap-1 transform transition-transform duration-200 hover:scale-125`}
              onClick={() => {
                onLike(id);
                toast.info("You liked!", {
                  duration: 1000,
                  position: "top-right",
                });
              }}
            >
              <ThumbsUpIcon size={16} />
              <span className="ml-1">{likes}</span>
            </Button>
            <Button
              size={"icon"}
              variant={"ghost"}
              className={`gap-1 transform transition-transform duration-200 hover:scale-125`}
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
            <Button
              size={"icon"}
              variant={"ghost"}
              className={`gap-1 transform transition-transform duration-200 hover:scale-125`}
            >
              <Eye size={16} />
              <span className="ml-1">{views}</span>
            </Button>
            <Button
              size={"icon"}
              variant={"ghost"}
              className={`gap-1 transform transition-transform duration-200 hover:scale-125`}
            >
              <MessageCircleMore size={16} />
              <span className="ml-1">{numberOfComments}</span>
            </Button>
            <Button
              size={"icon"}
              variant={"ghost"}
              className={`gap-1 transform transition-transform duration-200 hover:scale-125`}
            >
              <Flame size={16} />
              <div>{likes-dislikes+numberOfComments}</div>
            </Button>
            
          </div>
        </div>
        </CardFooter>
      </Card>
    </>
  );
};
export default ResearchPaper;
