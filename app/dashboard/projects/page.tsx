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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProjectsQuery, Project } from "../queries";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { z } from "zod/v4";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/app/providers";
import { toast } from "sonner";

const newProjectSchema = z.object({
  project_name: z.string().min(1, "Title is required"),
});

function StartNewDialog() {
  const form = useForm<z.infer<typeof newProjectSchema>>({
    resolver: standardSchemaResolver(newProjectSchema),
    defaultValues: {
      project_name: "",
    },
  });

  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: async (data: z.infer<typeof newProjectSchema>) => {
      await api.post("/project", data);
    },
    onSuccess: () => {
      toast.success("Project created successfully!");
      queryClient.invalidateQueries({
        queryKey: getProjectsQuery.queryKey,
      });
    },
  });

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      form.reset();
    }
  }, [open]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"}>
          <PlusIcon />
          Start New
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Start New Campaign</AlertDialogTitle>
          <AlertDialogDescription>
            Begin a new outreach campaign to grow your userbase.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (data) => {
              await createMutation.mutateAsync(data);
              setOpen(false);
            })}
          >
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="project_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Exciting New Feature" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter className="">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  type="submit"
                  disabled={
                    !form.formState.isValid || form.formState.isSubmitting
                  }
                >
                  Create
                </Button>
              </AlertDialogFooter>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

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
        nav={<StartNewDialog />}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {projects.data?.map((project) => (
          <ProjectCard key={project.project_id} project={project} />
        ))}
      </div>
    </>
  );
}
