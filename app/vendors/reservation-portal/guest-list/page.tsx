"use client";

import { ReservationPortalLayout } from "@/components/vendors/reservation-portal-layout";
import { Search, Filter, Users, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function GuestListPage() {
  return (
    <ReservationPortalLayout pageTitle="Guest List">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-bebas text-2xl tracking-tight text-gray-900 mb-2">
                  Guest List
                </h2>
                <p className="font-poppins text-sm text-gray-500">
                  View and manage all guest reservations
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search guests..."
                    className="pl-10 font-poppins w-64"
                  />
                </div>
                <Button variant="outline" size="sm" className="font-poppins">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-bebas text-xl text-gray-900 mb-2">
                No Guests Yet
              </h3>
              <p className="font-poppins text-sm text-gray-500">
                Guest reservations will appear here
              </p>
            </div>
          </div>
        </div>
      </div>
    </ReservationPortalLayout>
  );
}
