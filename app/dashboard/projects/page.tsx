"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import PageHeader from "@/components/ui/page-header";
import { PlusIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { getProjectsQuery, Project } from "./queries";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/dashboard/projects/${project.id}`}>
      <Card className="hover:border-accent-foreground">
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>
            {format(project.created_at, "MM/dd/yyyy")}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default function MyProjects() {
  const projects = useQuery(getProjectsQuery);
  return (
    <>
      <PageHeader
        title={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbPage className="line-clamp-1 font-bold">
                My Projects
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        }
        nav={
          <Button onClick={() => alert("TODO: start a new untitled project")}>
            <PlusIcon /> Start New
          </Button>
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {projects.data?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
