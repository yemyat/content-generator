"use client";

import * as React from "react";
import { AppSidebar } from "~/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { useBreadcrumb } from "~/lib/hooks/use-breadcrumb";
import { HeaderContext } from "~/lib/contexts/header-context";

// Add children prop for the layout
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbs = useBreadcrumb();
  const [headerContent, setHeaderContent] =
    React.useState<React.ReactNode>(null);

  return (
    <HeaderContext.Provider value={{ setHeaderContent }}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="border border-gray-100 md:peer-data-[variant=inset]:rounded-2xl md:peer-data-[variant=inset]:shadow-lg">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 rounded-2xl bg-white">
            <div className="flex flex-1 items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((breadcrumb, index) => (
                    <React.Fragment key={breadcrumb.href}>
                      <BreadcrumbItem>
                        {breadcrumb.isCurrentPage ? (
                          <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={breadcrumb.href}>
                            {breadcrumb.label}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && (
                        <BreadcrumbSeparator />
                      )}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
              {headerContent && <div className="ml-auto">{headerContent}</div>}
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 rounded-2xl bg-white p-4 pt-0">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </HeaderContext.Provider>
  );
}
