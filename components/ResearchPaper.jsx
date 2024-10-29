import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import EngagementPanel from "./EngagementPanel";

const ResearchPaper = (paper) => {
  return (
    <>
      <Card className="shadow-sm p-2 rounded-lg bg-white hover:custom-grey-shadow transition-shadow duration-300">
        <Link href={`/research-paper/${paper.id}`}>
          <CardHeader>
            <h2 className="text-lg md:text-xl font-semibold line-clamp-3">
              {paper.title}
            </h2>{" "}
            {/* Using title prop */}
            <p className="text-sm italic text-gray-500">
              {paper.author}
              {/* Using author prop */}
            </p>{" "}
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 line-clamp-2">
              {paper.description}
            </p>{" "}
            {/* Using description prop */}
          </CardContent>
        </Link>
        <CardFooter>
          <EngagementPanel
            views={paper.views}
            likes={paper.likes}
            dislikes={paper.dislikes}
            comments={paper.comments}
          />
        </CardFooter>
      </Card>
    </>
  );
};
export default ResearchPaper;
