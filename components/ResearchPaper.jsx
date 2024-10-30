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
import EngagementPanel from "./EngagementPanel";
import {
  ThumbsUpIcon,
  ThumbsDownIcon,
  MessageCircleMoreIcon,
  Eye,
} from "lucide-react";

const ResearchPaper = (paper) => {
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
        <CardFooter>
          <div>
          <div className="flex gap-2  items-center">
      <Button
        size={"icon"}
        variant={"ghost"}
        className={`gap-1 transform transition-transform duration-200 hover:scale-125`}
      >
        <ThumbsUpIcon size={16} />
        {paper.likes}
      </Button>
      <Button
        size={"icon"}
        variant={"ghost"}
        className={`gap-1 transform transition-transform duration-200 hover:scale-125`}
      >
        <ThumbsDownIcon size={16} />
        {paper.dislikes}
      </Button>
      <Button
        size={"icon"}
        variant={"ghost"}
        className="transform transition-transform duration-200 hover:scale-125 grid grid-cols-2  gap-4 sm:flex flex-row justify-between mt-4 w-full sm:w-auto"
      >
        <MessageCircleMoreIcon size={16} />
        {paper.comments}
      </Button>
      <div className="self-center flex items-center gap-1 text-sm">
        <Eye size={16} />
        {paper.views}
      </div>
    </div>
          </div>
          
        </CardFooter>
      </Card>
    </>
  );
};
export default ResearchPaper;
