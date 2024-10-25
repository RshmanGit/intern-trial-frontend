import { useState } from "react";
import { Input, Textarea } from "@shadcn/ui"; // Adjust if needed
import Button from "../ui/Button"; // Adjust path to your button

export default function CommentForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ name, comment });
    }
    setName("");
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-50 rounded-lg shadow-md">
      <Input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4"
      />
      <Textarea
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="mb-4"
      />
      <Button type="submit">Post Comment</Button>
    </form>
  );
}
