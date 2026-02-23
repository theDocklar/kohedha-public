"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isVendorRoute = pathname?.startsWith("/vendors");

  return (
    <>
      {!isVendorRoute && <Navigation />}
      {children}
      {!isVendorRoute && <Footer />}
    </>
  );
}
