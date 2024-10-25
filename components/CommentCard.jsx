import { Card} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/card";

export default function CommentCard({ name, comment }) {
  return (
    <Card className="w-1/2 mb-4 shadow-sm m-4">
      <div className="flex items-center space-x-2 p-4 border-b">
      Name:
        <h4 className="font-semibold">{name}</h4>
      </div>
      <div className="p-4">
      Comment :
        <p className="text-gray-700">{comment}</p>
      </div>
    </Card>
  );
}
