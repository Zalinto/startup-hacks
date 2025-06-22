"use client";

import { AppSidebar, SidebarItem } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  CaretLeftIcon,
  ClipboardTextIcon,
  HouseIcon,
  LightbulbIcon,
  MegaphoneIcon,
  QuestionIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getProjectDetailQuery, getProjectsQuery } from "./queries";
import { useParams } from "next/navigation";

function DashboardSidebar() {
  const params = useParams();

  const projectId = params.id as string | undefined;

  const projectDetail = useQuery(getProjectDetailQuery(projectId));
  const recentProjects = useQuery(getProjectsQuery);

  const mainItems = useMemo<SidebarItem[]>(
    () => [
      {
        title: "Projects",
        url: "/dashboard/projects",
        icon: ClipboardTextIcon,
        items: recentProjects.data?.map(
          (project: { title: any; project_id: any }) => ({
            title: project.title,
            url: `/dashboard/projects/${project.project_id}`,
          })
        ),
      },
    ],
    [recentProjects.data]
  );

  const projectDetailItems = useMemo<SidebarItem[]>(() => {
    if (!projectDetail.data) return [];
    return [
      {
        title: "All Projects",
        icon: CaretLeftIcon,
        url: "/dashboard/projects",
        matcher: () => false,
      },
      {
        title: projectDetail.data.title,
        url: `/dashboard/projects/${projectDetail.data.project_id}/brainstorming`,
        icon: ClipboardTextIcon,
        matcher: () => false,
        items: [
          {
            icon: LightbulbIcon,
            title: "Brainstorming",
            url: `/dashboard/projects/${projectDetail.data.project_id}/brainstorming`,
          },
          {
            icon: MegaphoneIcon,

            title: "Outreach",
            url: `/dashboard/projects/${projectDetail.data.project_id}/outreach`,
          },
          {
            icon: QuestionIcon,
            title: "Customer Support",
            url: `/dashboard/projects/${projectDetail.data.project_id}/support`,
          },
        ],
      },
    ];
  }, [projectDetail.data]);

  return <AppSidebar items={projectId ? projectDetailItems : mainItems} />;
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
