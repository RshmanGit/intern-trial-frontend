import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import PaperForm from '@/components/paperForm'
import ResearchPaper from "@/components/ResearchPaper";
import CommentForm from "@/components/CommentFrom";

export default function Home() {
  return (
    <div className="w-full">
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create paper</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Fill paper details</DialogTitle>
              <DialogDescription>
                <PaperForm/>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <ResearchPaper/>
      </div>
    </div>
  );
}
