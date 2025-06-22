import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

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
      if (!id) {
        throw new Error("Project ID is required");
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/project/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching project by ID:", error);
        throw new Error("Failed to fetch project details");
      }
    },
    enabled: !!id,
  });