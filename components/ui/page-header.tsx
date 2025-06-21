import { ReactNode } from "react";
import { SidebarTrigger } from "./sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Breadcrumb, BreadcrumbList, BreadcrumbPage } from "./breadcrumb";

export default function PageHeader({
  title,
  nav,
}: {
  title?: ReactNode;
  nav?: ReactNode;
}) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2">
      <div className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        {title}
      </div>
      <div className="ml-auto px-3">{nav}</div>
    </header>
  );
}
