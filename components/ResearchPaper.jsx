import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
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
      <Card className="shadow-sm p-2 rounded-lg bg-white hover:custom-grey-shadow transition-shadow duration-300">
        <Link href={`/research-paper/${paper.id}`}>
          <CardHeader>
            <h2 className="text-lg md:text-xl font-semibold line-clamp-3">
              {paper.title}
            </h2>{" "}
            {/* Using title prop */}
            <p className="text-sm italic text-gray-500">
              {paper.author}
              {/* Using author prop */}
            </p>{" "}
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 line-clamp-2">
              {paper.description}
            </p>{" "}
            {/* Using description prop */}
          </CardContent>
        </Link>
        <CardFooter>
          <div>
          <div className="flex gap-2 items-center">
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
        className="gap-1 transform transition-transform duration-200 hover:scale-125"
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
