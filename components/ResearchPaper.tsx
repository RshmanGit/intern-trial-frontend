import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from './ui/button';
import {ThumbsUpIcon,ViewIcon} from 'lucide-react'

const ResearchPaper = () => {
  return (
    <>
        <Card className='m-5'>
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


                <p className='text-sm italic'> -Author Name </p>
                <div>
                <Button variant={
                'outline'
            }>
                0
                <ThumbsUpIcon size={16} />
                
            </Button>
            <Button variant={
                'outline'
            }>
                0
                <ViewIcon size={16} />  
            </Button>
                </div>
            </CardFooter>
        </Card>
</>
  )
}

export default ResearchPaper
