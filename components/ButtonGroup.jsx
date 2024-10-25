'use client'
import { ThumbsDownIcon, ThumbsUpIcon, ViewIcon,MessageSquareCode } from "lucide-react";
// Adjust the import based on your setup
import { Button } from "@/components/ui/button";
const ButtonGroup = () => {
  return (
    <div className="flex items-center space-x-4"> {/* Use Tailwind CSS for spacing */}
      {/* Thumbs Up Button */}
      <Button variant="outline" className="flex items-center">
        <ThumbsUpIcon size={16} />
        <span className="ml-1">0</span> {/* Display the count */}
      </Button>
      
      {/* Thumbs Down Button */}
      <Button variant="outline" className="flex items-center">
        <ThumbsDownIcon size={16} />
        <span className="ml-1">0</span> {/* Display the count */}
      </Button>
      
      {/* views Button */}
      <Button variant="outline" className="flex items-center">
        <ViewIcon size={16} />
        <span className="ml-1">0</span> {/* Display the comment count */}
        </Button>
        {/* Comments Button */}
      <Button variant="outline" className="flex items-center">
        <MessageSquareCode size={16} />
        <span className="ml-1">0</span> {/* Display the comment count */}
      </Button>
    </div>
  );
};

export default ButtonGroup;
