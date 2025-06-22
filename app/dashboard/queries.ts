import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

export type Project = { project_id: string; title: string; created_at: string };

export const getProjectsQuery = queryOptions({
  queryKey: ["projects"],
  queryFn: async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/project");
      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw new Error("Failed to fetch projects");
    }
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