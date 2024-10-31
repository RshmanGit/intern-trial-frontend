import { Card} from "@/components/ui/card";
export default function CommentCard({ name, comment }) {
  return (
    <Card className="m-5 p-4 shadow-lg rounded-lg bg-white sm:p-6 lg:p-84">
      <div className="flex items-center space-x-2 p-4 border-b">
      Name:<h4 className="font-semibold">{ name}</h4>
      </div>
      <div className="p-4">
      Comment :<p className="text-gray-700">{comment}</p>
      </div>
    </Card>
  );
}
