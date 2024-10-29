'use client'
import { ThumbsDownIcon, ThumbsUpIcon, EyeIcon,MessageSquareCode } from "lucide-react";
// Adjust the import based on your setup
import { Button } from "@/components/ui/button";
import {toast} from "sonner";
const ButtonGroup = ({likes,dislikes,views,comments,onLike, onDislike}) => {
  return (
    <div className="grid grid-cols-2  gap-4 sm:flex flex-row justify-between mt-4 w-full sm:w-auto"> {/* Use Tailwind CSS for spacing */}
      {/* Thumbs Up Button */}
      <Button variant="outline" className="flex border border-black mb-4 md:mb-0" 
      onClick={() => { 
      onLike();
      toast.info("You liked!", { duration: 1000,position: 'top-right'}); 
      }}>
        <ThumbsUpIcon size={16} />
        <span className="ml-1">{likes}</span> {/* Display the count */}
      </Button>
      
      {/* Thumbs Down Button */}
      <Button variant="outline" className="flex border border-black mb-4 md:mb-0" 
      onClick={() =>{
        onDislike();
        toast.info("you disliked!",{duration:1000,position: 'top-right'})
        }}>
        <ThumbsDownIcon size={16} />
        <span className="ml-1">{dislikes}</span> {/* Display the count */}
      </Button>
      
      {/* views Button */}
      <Button variant="outline" className="flex border border-black mb-4 md:mb-0">
        <EyeIcon size={16} />
        <span className="ml-1">{views}</span> {/* Display the comment count */}
        </Button>
        {/* Comments Button */}
      <Button variant="outline" className="flex border border-black mb-4 md:mb-0">
        <MessageSquareCode size={16} />
        <span className="ml-1">{comments}</span> {/* Display the comment count */}
      </Button>
    </div>
  );
};

export default ButtonGroup;
