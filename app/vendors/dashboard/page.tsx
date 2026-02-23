"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Calendar,
  Eye,
  Star,
  Heart,
  Clock,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { VendorLayout } from "@/components/vendors/vendor-layout";
import { signOutVendor } from "@/lib/auth";

export default function VendorDashboardPage() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

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

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOutVendor();
      router.push("/vendors/login");
    } catch (error) {
      console.error("Sign out error:", error);
      // Still redirect to login even on error
      router.push("/vendors/login");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <VendorLayout onSignOut={handleSignOut} pageTitle="Dashboard">
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p className="text-5xl font-bebas text-gray-900 mb-2">
                {mockVendor.stats.activeDeals}
              </p>
              <p className="font-poppins text-sm font-medium text-gray-600 mb-1">
                Active Deals
              </p>
              <p className="font-poppins text-xs text-gray-500">
                Currently visible on Kohedha
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <p className="text-5xl font-bebas text-gray-900 mb-2">
                {mockVendor.stats.upcomingEvents}
              </p>
              <p className="font-poppins text-sm font-medium text-gray-600 mb-1">
                Upcoming Events
              </p>
              <p className="font-poppins text-xs text-gray-500">
                In the next 30 days
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <p className="text-5xl font-bebas text-gray-900 mb-2">
                {mockVendor.stats.monthlyViews.toLocaleString()}
              </p>
              <p className="font-poppins text-sm font-medium text-gray-600 mb-1">
                Monthly Views
              </p>
              <p className="font-poppins text-xs text-gray-500">
                Profile views this month
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Venue Snapshot */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-100">
                <h2 className="font-bebas text-3xl tracking-tight text-gray-900 mb-2">
                  Venue Performance
                </h2>
                <p className="font-poppins text-sm text-gray-500">
                  Overview of how your venue is performing on Kohedha
                </p>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-yellow-50 rounded-lg">
                      <Star className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-poppins text-sm font-medium text-gray-900">
                        Average Rating
                      </p>
                      <p className="font-poppins text-xs text-gray-500">
                        Based on customer reviews
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-poppins font-bold text-xl text-gray-900">
                      4.7
                    </span>
                    <span className="font-poppins text-sm text-gray-500">
                      / 5
                    </span>
                  </div>
                </div>

                <div className="h-px bg-gray-100"></div>

                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <Heart className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-poppins text-sm font-medium text-gray-900">
                        Saved by Users
                      </p>
                      <p className="font-poppins text-xs text-gray-500">
                        Total favorites count
                      </p>
                    </div>
                  </div>
                  <span className="font-poppins font-bold text-xl text-gray-900">
                    320
                  </span>
                </div>

                <div className="h-px bg-gray-100"></div>

                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <Clock className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-poppins text-sm font-medium text-gray-900">
                        Peak Hours
                      </p>
                      <p className="font-poppins text-xs text-gray-500">
                        Most popular visiting times
                      </p>
                    </div>
                  </div>
                  <span className="font-poppins font-medium text-gray-900 text-right max-w-[180px]">
                    Friday &amp; Saturday evenings
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-100">
                <h2 className="font-bebas text-3xl tracking-tight text-gray-900 mb-2">
                  Quick Actions
                </h2>
                <p className="font-poppins text-sm text-gray-500">
                  Common tasks and shortcuts
                </p>
              </div>
              <div className="p-6 space-y-3">
                <Link href="/vendors/venue-details">
                  <Button
                    variant="outline"
                    className="w-full font-poppins text-sm border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-lg py-6 justify-between group transition-all duration-200"
                  >
                    <span>Update Venue Details</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/vendors/reservations">
                  <Button
                    variant="outline"
                    className="w-full font-poppins text-sm border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-lg py-6 justify-between group transition-all duration-200"
                  >
                    <span>Manage Reservations</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full font-poppins text-sm border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-lg py-6 justify-between group transition-all duration-200"
                >
                  <span>View Deals</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full font-poppins text-sm border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-lg py-6 justify-between group transition-all duration-200"
                >
                  <span>View Events</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
}
