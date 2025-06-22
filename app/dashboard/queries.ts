import { queryOptions } from "@tanstack/react-query";
import { api } from "../providers";

export type Project = {
  project_id: string;
  title: string;
  created_at: string;
};

export const getProjectsQuery = queryOptions({
  queryKey: ["project"],
  queryFn: async () => {
    const res = await api.get<Project[]>("/project");
    return res.data;
  },
});

export const getProjectDetailQuery = (id?: string) =>
  queryOptions({
    queryKey: ["project", id],
    queryFn: async () => {
      const res = await api.get<Project[]>(`/project/${id}`);
      return res.data[0];
    },
    enabled: !!id,
  });
