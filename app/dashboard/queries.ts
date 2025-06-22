import { queryOptions } from "@tanstack/react-query";

export type Project = { id: string; title: string; created_at: string };

export const getProjectsQuery = queryOptions({
  queryKey: ["projects"],
  queryFn: async () => {
    return [
      {
        id: "1",
        title: "My First Project",
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
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
        id: id!,
        title: `Project ${id}`,
        created_at: new Date().toISOString(),
      } satisfies Project;
    },
    enabled: !!id,
  });
