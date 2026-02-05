"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VendorDashboardPage() {
  // In a real app you would get this from your auth/user context or an API
  const mockVendor = {
    email: "vendor@example.com",
    companyName: "Colombo Rooftop Dining",
    isProfileComplete: false,
    stats: {
      activeDeals: 3,
      upcomingEvents: 2,
      monthlyViews: 1240,
    },
  };

  return (
    <div className="min-h-screen bg-muted/10 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-bebas text-4xl tracking-wide text-black">
              Vendor Dashboard
            </h1>
            <p className="font-poppins text-sm text-muted-foreground">
              Welcome back, <span className="font-medium text-black">{mockVendor.email}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              className="bg-black hover:bg-black/90 text-white font-poppins font-medium"
            >
              Create New Deal
            </Button>
            <Button
              variant="outline"
              className="font-poppins"
            >
              Create Event
            </Button>
          </div>
        </div>

        {/* Profile status banner */}
        {!mockVendor.isProfileComplete && (
          <Card className="border border-amber-300 bg-amber-50">
            <CardContent className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="font-poppins text-sm text-amber-900 font-medium">
                  Your profile is not complete yet.
                </p>
                <p className="font-poppins text-xs text-amber-800/80">
                  Complete your profile to increase visibility and build trust with Kohedha users.
                </p>
              </div>
              <Link href="/vendors/complete-profile">
                <Button className="bg-black hover:bg-black/90 text-white font-poppins font-medium">
                  Complete Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="font-poppins text-sm text-muted-foreground">
                Active Deals
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-3xl font-semibold font-bebas text-black">
                {mockVendor.stats.activeDeals}
              </p>
              <p className="font-poppins text-xs text-muted-foreground mt-1">
                Deals currently visible on Kohedha.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="font-poppins text-sm text-muted-foreground">
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-3xl font-semibold font-bebas text-black">
                {mockVendor.stats.upcomingEvents}
              </p>
              <p className="font-poppins text-xs text-muted-foreground mt-1">
                Events you&apos;re hosting in the next 30 days.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="font-poppins text-sm text-muted-foreground">
                Monthly Views
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-3xl font-semibold font-bebas text-black">
                {mockVendor.stats.monthlyViews.toLocaleString()}
              </p>
              <p className="font-poppins text-xs text-muted-foreground mt-1">
                Total profile and listing views in the last 30 days.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Snapshot / dummy sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 shadow-sm">
            <CardHeader>
              <CardTitle className="font-bebas text-2xl tracking-wide text-black">
                Venue Snapshot
              </CardTitle>
              <CardDescription className="font-poppins text-sm">
                Quick overview of how your venue is performing on Kohedha.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-poppins text-sm text-muted-foreground">
                  Average Rating
                </span>
                <span className="font-poppins font-medium text-black">
                  4.7 / 5
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-poppins text-sm text-muted-foreground">
                  Saved by users
                </span>
                <span className="font-poppins font-medium text-black">
                  320 favorites
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-poppins text-sm text-muted-foreground">
                  Most popular time
                </span>
                <span className="font-poppins font-medium text-black">
                  Friday &amp; Saturday evenings
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="font-bebas text-2xl tracking-wide text-black">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/vendors/complete-profile">
                <Button variant="outline" className="w-full font-poppins text-sm">
                  Update Profile Details
                </Button>
              </Link>
              <Button variant="outline" className="w-full font-poppins text-sm">
                View Deals
              </Button>
              <Button variant="outline" className="w-full font-poppins text-sm">
                View Events
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

