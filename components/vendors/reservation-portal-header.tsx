"use client";

import { cn } from "@/lib/utils";

interface ReservationPortalHeaderProps {
  pageTitle?: string;
  className?: string;
}

export function ReservationPortalHeader({
  pageTitle = "Reserve",
  className,
}: ReservationPortalHeaderProps) {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 md:left-48 z-20 h-14 bg-white border-b border-gray-200 flex items-center px-6",
        className,
      )}
    >
      <h1 className="font-bebas text-2xl md:text-3xl tracking-tight text-black">
        {pageTitle}
      </h1>
    </header>
  );
}
