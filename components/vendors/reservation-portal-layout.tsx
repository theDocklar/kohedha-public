"use client";

import { ReservationPortalSidebar } from "./reservation-portal-sidebar";
import { ReservationPortalHeader } from "./reservation-portal-header";

interface ReservationPortalLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export function ReservationPortalLayout({
  children,
  pageTitle = "Reserve",
}: ReservationPortalLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="hidden md:block fixed inset-y-0 left-0 z-10 w-48">
        <ReservationPortalSidebar />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden md:ml-48">
        <ReservationPortalHeader pageTitle={pageTitle} />
        <main className="flex-1 overflow-auto pt-14 bg-gradient-to-br from-gray-50 via-white to-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
