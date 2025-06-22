"use client";
import { redirect, usePathname } from "next/navigation";

export default function ProjectDetail() {
  const pathname = usePathname();
  redirect(`${pathname}/brainstorming`);
}
