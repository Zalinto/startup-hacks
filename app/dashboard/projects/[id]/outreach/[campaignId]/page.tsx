"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PageHeader from "@/components/ui/page-header";
import Link from "next/link";
import { useActiveProject } from "../../hooks";
import { MegaphoneIcon } from "@phosphor-icons/react/dist/ssr";
import { useActiveCampaign } from "./hooks";
import { Badge } from "@/components/ui/badge";
import { CAMPAIGN_TYPE_LABELS } from "@/app/constants";
import React from "react";
import CampaignEmailEditor from "./types/email";
import CampaignVideoEditor from "./types/video";
import CampaignPitchdeckEditor from "./types/pitchdeck";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCampaignDetailQuery } from "../queries";
import { api } from "@/app/providers";
import { toast } from "sonner";

export default function OutreachCampaignDetail() {
  const project = useActiveProject().data;
  const campaign = useActiveCampaign().data;

  const queryClient = useQueryClient();
  const saveMutation = useMutation({
    mutationFn: async (script: string) => {
      await api.put(`/campaign/${campaign!.campaign_id}`, {
        type: campaign!.type,
        script,
        title: campaign!.title,
        status: campaign!.status,
      });
    },
    onSuccess: () => {
      toast.success("Campaign saved successfully!");

      queryClient.invalidateQueries({
        queryKey: getCampaignDetailQuery(campaign!.campaign_id).queryKey,
      });
    },
  });
  const onSave = async (script: string) => {
    // console.log("Saving script:", script);
    await saveMutation.mutateAsync(script);
    // Implement your save logic here
  };
  return (
    <>
      <PageHeader
        title={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>{project?.title ?? "Loading..."}</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href={`/dashboard/projects/${project?.project_id}/outreach`}
                    className="line-clamp-1 flex gap-2 items-center"
                  >
                    <MegaphoneIcon />
                    <span>Outreach</span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="line-clamp-1 font-bold flex gap-2 items-center">
                {campaign?.title ?? "Loading..."}
                {campaign?.type && (
                  <Badge variant="outline">
                    {React.createElement(
                      CAMPAIGN_TYPE_LABELS[campaign.type].icon
                    )}
                    {CAMPAIGN_TYPE_LABELS[campaign.type].label}
                  </Badge>
                )}
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />
      <div className="p-4">
        {campaign?.type === "email" && (
          <CampaignEmailEditor script={campaign.script} onSave={onSave} />
        )}
        {campaign?.type === "scripted_video" && (
          <CampaignVideoEditor script={campaign.script} onSave={onSave} />
        )}
        {campaign?.type === "pitch_deck" && <CampaignPitchdeckEditor />}
      </div>
    </>
  );
}
