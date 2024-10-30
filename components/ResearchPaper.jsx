"use client";
import React from "react";
import { toast } from "sonner";
import {
  ThumbsDownIcon,
  ThumbsUpIcon,
  EyeIcon,
  MessageCircleMore,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";


const ResearchPaper = ({  id,
  title,
  author,
  views,
  likes,
  dislikes,
  numberOfComments,
  description,
  onLike,
  onDislike,}) => {
  return (
    <>
      <Card className="m-5 p-4 shadow-sm rounded-lg bg-white ">
        <Link href={`/research-paper/${id}`}>
          <CardHeader>
          
            
          
            <h2 className="text-lg md:text-xl font-semibold line-clamp-3">{title}</h2>{" "}
            <p className="text-sm italic text-gray-500">
              {author}
              {/* Using author prop */}
            </p>{" "}
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>{" "}
          </CardContent>
        </Link>
        <CardFooter>
        <div className="flex gap-2 flex-wrap md:justify-between">
      <Button
      onClick={()=>{onLike(id)}}
        size={"icon"}
        variant={"ghost"}
        className={`gap-1 transform transition-transform duration-200 hover:scale-125`}
      >
        <ThumbsUpIcon size={16} />
        {likes}
      </Button>
      <Button
      onClick={()=>{onDislike(id)}}
        size={"icon"}
        variant={"ghost"}
        className={`gap-1 transform transition-transform duration-200 hover:scale-125`}
      >
        <ThumbsDownIcon size={16} />
        {dislikes}
      </Button>
      <Button
        size={"icon"}
        variant={"ghost"}
        className="transform transition-transform duration-200 hover:scale-125 "
      >
        <MessageCircleMore size={16} />
        {numberOfComments}
      </Button>
      <div className="self-center flex items-center gap-1 text-sm">
        <EyeIcon size={16} />
        {views}
      </div>
    </div>
          
        </CardFooter>
      </Card>
    </>
  );
};
export default ResearchPaper;
