"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PageHeader from "@/components/ui/page-header";
import {
  ChatDotsIcon,
  FloppyDiskBackIcon,
  LightbulbIcon,
  PenIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useActiveProject } from "../hooks";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import BrainstormingChat, { Message } from "./components/chat";
import BrainstormingSummary from "./components/summary";
import { useFetchProjectDetails } from "@/queryClients/useFetchProjectDetails";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/app/providers";

export default function ProjectBrainstorming() {
  const params = useParams();
  const project_id = params.id as string;
  const { user } = useUser();

  const project = useActiveProject();

  const [messages, setMessages] = useState<Message[]>([]);
  const [summary, setSummary] = useState<string>("");

  const [isBrainstorming, setIsBrainstorming] = useState(true);

  const summarizeMutation = useMutation({
    mutationFn: async (messages: Message[]) => {
      const megaMessage = messages
        .map((msg) => `Sender: ${msg.sender}\nMessage: ${msg.message}`)
        .join("\n\n---\n\n");

      const response = await api.post<string>("groq/summary", {
        message: megaMessage,
      });
      setSummary(response.data);
      // return summary.data
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
            disabled={summarizeMutation.isPending}
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
      {!isBrainstorming && <BrainstormingSummary summary={summary} />}
    </>
  );
}
