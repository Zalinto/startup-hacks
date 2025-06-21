"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { Icon } from "@phosphor-icons/react";
import { ClipboardTextIcon, HouseIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items: {
  title: string;
  url: string;
  icon: Icon;
  isActive?: boolean;
  matcher?: (url: string, path: string) => boolean;
}[] = [
  {
    title: "Home",
    url: "/dashboard",
    icon: HouseIcon,
    matcher: (url, path) => path === url,
  },
  { title: "Projects", url: "/dashboard/projects", icon: ClipboardTextIcon },
];

function DashboardSidebar() {
  const active = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="p-2">
            <h1 className="font-bold text-lg">Startup Hacks</h1>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.matcher
                        ? item.matcher(item.url, active)
                        : active.startsWith(item.url)
                    }
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="p-2">
            <UserButton
              showName
              appearance={{
                elements: {
                  rootBox: {
                    width: "100%",
                    flex: 1,
                    display: "flex",
                  },
                  userButtonBox: {
                    flexDirection: "row-reverse",
                  },
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
