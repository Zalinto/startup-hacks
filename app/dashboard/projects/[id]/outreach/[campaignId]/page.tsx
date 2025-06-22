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

export default function OutreachCampaignDetail() {
  const project = useActiveProject().data;
  const campaign = useActiveCampaign().data;

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
                    href={`/dashboard/projects/${project?.id}/outreach`}
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
      {campaign?.type === "email" && <CampaignEmailEditor />}
      {campaign?.type === "pitch_deck" && <CampaignPitchdeckEditor />}
      {campaign?.type === "scripted_video" && <CampaignVideoEditor />}
    </>
  );
}
