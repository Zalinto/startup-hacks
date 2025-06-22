"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getProjectDetailQuery } from "../../queries";

export function useActiveProjectId() {
  const params = useParams();
  return params.id as string;
}

export function useActiveProject() {
  const id = useActiveProjectId();
  return useQuery(getProjectDetailQuery(id));
}
