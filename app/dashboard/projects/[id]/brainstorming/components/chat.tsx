import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

export default function BrainstormingChat() {
  return (
    <div className="flex flex-col h-full max-h-screen bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        <div className="self-end max-w-xs p-3 bg-blue-100 rounded-xl shadow-sm">
          <p className="text-sm text-gray-800">User message example</p>
        </div>
      </div>

      {/* Input area */}
      <div className="border-t bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Type your message..."
            className="flex-1 rounded-xl px-4 py-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <Button size="icon" className="rounded-full p-2">
            <SendHorizonal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
