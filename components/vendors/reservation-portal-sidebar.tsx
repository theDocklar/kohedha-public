"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarPlus,
  Users,
  LayoutGrid,
  Settings,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ReservationPortalSidebarProps {
  className?: string;
}

const menuItems = [
  {
    title: "Reserve",
    icon: CalendarPlus,
    href: "/vendors/reservation-portal/reserve",
  },
  {
    title: "Guest List",
    icon: Users,
    href: "/vendors/reservation-portal/guest-list",
  },
  {
    title: "Arrangements",
    icon: LayoutGrid,
    href: "/vendors/reservation-portal/arrangements",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/vendors/reservation-portal/settings",
  },
];

export function ReservationPortalSidebar({
  className,
}: ReservationPortalSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleBackToDashboard = () => {
    router.push("/vendors/dashboard");
  };

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col bg-white border-r border-gray-200",
        className,
      )}
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="font-bebas text-xl text-black tracking-wider">
            Reservations
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-auto py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + "/");

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg font-poppins text-sm transition-all",
                    isActive && "bg-black text-white hover:bg-gray-800",
                    !isActive && "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Button
          variant="outline"
          onClick={handleBackToDashboard}
          className="w-full font-poppins text-sm flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
