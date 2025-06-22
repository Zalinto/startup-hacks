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
  LightbulbIcon,
  MegaphoneIcon,
  QuestionIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useActiveProject } from "../hooks";

export default function ProjectBrainstorming() {
  const project = useActiveProject().data;
  return (
    <>
      <PageHeader
        title={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>{project?.title ?? "Loading..."}</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="line-clamp-1 font-bold flex gap-2 items-center">
                <QuestionIcon />
                <span>Customer Support</span>
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />
    </>
  );
}
