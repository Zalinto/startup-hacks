import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  QuestionIcon,
  ChartLineUpIcon,
  LightbulbIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { api } from "@/app/providers";

export type MessageSender =
  | "user"
  | "agent_clarify"
  | "agent_swot"
  | "agent_sanity";
export type Message = {
  id: string;
  message: string;
  sender: MessageSender;
};

function ChatMessage({
  message,
  sender,
}: {
  message: string;
  sender: MessageSender;
}) {
  const senderStyles = {
    user: "bg-primary text-primary-foreground",
    agent_clarify: "bg-blue-500 text-white dark:bg-blue-700",
    agent_swot: "bg-amber-500 text-white dark:bg-amber-700",
    agent_sanity: "bg-purple-500 text-white dark:bg-purple-700",
  };

  const senderLabels = {
    user: "You",
    agent_clarify: "Clarify Agent",
    agent_swot: "SWOT Agent",
    agent_sanity: "Idea Agent",
  };

  const senderIcons = {
    user: <UserIcon size={16} />,
    agent_clarify: <QuestionIcon size={16} />,
    agent_swot: <ChartLineUpIcon size={16} />,
    agent_sanity: <LightbulbIcon size={16} />,
  };

  return (
    <div
      className={`flex flex-col gap-1 ${
        sender === "user" ? "items-end" : "items-start"
      } max-w-[80%] ${sender === "user" ? "ml-auto" : ""}`}
    >
      <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
        {senderIcons[sender]}
        <span>{senderLabels[sender]}</span>
      </div>
      <div
        className={`p-3 rounded-lg ${senderStyles[sender]} max-w-full prose-sm`}
      >
        <ReactMarkdown className="text-sm">{message}</ReactMarkdown>
      </div>
    </div>
  );
}

async function callAgent(message: string, agent: string) {
  return (await api.post<string>(`groq/${agent}-chat`, { message })).data;
}

async function callAgentTeam(message: string) {
  const responses = await Promise.all([
    callAgent(message, "clarify"),
    callAgent(message, "swot"),
    callAgent(message, "sanity"),
  ]);

  const senders = ["agent_clarify", "agent_swot", "agent_sanity"] as const;

  return responses.map<Message>((response, i) => ({
    id: crypto.randomUUID(),
    message: response,
    sender: senders[i],
  }));
}

export default function BrainstormingChat({
  messages,
  setMessages,
}: {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        message: newMessage.trim(),
        sender: "user",
      };
      setMessages([...messages, message]);
      setNewMessage("");
      callAgentTeam(newMessage.trim()).then((responses) => {
        setMessages((prevMessages) => [...prevMessages, ...responses]);
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full border-y overflow-hidden">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.message}
            sender={message.sender}
          />
        ))}
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 p-4 border-t bg-card">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
