import { Input } from "@/components/ui/input";

export default function BrainstormingChat() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {/* Chat messages will go here */}
        <p>Chat messages will be displayed here.</p>
      </div>
      <div className="p-4 border-t">
        {/* Chat input will go here */}
        <Input type="text" placeholder="Type your message..." />
      </div>
    </div>
  );
}
