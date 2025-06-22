"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getProjectDetailQuery } from "../../queries";

export function useActiveProject() {
  const id = useParams().id! as string;
  return useQuery(getProjectDetailQuery(id));
}
