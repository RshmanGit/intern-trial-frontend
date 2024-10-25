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
const ResearchPaper = () => {
  return (
    <>
      <Card className="m-5">
        <CardHeader>
          <h2 className="text-lg font-semibold">Paper Title</h2>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
            vehicula, turpis et pretium scelerisque, mi metus lacinia nunc, in
            ultrices felis odio sit amet elit.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm italic"> -Author Name </p>
          <div>
            <ButtonGroup></ButtonGroup>
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
