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
import FetchPapers from '@/components/FecthPapers'
import {papers} from "./data/papers";

export default function Home() {
  const renderPapers = () => {
    return papers.map((paper) => {
      return (
        <ResearchPaper
          key={paper.id}
          id={paper.id}
          title={paper.title}
          author={paper.author}
          views={paper.views}
          likes={paper.likes}
          dislikes={paper.dislikes}
          numberOfComments={paper.numberOfComments}
          description={paper.description}
        />
      );
    });
  }

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
        {renderPapers()}
      </div>

    </div>
  );
}
