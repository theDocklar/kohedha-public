"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RegistrationProgress } from "@/components/vendors/registration-progress";
import { completeRegistrationStep } from "@/lib/auth";
import {
  MapPin,
  Building,
  Globe,
  FileText,
  CheckCircle2,
  ArrowLeft,
  Store,
} from "lucide-react";

export default function RegistrationStep3Page() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    businessName: "",
    streetAddress: "",
    city: "",
    district: "",
    postalCode: "",
    website: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("registration_step3");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved data");
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (formData.streetAddress || formData.city) {
      localStorage.setItem("registration_step3", JSON.stringify(formData));
    }
  }, [formData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = "Street address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (formData.website.trim()) {
      try {
        new URL(formData.website);
      } catch {
        newErrors.website =
          "Please enter a valid URL (e.g., https://example.com)";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await completeRegistrationStep({
        currentStep: 3,
        location: {
          businessName: formData.businessName.trim() || undefined,
          streetAddress: formData.streetAddress.trim(),
          city: formData.city.trim(),
          district: formData.district.trim() || undefined,
          postalCode: formData.postalCode.trim() || undefined,
          country: "Sri Lanka",
        },
        website: formData.website.trim() || undefined,
        description: formData.description.trim() || undefined,
      });

      if (result.success) {
        // Clear all registration data
        localStorage.removeItem("registration_step2");
        localStorage.removeItem("registration_step3");
        // Registration complete - redirect to dashboard
        router.push("/vendors/dashboard");
      } else {
        setGeneralError(result.error || "Failed to complete registration");
      }
    } catch (error) {
      setGeneralError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 mb-4">
            <Store className="h-5 w-5 text-gray-900" />
            <span className="font-bebas text-xl tracking-wide text-gray-900">
              Kohedha Vendor Portal
            </span>
          </div>

          {/* Progress Indicator */}
          <div className="mb-6">
            <RegistrationProgress currentStep={3} />
          </div>

          <h1 className="font-bebas text-5xl tracking-tight text-gray-900 mb-2">
            Location & Details
          </h1>
          <p className="font-poppins text-gray-600">
            Final step! Help customers find you and learn about your business
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* General Error */}
              {generalError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 font-poppins">
                    {generalError}
                  </p>
                </div>
              )}

              {/* Location Section */}
              <div className="space-y-5">
                <div className="pb-2 border-b border-gray-200">
                  <h3 className="font-bebas text-2xl tracking-wide text-gray-900 flex items-center gap-2">
                    <MapPin className="h-6 w-6" />
                    Location Details
                  </h3>
                  <p className="font-poppins text-sm text-gray-600 mt-1">
                    Where can customers find you?
                  </p>
                </div>

                {/* Location Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium font-poppins text-gray-900">
                    Location Name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="e.g., Rooftop Dining Colombo (optional)"
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          businessName: e.target.value,
                        }))
                      }
                      className="pl-11 font-poppins h-12 border-gray-200 focus:border-gray-900 transition-colors"
                      maxLength={100}
                    />
                  </div>
                </div>

                {/* Street Address */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium font-poppins text-gray-900">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="e.g., 123 Galle Road"
                      value={formData.streetAddress}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          streetAddress: e.target.value,
                        }))
                      }
                      className="pl-11 font-poppins h-12 border-gray-200 focus:border-gray-900 transition-colors"
                      maxLength={200}
                      required
                    />
                  </div>
                  {errors.streetAddress && (
                    <p className="text-xs text-red-500 font-poppins">
                      {errors.streetAddress}
                    </p>
                  )}
                </div>

                {/* City & District - Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium font-poppins text-gray-900">
                      City <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., Colombo"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                      className="font-poppins h-12 border-gray-200 focus:border-gray-900 transition-colors"
                      maxLength={50}
                      required
                    />
                    {errors.city && (
                      <p className="text-xs text-red-500 font-poppins">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium font-poppins text-gray-900">
                      District
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., Colombo (optional)"
                      value={formData.district}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          district: e.target.value,
                        }))
                      }
                      className="font-poppins h-12 border-gray-200 focus:border-gray-900 transition-colors"
                      maxLength={50}
                    />
                  </div>
                </div>

                {/* Postal Code */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium font-poppins text-gray-900">
                    Postal Code
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., 00100 (optional)"
                    value={formData.postalCode}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        postalCode: e.target.value,
                      }))
                    }
                    className="font-poppins h-12 border-gray-200 focus:border-gray-900 transition-colors"
                    maxLength={10}
                  />
                </div>
              </div>

              {/* Additional Information Section */}
              <div className="space-y-5">
                <div className="pb-2 border-b border-gray-200">
                  <h3 className="font-bebas text-2xl tracking-wide text-gray-900 flex items-center gap-2">
                    <FileText className="h-6 w-6" />
                    Additional Information
                  </h3>
                  <p className="font-poppins text-sm text-gray-600 mt-1">
                    Optional details to enhance your profile
                  </p>
                </div>

                {/* Website */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium font-poppins text-gray-900">
                    Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="url"
                      placeholder="e.g., https://yourwebsite.com (optional)"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          website: e.target.value,
                        }))
                      }
                      className="pl-11 font-poppins h-12 border-gray-200 focus:border-gray-900 transition-colors"
                      maxLength={200}
                    />
                  </div>
                  {errors.website && (
                    <p className="text-xs text-red-500 font-poppins">
                      {errors.website}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium font-poppins text-gray-900">
                    Business Description
                  </label>
                  <Textarea
                    placeholder="Tell customers about your unique offerings, ambiance, specialties... (optional)"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="font-poppins resize-none min-h-[120px] border-gray-200 focus:border-gray-900 transition-colors"
                    maxLength={500}
                  />
                  {formData.description && (
                    <p className="text-xs text-gray-400 font-poppins text-right">
                      {formData.description.length}/500
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6">
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => router.back()}
                  className="font-poppins gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black hover:bg-gray-900 text-white font-poppins font-medium h-12 px-8 shadow-lg hover:shadow-xl transition-all duration-200 gap-2"
                >
                  {isSubmitting ? "Completing..." : "Complete Registration"}
                  {!isSubmitting && <CheckCircle2 className="h-4 w-4" />}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-gray-500 font-poppins mt-6">
          Step 3 of 3 · Almost done! Your profile will be ready after this step
        </p>
      </div>
    </div>
  );
}
