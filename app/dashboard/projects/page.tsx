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
import { getProjectsQuery, Project } from "../queries";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useFetchProjects } from "@/queryClients/useFetchProjects";
import { useUser } from "@clerk/nextjs";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/dashboard/projects/${project.project_id}`}>
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
  const { user } = useUser();

  const { projects, addProject } = useFetchProjects(user?.id ?? "");

  const [projectName, setProjectName] = useState("");
  const [open, setOpen] = useState(false);

  const handleCreateProject = () => {
    addProject({ title: projectName });
    setProjectName("");
    setOpen(false);
  };

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
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button variant={"outline"}>
                <PlusIcon /> Start New
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Start New Project</AlertDialogTitle>
                <AlertDialogDescription>
                  Enter a name for your new project.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Input
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  onClick={handleCreateProject}
                  disabled={!projectName.trim()}
                >
                  Create
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {projects.data?.map((project: Project) => (
          <ProjectCard key={project.project_id} project={project} />
        ))}
      </div>
    </>
  );
}
