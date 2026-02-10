"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VendorLayout } from "@/components/vendors/vendor-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { signOutVendor } from "@/lib/auth";

type LocationData = {
  businessName: string;
  streetAddress: string;
  city: string;
  district: string;
  postalCode: string;
  country: string;
};

type VendorLocationResponse = {
  companyName: string;
  email: string;
  location: LocationData;
};

export default function VenueDetailsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [vendorData, setVendorData] = useState<VendorLocationResponse | null>(
    null,
  );

  const [locationData, setLocationData] = useState<LocationData>({
    businessName: "",
    streetAddress: "",
    city: "",
    district: "",
    postalCode: "",
    country: "Sri Lanka",
  });

  // Load location data on mount
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/vendor/location`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const result = await response.json();

        if (response.status === 401 || response.status === 403) {
          router.push("/vendors/login");
          return;
        }

        if (response.ok && result.success) {
          setVendorData(result.data);
          setLocationData(
            result.data.location || {
              businessName: "",
              streetAddress: "",
              city: "",
              district: "",
              postalCode: "",
              country: "Sri Lanka",
            },
          );
        } else {
          setError(result.message || "Failed to load venue details");
        }
      } catch (err) {
        setError("Unable to load venue details. Please check your connection.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocationData();
  }, [router]);

  const handleChange = (field: keyof LocationData, value: string) => {
    setLocationData((prev) => ({ ...prev, [field]: value }));
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation
    if (!locationData.streetAddress || !locationData.city) {
      setError("Street address and city are required fields.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/vendor/location-update`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ location: locationData }),
        },
      );

      const result = await response.json();

      if (response.status === 401 || response.status === 403) {
        router.push("/vendors/login");
        return;
      }

      if (response.ok && result.success) {
        setSuccess("Venue location updated successfully!");
        // Update local state
        setVendorData((prev) => 
          prev ? { ...prev, location: result.data.location } : null,
        );
      } else {
        setError(result.message || "Failed to update venue details");
      }
    } catch (err) {
      setError("Unable to update venue details. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOutVendor();
    router.push("/vendors/login");
  };

  if (isLoading) {
    return (
      <VendorLayout onSignOut={handleSignOut} pageTitle="Venue Details">
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 flex items-center justify-center px-4 py-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="font-poppins text-sm text-gray-600">
              Loading venue details...
            </p>
          </div>
        </div>
      </VendorLayout>
    );
  }

  return (
    <VendorLayout onSignOut={handleSignOut} pageTitle="Venue Details">
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-50 rounded-lg">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h1 className="font-bebas text-4xl tracking-tight text-gray-900">
                Venue Location Details
              </h1>
            </div>
            <p className="font-poppins text-sm text-gray-600">
              Update your business location and venue information to help guests
              find you on Kohedha.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Venue Info Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="font-bebas text-2xl tracking-tight text-gray-900">
                    Current Venue
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <p className="font-poppins text-xs font-medium text-gray-500 mb-1">
                      Company Name
                    </p>
                    <p className="font-poppins text-sm text-gray-900 font-medium">
                      {vendorData?.companyName || "Not set"}
                    </p>
                  </div>
                  <div>
                    <p className="font-poppins text-xs font-medium text-gray-500 mb-1">
                      Email
                    </p>
                    <p className="font-poppins text-sm text-gray-900">
                      {vendorData?.email}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="font-poppins text-xs text-gray-500">
                      Company details are managed from your complete profile
                      page.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Form Card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100">
                  <h2 className="font-bebas text-3xl tracking-tight text-gray-900 mb-2">
                    Location Information
                  </h2>
                  <p className="font-poppins text-sm text-gray-600">
                    Keep your location accurate and up-to-date
                  </p>
                </div>

                <div className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Business Name */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium font-poppins text-gray-900">
                        Business Name at Location
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g. The Grand Colombo - Galle Face"
                        value={locationData.businessName}
                        onChange={(e) =>
                          handleChange("businessName", e.target.value)
                        }
                        className="font-poppins h-12 border-gray-200 focus:border-gray-900"
                      />
                      <p className="text-xs text-gray-500 font-poppins">
                        Optional: Specific name for this location if different
                        from company name
                      </p>
                    </div>

                    {/* Street Address */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium font-poppins text-gray-900">
                        Street Address <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g. 123 Galle Road"
                        value={locationData.streetAddress}
                        onChange={(e) =>
                          handleChange("streetAddress", e.target.value)
                        }
                        className="font-poppins h-12 border-gray-200 focus:border-gray-900"
                        required
                      />
                    </div>

                    {/* City and District */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium font-poppins text-gray-900">
                          City <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          placeholder="e.g. Colombo"
                          value={locationData.city}
                          onChange={(e) => handleChange("city", e.target.value)}
                          className="font-poppins h-12 border-gray-200 focus:border-gray-900"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium font-poppins text-gray-900">
                          District
                        </label>
                        <Input
                          type="text"
                          placeholder="e.g. Colombo District"
                          value={locationData.district}
                          onChange={(e) =>
                            handleChange("district", e.target.value)
                          }
                          className="font-poppins h-12 border-gray-200 focus:border-gray-900"
                        />
                      </div>
                    </div>

                    {/* Postal Code and Country */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium font-poppins text-gray-900">
                          Postal Code
                        </label>
                        <Input
                          type="text"
                          placeholder="e.g. 00300"
                          value={locationData.postalCode}
                          onChange={(e) =>
                            handleChange("postalCode", e.target.value)
                          }
                          className="font-poppins h-12 border-gray-200 focus:border-gray-900"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium font-poppins text-gray-900">
                          Country
                        </label>
                        <Input
                          type="text"
                          value={locationData.country}
                          onChange={(e) =>
                            handleChange("country", e.target.value)
                          }
                          className="font-poppins h-12 border-gray-200 focus:border-gray-900"
                        />
                      </div>
                    </div>

                    {/* Error and Success Messages */}
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600 font-poppins">
                          {error}
                        </p>
                      </div>
                    )}

                    {success && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-600 font-poppins">
                          {success}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
                      <Button
                        type="submit"
                        className="w-full sm:w-auto h-12 bg-black hover:bg-gray-900 text-white font-poppins font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                        disabled={isSaving}
                      >
                        {isSaving ? "Saving Changes..." : "Save Location"}
                      </Button>

                      <Link
                        href="/vendors/dashboard"
                        className="w-full sm:w-auto"
                      >
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full h-12 font-poppins border-gray-200 hover:bg-gray-50"
                        >
                          Back to Dashboard
                        </Button>
                      </Link>
                    </div>

                    <p className="text-xs text-gray-500 font-poppins pt-2">
                      Accurate location details help guests find your venue and
                      improve your visibility on Kohedha.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
}
