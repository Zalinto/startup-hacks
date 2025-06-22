"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { Icon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type SidebarItem = {
  title: string;
  icon: Icon;
  url: string;
  matcher?: (url: string, pathname: string) => boolean;
  items?: {
    title: string;
    url: string;
    icon?: Icon;
    matcher?: (url: string, pathname: string) => boolean;
  }[];
};

export function AppSidebar({ items }: { items: SidebarItem[] }) {
  const pathname = usePathname();
  console.log(pathname, items);
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
                        ? item.matcher(item.url, pathname)
                        : pathname.startsWith(item.url)
                    }
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {!!item.items?.length && (
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={
                              subItem.matcher
                                ? subItem.matcher(subItem.url, pathname)
                                : pathname.startsWith(subItem.url)
                            }
                          >
                            <Link href={subItem.url}>
                              {subItem.icon && <subItem.icon />}
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
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
