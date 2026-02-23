"use client";

import { ReservationPortalLayout } from "@/components/vendors/reservation-portal-layout";
import { Calendar, Clock, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ReservePage() {
  return (
    <ReservationPortalLayout pageTitle="Reserve">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-bebas text-2xl tracking-tight text-gray-900 mb-2">
              Create New Reservation
            </h2>
            <p className="font-poppins text-sm text-gray-500">
              Quickly create reservations for walk-in guests or phone bookings
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="font-poppins text-sm font-medium text-gray-700 mb-2 block">
                    Guest Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter guest name"
                    className="font-poppins"
                  />
                </div>

                <div>
                  <label className="font-poppins text-sm font-medium text-gray-700 mb-2 block">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+94 XX XXX XXXX"
                    className="font-poppins"
                  />
                </div>

                <div>
                  <label className="font-poppins text-sm font-medium text-gray-700 mb-2 block">
                    Email (Optional)
                  </label>
                  <Input
                    type="email"
                    placeholder="guest@example.com"
                    className="font-poppins"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-poppins text-sm font-medium text-gray-700 mb-2 block">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Reservation Date
                  </label>
                  <Input type="date" className="font-poppins" />
                </div>

                <div>
                  <label className="font-poppins text-sm font-medium text-gray-700 mb-2 block">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Reservation Time
                  </label>
                  <Input type="time" className="font-poppins" />
                </div>

                <div>
                  <label className="font-poppins text-sm font-medium text-gray-700 mb-2 block">
                    <Users className="inline h-4 w-4 mr-1" />
                    Number of Guests
                  </label>
                  <Input
                    type="number"
                    min="1"
                    defaultValue="2"
                    className="font-poppins"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="font-poppins text-sm font-medium text-gray-700 mb-2 block">
                  Special Requests (Optional)
                </label>
                <textarea
                  className="w-full min-h-24 px-3 py-2 border border-gray-300 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Any special arrangements or dietary requirements..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
              <Button variant="outline" className="font-poppins">
                Cancel
              </Button>
              <Button className="bg-black hover:bg-gray-900 font-poppins">
                Create Reservation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ReservationPortalLayout>
  );
}
