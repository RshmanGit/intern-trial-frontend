import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { ThumbsUpIcon, ViewIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentFrom";
import ButtonGroup from "./ButtonGroup";
const ResearchPaper = ({ name, description, author }) => {
    console.log("Props received:", { name, description, author });
  return (
    <>
      <Card className="m-5">
      <CardHeader>
        <h2 className="text-lg font-semibold">{name}</h2> {/* Using name prop */}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p> {/* Using description prop */}
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm italic"> - {author} </p> {/* Using author prop */}
        <div>
          <ButtonGroup />
        </div>
      </CardFooter>
        <div className="m-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create comment</Button>
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
        </div>
      </Card>
    </>
  );
};

export default ResearchPaper;
