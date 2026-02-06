"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Building2,
  UtensilsCrossed,
  Calendar,
  CalendarDays,
  Tag,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VendorSidebarProps {
  className?: string;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/vendors/dashboard",
  },
  {
    title: "Venue Details",
    icon: Building2,
    href: "/vendors/venue",
  },
  {
    title: "Menu Details",
    icon: UtensilsCrossed,
    href: "/vendors/menu",
  },
  {
    title: "Reservation Management",
    icon: Calendar,
    href: "/vendors/reservations",
  },
  {
    title: "Manage Events",
    icon: CalendarDays,
    href: "/vendors/events",
  },
  {
    title: "Manage Deals",
    icon: Tag,
    href: "/vendors/deals",
  },
];

export function VendorSidebar({ className }: VendorSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-full flex-col bg-white border-r border-gray-200">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <div className="font-bebas text-2xl text-black tracking-wider">
            ko<span className="text-accent">|</span>HEDHA
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-6 flex-1 overflow-auto">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  pathname?.startsWith(item.href + "/");

                return (
                  <SidebarMenuItem key={item.href} className="mb-2">
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "font-poppins text-base py-3",
                        isActive &&
                          "bg-black text-white hover:bg-black hover:text-white",
                        !isActive && "hover:bg-gray-100 text-gray-700",
                      )}
                    >
                      <Link href={item.href}>
                        <Icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </div>
  );
}
