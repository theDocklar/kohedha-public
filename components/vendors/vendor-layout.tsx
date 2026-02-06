"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { VendorSidebar } from "./vendor-sidebar";
import { VendorHeader } from "./vendor-header";

interface VendorLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  onSignOut?: () => void;
}

export function VendorLayout({ 
  children,
  pageTitle = "Dashboard",
  onSignOut 
}: VendorLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden">
        <div className="hidden md:block fixed inset-y-0 left-0 z-10 w-64">
          <VendorSidebar />
        </div>
        <div className="flex flex-1 flex-col overflow-hidden md:ml-64">
          <VendorHeader pageTitle={pageTitle} onSignOut={onSignOut} />
          <main className="flex-1 overflow-auto pt-16">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
