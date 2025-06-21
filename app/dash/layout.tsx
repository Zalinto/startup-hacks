"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { UserButton, useUser } from "@clerk/nextjs";

function DashboardSidebar() {
  const user = useUser();
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="p-2">
            <h1 className="font-bold text-lg">Startup Hacks</h1>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent></SidebarContent>
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
