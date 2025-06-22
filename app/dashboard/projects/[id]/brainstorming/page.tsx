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
import BrainstormingChat from "./components/chat";
import BrainstormingSummary from "./components/summary";
import { useAuth } from "@clerk/nextjs";

export default function ProjectBrainstorming() {
  const project = useActiveProject().data;
  const [isBrainstorming, setIsBrainstorming] = useState(true);
  const auth = useAuth();
  return (
    <>
      <PageHeader
        title={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>{project?.title ?? "Loading..."}</BreadcrumbItem>
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
            onClick={() => setIsBrainstorming(!isBrainstorming)}
            variant={"outline"}
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
      {isBrainstorming && <BrainstormingChat />}
      {!isBrainstorming && <BrainstormingSummary />}
    </>
  );
}
