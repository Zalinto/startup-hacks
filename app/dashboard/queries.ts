import { queryOptions } from "@tanstack/react-query";

export type Project = { project_id: string; title: string; created_at: string };

export const getProjectsQuery = queryOptions({
  queryKey: ["projects"],
  queryFn: async () => {
    return [
      {
        project_id: "1",
        title: "My First Project",
        created_at: new Date().toISOString(),
      },
      {
        project_id: "2",
        title: "My Second Project",
        created_at: new Date().toISOString(),
      },
    ] satisfies Project[];
  },
});

export const getProjectDetailQuery = (id?: string) =>
  queryOptions({
    queryKey: ["projects", id],
    queryFn: async () => {
      return {
        project_id: id!,
        title: `Project ${id}`,
        created_at: new Date().toISOString(),
      } satisfies Project;
    },
    enabled: !!id,
  });
