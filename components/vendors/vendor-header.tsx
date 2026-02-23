"use client";

import { LogOut, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface VendorHeaderProps {
  pageTitle?: string;
  onSignOut?: () => void | Promise<void>;
  className?: string;
}

export function VendorHeader({
  pageTitle = "Dashboard",
  onSignOut,
  className,
}: VendorHeaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    if (onSignOut) {
      setIsLoading(true);
      try {
        await onSignOut();
      } catch (error) {
        console.error("Sign out error:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Signing out...");
    }
  };

  const handleReservationPortal = () => {
    router.push("/vendors/reservation-portal/reserve");
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 md:left-64 z-20 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6",
        className,
      )}
    >
      <div className="flex items-center">
        <h1 className="font-bebas text-3xl md:text-4xl tracking-tight text-black">
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="default"
          onClick={handleReservationPortal}
          className="bg-black hover:bg-gray-900 text-white font-poppins font-medium flex items-center gap-2"
        >
          <CalendarClock className="h-4 w-4" />
          <span className="hidden sm:inline">Reservation Portal</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleSignOut}
          disabled={isLoading}
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-50"
          title="Sign Out"
        >
          <LogOut className={cn("h-5 w-5", isLoading && "animate-pulse")} />
          <span className="sr-only">Sign Out</span>
        </Button>
      </div>
    </header>
  );
}
