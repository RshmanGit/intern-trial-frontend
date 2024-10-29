import React from "react";
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
import ButtonGroup from "./ButtonGroup";
import Link from "next/link";
const ResearchPaper = (paper) => {
  return (
    <>
      <Card className="m-5 p-4 shadow-lg rounded-lg bg-white hover:custom-blue-shadow transition-shadow duration-300">
        <Link href={`/research-paper/${paper.id}`}>
        <CardHeader>
          <h2 className="text-lg md:text-xl font-semibold">{paper.title}</h2> {/* Using name prop */}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{paper.description}</p> {/* Using description prop */}
        </CardContent>
        </Link>
        <div>
        <CardFooter>
          <p className="text-sm italic text-gray-500 flex-1"> -{paper.author} </p> {/* Using author prop */}  
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
          <ButtonGroup 
          views={paper.views} 
          likes={paper.likes} 
          comments={paper.comments} 
          dislikes={paper.dislikes}
          onLike={paper.onLike}
          onDislike={paper.onDislike}
          />
        </div>
      </Card>
    </>
  );
};
export default ResearchPaper;
