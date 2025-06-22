import { queryOptions } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export type Campaign = {
  campaign_id: string;
  project_id: string;
  title: string;
  type: "email" | "pitch_deck" | "scripted_video";
  script: string;
  created_at: string;
  updated_at: string;
};

export const getCampaignsQuery = (projectId: string) =>
  queryOptions({
    queryKey: ["projects", projectId, "campaigns"],
    queryFn: async (): Promise<Campaign[]> => {
      const response = await fetch(
        `http://localhost:8080/api/project/${projectId}/campaign`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch campaigns");
      }
      return response.json();
    },
  });

export const getCampaignDetailQuery = (campaignId: string) =>
  queryOptions({
    queryKey: ["campaigns", campaignId],
    queryFn: async (): Promise<Campaign> => {
      const response = await fetch(
        `http://localhost:8080/api/campaign/${campaignId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch campaign details");
      }

      return response.json();
    },
  });
  
  export const useCreateCampaign = (projectId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (data: { title: string; type: "email" | "pitch_deck" | "scripted_video" }) => {
        const response = await axios.post(
          `http://localhost:8080/api/project/${projectId}/campaign`,
          {
            title: data.title,
            type: data.type,
          }
        );
        return response.data;
      },
      onSuccess: () => {
        // Invalidate the campaigns query to refetch the updated list
        queryClient.invalidateQueries({ queryKey: ["projects", projectId, "campaigns"] });
      },
    });
  };
