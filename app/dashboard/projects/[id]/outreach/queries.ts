import { queryOptions } from "@tanstack/react-query";

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
      return [
        {
          campaign_id: "1",
          project_id: "1",
          type: "email",
          title: "Incredible Emails",
          script: "Welcome to our email campaign!",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          campaign_id: "2",
          project_id: "1",
          title: "Undeniable Pitch",
          type: "pitch_deck",
          script: "Here's our pitch deck for you.",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
    },
  });

export const getCampaignDetailQuery = (campaignId: string) =>
  queryOptions({
    queryKey: ["campaigns", campaignId],
    queryFn: async (): Promise<Campaign> => {
      return {
        campaign_id: campaignId,
        project_id: "1",
        type: "scripted_video",
        title: "Incredible Emails",
        script: "Welcome to our email campaign!",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    },
  });
