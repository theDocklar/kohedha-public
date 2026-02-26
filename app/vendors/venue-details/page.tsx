"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VendorLayout } from "@/components/vendors/vendor-layout";
import { Button } from "@/components/ui/button";
import { FormSection } from "@/components/vendors/form-section";
import { AlertMessage } from "@/components/vendors/alert-message";
import { VenueFormField } from "@/components/vendors/venue-form-field";
import { MapPin, Edit2, Save, X } from "lucide-react";
import { signOutVendor } from "@/lib/auth";
import {
  getVenueDetails,
  updateVenueDetails,
  type LocationData,
  type VenueDetailsData,
} from "@/lib/venue";

export default function VenueDetailsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [venueData, setVenueData] = useState<VenueDetailsData>({
    companyName: "",
    email: "",
    businessRegistrationNo: "",
    vendorMobile: "",
    businessCategory: "",
    website: "",
    description: "",
    location: {
      businessName: "",
      streetAddress: "",
      city: "",
      district: "",
      postalCode: "",
      country: "Sri Lanka",
    },
  });

  // Load venue data on mount
  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        const result = await getVenueDetails();

        if (result.success && result.data) {
          setVenueData({
            companyName: result.data.companyName || "",
            email: result.data.email || "",
            businessRegistrationNo: result.data.businessRegistrationNo || "",
            vendorMobile: result.data.vendorMobile || "",
            businessCategory: result.data.businessCategory || "",
            website: result.data.website || "",
            description: result.data.description || "",
            location: result.data.location || {
              businessName: "",
              streetAddress: "",
              city: "",
              district: "",
              postalCode: "",
              country: "Sri Lanka",
            },
          });
        } else {
          setError(result.message || "Failed to load venue details");
          if (result.message?.includes("not authorized")) {
            router.push("/vendors/login");
          }
        }
      } catch (err) {
        setError("Unable to load venue details. Please check your connection.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenueData();
  }, [router]);

  const validateSriLankanMobile = (mobile: string): boolean => {
    // Sri Lankan mobile format: +94xxxxxxxxx or 0xxxxxxxxx (10 digits after 0)
    const sriLankanMobileRegex = /^(\+94|0)?[1-9]\d{8}$/;
    return sriLankanMobileRegex.test(mobile.replace(/\s/g, ""));
  };

  const handleChange = (field: string, value: string) => {
    if (field.startsWith("location.")) {
      const locationField = field.split(".")[1] as keyof LocationData;
      setVenueData((prev) => ({
        ...prev,
        location: { ...prev.location, [locationField]: value },
      }));
    } else {
      setVenueData((prev) => ({ ...prev, [field]: value }));
    }
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation
    if (!venueData.location.streetAddress || !venueData.location.city) {
      setError("Street address and city are required fields.");
      return;
    }

    if (
      venueData.vendorMobile &&
      !validateSriLankanMobile(venueData.vendorMobile)
    ) {
      setError(
        "Please enter a valid Sri Lankan mobile number (e.g., +94712345678 or 0712345678)",
      );
      return;
    }

    setIsSaving(true);

    try {
      const result = await updateVenueDetails({
        companyName: venueData.companyName,
        businessRegistrationNo: venueData.businessRegistrationNo,
        vendorMobile: venueData.vendorMobile,
        businessCategory: venueData.businessCategory,
        website: venueData.website,
        description: venueData.description,
        location: venueData.location,
      });

      if (result.success) {
        setSuccess(result.message || "Venue details updated successfully!");
        setIsEditing(false);
        // Update local state
        if (result.data) {
          setVenueData((prev) => ({
            ...prev,
            ...result.data,
          }));
        }
      } else {
        setError(result.message || "Failed to update venue details");
        if (result.message?.includes("not authorized")) {
          router.push("/vendors/login");
        }
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
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 flex items-center justify-center px-4 py-10">
        <div className="max-w-4xl w-full">
          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="font-bebas text-3xl tracking-tight text-gray-900 mb-2">
                  Venue Details
                </h2>
                <p className="font-poppins text-sm text-gray-600">
                  Manage your business and location information
                </p>
                <p className="text-xs text-gray-500 font-poppins text-center pt-2">
                  Accurate details help guests find your venue and improve your
                  visibility on Kohedha.
                </p>
              </div>
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="h-10 bg-black hover:bg-gray-900 text-white font-poppins font-medium"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Details
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    setError(null);
                    setSuccess(null);
                  }}
                  variant="outline"
                  className="h-10 border-gray-200 font-poppins"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              )}
            </div>

            {/* Form */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Business Information Section */}
                <FormSection title="Business Information">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <VenueFormField
                      label="Company Name"
                      value={venueData.companyName}
                      onChange={(value) => handleChange("companyName", value)}
                      disabled={!isEditing}
                    />

                    <VenueFormField
                      label="Email"
                      type="email"
                      value={venueData.email}
                      disabled={true}
                      helperText="Email cannot be changed"
                    />

                    <VenueFormField
                      label="Business Registration No"
                      value={venueData.businessRegistrationNo}
                      onChange={(value) =>
                        handleChange("businessRegistrationNo", value)
                      }
                      placeholder="e.g. PV12345"
                      disabled={!isEditing}
                    />

                    <VenueFormField
                      label="Contact Mobile"
                      type="tel"
                      value={venueData.vendorMobile}
                      onChange={(value) => handleChange("vendorMobile", value)}
                      placeholder="e.g. +94 71 234 5678"
                      disabled={!isEditing}
                    />

                    <VenueFormField
                      label="Business Category"
                      type="select"
                      value={venueData.businessCategory}
                      onChange={(value) =>
                        handleChange("businessCategory", value)
                      }
                      placeholder="Select category"
                      disabled={!isEditing}
                      selectOptions={[
                        { value: "cafe", label: "Cafe" },
                        { value: "restaurant", label: "Restaurant" },
                        { value: "hotel", label: "Hotel" },
                        { value: "pub", label: "Pub" },
                      ]}
                    />

                    <VenueFormField
                      label="Website"
                      type="url"
                      value={venueData.website}
                      onChange={(value) => handleChange("website", value)}
                      placeholder="e.g. https://example.com"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="mt-6">
                    <VenueFormField
                      label="Description"
                      type="textarea"
                      value={venueData.description}
                      onChange={(value) => handleChange("description", value)}
                      placeholder="Tell us about your business..."
                      disabled={!isEditing}
                    />
                  </div>
                </FormSection>

                {/* Location Information Section */}
                <FormSection title="Location Information" icon={MapPin}>
                  <div className="space-y-6">
                    <VenueFormField
                      label="Business Name at Location"
                      value={venueData.location.businessName}
                      onChange={(value) =>
                        handleChange("location.businessName", value)
                      }
                      placeholder="e.g. The Grand Colombo - Galle Face"
                      disabled={!isEditing}
                      helperText="Optional: Specific name for this location if different from company name"
                    />

                    <VenueFormField
                      label="Street Address"
                      value={venueData.location.streetAddress}
                      onChange={(value) =>
                        handleChange("location.streetAddress", value)
                      }
                      placeholder="e.g. 123 Galle Road"
                      disabled={!isEditing}
                      required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <VenueFormField
                        label="City"
                        value={venueData.location.city}
                        onChange={(value) =>
                          handleChange("location.city", value)
                        }
                        placeholder="e.g. Colombo"
                        disabled={!isEditing}
                        required
                      />

                      <VenueFormField
                        label="District"
                        value={venueData.location.district}
                        onChange={(value) =>
                          handleChange("location.district", value)
                        }
                        placeholder="e.g. Colombo District"
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <VenueFormField
                        label="Postal Code"
                        value={venueData.location.postalCode}
                        onChange={(value) =>
                          handleChange("location.postalCode", value)
                        }
                        placeholder="e.g. 00300"
                        disabled={!isEditing}
                      />

                      <VenueFormField
                        label="Country"
                        value={venueData.location.country}
                        onChange={(value) =>
                          handleChange("location.country", value)
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </FormSection>

                {/* Error and Success Messages */}
                {error && <AlertMessage message={error} type="error" />}
                {success && <AlertMessage message={success} type="success" />}

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
                    <Button
                      type="submit"
                      className="w-full sm:w-auto h-12 bg-black hover:bg-gray-900 text-white font-poppins font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                      disabled={isSaving}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? "Saving Changes..." : "Save Changes"}
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
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
}
