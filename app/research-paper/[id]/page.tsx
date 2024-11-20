
import React from 'react'
import { papers } from "../../data/papers";
import ButtonGroup from '@/components/ButtonGroup';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CommentForm from '@/components/CommentFrom';

const Page = ({ params }: { params: { id: string } }) => {
  const paper = papers.find(paper => paper.id === params.id)

  return (
    <>
      <div className='m-3'>
        <div className='flex justify-center text-xl'>
          {paper?.title}
        </div>
        <div>
          {paper?.description}
        </div>
        <div>
          -{paper?.author}
        </div>
        <div>
          <ButtonGroup views={paper?.views} likes={paper?.likes} dislikes={paper?.dislikes} numberOfComments={paper?.numberOfComments} />
        </div>
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

      </div>

    </>
  )
}

export default Page
