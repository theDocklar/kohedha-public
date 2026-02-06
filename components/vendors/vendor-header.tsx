"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
    </header>
  );
}
