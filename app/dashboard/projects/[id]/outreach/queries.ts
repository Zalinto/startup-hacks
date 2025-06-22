import { api } from "@/app/providers";
import { queryOptions } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export type Campaign = {
  campaign_id: string;
  project_id: string;
  title: string;
  type: "email" | "pitch_deck" | "scripted_video";
  script: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export const getCampaignsQuery = (projectId: string) =>
  queryOptions({
    queryKey: ["project", projectId, "campaign"],
    queryFn: async (): Promise<Campaign[]> => {
      const res = await api.get<Campaign[]>(`/project/${projectId}/campaign`);
      return res.data;
    },
  });

export const getCampaignDetailQuery = (campaignId: string) =>
  queryOptions({
    queryKey: ["campaigns", campaignId],
    queryFn: async (): Promise<Campaign> => {
      const res = await api.get<Campaign[]>(`/campaign/${campaignId}`);
      return res.data[0];
    },
  });

export const useCreateCampaign = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      type: "email" | "pitch_deck" | "scripted_video";
    }) => {
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
      queryClient.invalidateQueries({
        queryKey: ["projects", projectId, "campaigns"],
      });
    },
  });
};
