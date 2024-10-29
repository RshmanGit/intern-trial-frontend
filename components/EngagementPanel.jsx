import React from "react";
import { Button } from "./ui/button";
import {
  ThumbsUpIcon,
  ThumbsDownIcon,
  MessageCircleMoreIcon,
  Eye,
} from "lucide-react";

const EngagementPanel = ({ views, likes, dislikes, comments }) => {
  return (
    <div className="flex gap-2 items-center">
      <Button
        size={"icon"}
        variant={"ghost"}
        className={`gap-1 transform transition-transform duration-200 hover:scale-125`}
      >
        <ThumbsUpIcon size={16} />
        {likes}
      </Button>
      <Button
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
        className="gap-1 transform transition-transform duration-200 hover:scale-125"
      >
        <MessageCircleMoreIcon size={16} />
        {comments}
      </Button>
      <div className="self-center flex items-center gap-1 text-sm">
        <Eye size={16} />
        {views}
      </div>
    </div>
  );
};

export default EngagementPanel;
