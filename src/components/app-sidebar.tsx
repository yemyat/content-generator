"use client";

import * as React from "react";
import Link from "next/link";
import {
  Armchair,
  BookOpen,
  Drum,
  GlobeLock,
  Plus,
  Send,
  File,
} from "lucide-react";

import { NavMain } from "~/components/nav-main";
import { NavProjects } from "~/components/nav-projects";
import { NavSecondary } from "~/components/nav-secondary";
import { NavUser } from "~/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
} from "~/components/ui/sidebar";
import { Button } from "./ui/button";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Campaigns",
      url: "/dashboard/campaigns",
      icon: Drum,
    },
    {
      title: "Brand",
      url: "/dashboard/brand",
      icon: Armchair,
    },
  ],
  navSecondary: [
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
    {
      title: "Terms of Service",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Privacy Policy",
      url: "#",
      icon: GlobeLock,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: File,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: File,
    },
    {
      name: "Travel",
      url: "#",
      icon: File,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <Button asChild size="lg">
              <Link href="/dashboard/posts/new">
                <Plus />
                Create
              </Link>
            </Button>
          </SidebarMenu>
        </SidebarGroup>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  );
}
