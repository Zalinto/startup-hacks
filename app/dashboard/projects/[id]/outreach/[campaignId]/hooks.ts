"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getCampaignDetailQuery } from "../queries";

export function useActiveCampaginId() {
  const params = useParams();
  return params.campaignId as string;
}

export function useActiveCampaign() {
  const id = useActiveCampaginId();
  return useQuery(getCampaignDetailQuery(id));
}
