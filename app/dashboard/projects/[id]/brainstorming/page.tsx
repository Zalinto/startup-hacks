"use client";

import { api } from "@/app/providers";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header";
import {
  ChatDotsIcon,
  FloppyDiskBackIcon,
  LightbulbIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useActiveProject } from "../hooks";
import BrainstormingChat, { Message } from "./components/chat";
import BrainstormingSummary from "./components/summary";

export default function ProjectBrainstorming() {
  const params = useParams();

  const project = useActiveProject();

  const [messages, setMessages] = useState<Message[]>([]);
  const [summary, setSummary] = useState<{
    summary: string;
    prd: any;
    styleGuide: any;
  } | null>(null);

  const [isBrainstorming, setIsBrainstorming] = useState(true);

  const summarizeMutation = useMutation({
    mutationFn: async (messages: Message[]) => {
      const megaMessage = messages
        .map((msg) => `Sender: ${msg.sender}\nMessage: ${msg.message}`)
        .join("\n\n---\n\n");

      const response = await api.post<{
        summary: string;
        prd: any;
        styleGuide: any;
      }>("groq/summary", {
        message: megaMessage,
      });
      setSummary(response.data);
    },
  });

  return (
    <>
      <PageHeader
        title={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                {project.data?.title ?? "Loading..."}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="line-clamp-1 font-bold flex gap-2 items-center">
                <LightbulbIcon />
                <span>Brainstorming</span>
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        }
        nav={
          <Button
            onClick={async () => {
              if (isBrainstorming) {
                await summarizeMutation.mutateAsync(messages);
                setIsBrainstorming(false);
              } else {
                setIsBrainstorming(true);
                setMessages([]);
              }
            }}
            variant={"outline"}
            disabled={
              summarizeMutation.isPending ||
              (isBrainstorming && messages.length === 0)
            }
          >
            {isBrainstorming ? (
              <>
                <FloppyDiskBackIcon />
                End Session
              </>
            ) : (
              <>
                <ChatDotsIcon />
                Start Brainstorming
              </>
            )}
          </Button>
        }
      />
      {isBrainstorming && (
        <BrainstormingChat messages={messages} setMessages={setMessages} />
      )}
      {!isBrainstorming && summary && (
        <BrainstormingSummary
          summary={summary.summary}
          prd={summary.prd}
          styleGuide={summary.styleGuide}
        />
      )}
    </>
  );
}
