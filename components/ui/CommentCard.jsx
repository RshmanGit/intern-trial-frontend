import { Card, CardHeader, CardBody } from "@shadcn/ui"; // Adjust as needed
import { Avatar } from "@radix-ui/react-icons";
import "../ui/Button"; // Import any other reusable UI components if needed

export default function CommentCard({ name, comment }) {
  return (
    <Card className="mb-4 shadow-sm">
      <CardHeader className="flex items-center space-x-2 p-4 border-b">
        <Avatar className="text-gray-500" />
        <h4 className="font-semibold">{name}</h4>
      </CardHeader>
      <CardBody className="p-4">
        <p className="text-gray-700">{comment}</p>
      </CardBody>
    </Card>
  );
}
