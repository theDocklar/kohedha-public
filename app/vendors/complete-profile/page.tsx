"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type VendorProfileForm = {
  email: string;
  companyName: string;
  businessRegistrationNo: string;
  vendorMobile: string;
  locationBusinessName: string;
  streetAddress: string;
  city: string;
  district: string;
  postalCode: string;
  country: string;
  businessCategory: string;
  website: string;
  description: string;
};

export default function VendorCompleteProfilePage() {
  // In a real app you would pre-fill these from your API using the logged-in vendor
  const [formData, setFormData] = useState<VendorProfileForm>({
    email: "vendor@example.com",
    companyName: "",
    businessRegistrationNo: "",
    vendorMobile: "",
    locationBusinessName: "",
    streetAddress: "",
    city: "",
    district: "",
    postalCode: "",
    country: "Sri Lanka",
    businessCategory: "",
    website: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (field: keyof VendorProfileForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Basic validation rules – you can tighten these as needed
    if (!formData.companyName || !formData.vendorMobile || !formData.city || !formData.businessCategory) {
      setError("Please fill in all required fields marked with *.");
      return;
    }

    try {
      setIsSubmitting(true);
      // TODO: Call your API to update the Vendor document using this structure:
      // {
      //   email,
      //   companyName,
      //   businessRegistrationNo,
      //   vendorMobile,
      //   location: {
      //     businessName: locationBusinessName,
      //     streetAddress,
      //     city,
      //     district,
      //     postalCode,
      //     country,
      //   },
      //   businessCategory,
      //   website,
      //   description,
      // }

      console.log("Submit vendor profile:", formData);
      setSuccess("Profile details saved successfully. Your profile will appear more prominently to Kohedha users.");
    } catch (err) {
      setError("Something went wrong while saving your profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/10 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <Card className="border border-border shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="font-bebas text-3xl tracking-wide text-black">
              Complete Your Vendor Profile
            </CardTitle>
            <CardDescription className="font-poppins text-sm">
              Add your business details so guests can easily discover and trust your venue on Kohedha.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Account section */}
              <section className="space-y-3">
                <h2 className="font-bebas text-xl tracking-wide text-black">
                  Account
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium font-poppins text-black">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="font-poppins"
                      disabled
                    />
                    <p className="text-xs text-muted-foreground font-poppins">
                      Email is managed from your login details.
                    </p>
                  </div>
                </div>
              </section>

              {/* Business details section */}
              <section className="space-y-3">
                <h2 className="font-bebas text-xl tracking-wide text-black">
                  Business Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium font-poppins text-black">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Sunset Rooftop Lounge"
                      value={formData.companyName}
                      onChange={(e) => handleChange("companyName", e.target.value)}
                      className="font-poppins"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium font-poppins text-black">
                      Business Registration No.
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. BR-123456"
                      value={formData.businessRegistrationNo}
                      onChange={(e) => handleChange("businessRegistrationNo", e.target.value)}
                      className="font-poppins"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium font-poppins text-black">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="tel"
                      placeholder="e.g. +94 77 123 4567"
                      value={formData.vendorMobile}
                      onChange={(e) => handleChange("vendorMobile", e.target.value)}
                      className="font-poppins"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium font-poppins text-black">
                      Business Category <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Restaurant, Bar, Café, Event Venue"
                      value={formData.businessCategory}
                      onChange={(e) => handleChange("businessCategory", e.target.value)}
                      className="font-poppins"
                      required
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="block text-sm font-medium font-poppins text-black">
                      Website
                    </label>
                    <Input
                      type="url"
                      placeholder="https://yourvenue.lk"
                      value={formData.website}
                      onChange={(e) => handleChange("website", e.target.value)}
                      className="font-poppins"
                    />
                  </div>
                </div>
              </section>

              {/* Location section */}
              <section className="space-y-3">
                <h2 className="font-bebas text-xl tracking-wide text-black">
                  Location
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1 md:col-span-2">
                    <label className="block text-sm font-medium font-poppins text-black">
                      Business Name at Location
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Kohedha Rooftop – Galle Face"
                      value={formData.locationBusinessName}
                      onChange={(e) => handleChange("locationBusinessName", e.target.value)}
                      className="font-poppins"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="block text-sm font-medium font-poppins text-black">
                      Street Address
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. 123 Galle Road"
                      value={formData.streetAddress}
                      onChange={(e) => handleChange("streetAddress", e.target.value)}
                      className="font-poppins"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium font-poppins text-black">
                      City <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Colombo"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      className="font-poppins"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium font-poppins text-black">
                      District
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Colombo District"
                      value={formData.district}
                      onChange={(e) => handleChange("district", e.target.value)}
                      className="font-poppins"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium font-poppins text-black">
                      Postal Code
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. 00300"
                      value={formData.postalCode}
                      onChange={(e) => handleChange("postalCode", e.target.value)}
                      className="font-poppins"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium font-poppins text-black">
                      Country
                    </label>
                    <Input
                      type="text"
                      value={formData.country}
                      onChange={(e) => handleChange("country", e.target.value)}
                      className="font-poppins"
                    />
                  </div>
                </div>
              </section>

              {/* Description section */}
              <section className="space-y-3">
                <h2 className="font-bebas text-xl tracking-wide text-black">
                  Story & Description
                </h2>
                <div className="space-y-1">
                  <label className="block text-sm font-medium font-poppins text-black">
                    Description
                  </label>
                  <Textarea
                    placeholder="Tell guests what makes your venue special – atmosphere, cuisine, signature experiences, and more."
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="font-poppins min-h-[120px]"
                  />
                  <p className="text-xs text-muted-foreground font-poppins">
                    This description appears on your public profile and helps guests decide to visit.
                  </p>
                </div>
              </section>

              {error && (
                <p className="text-sm text-red-600 font-poppins">
                  {error}
                </p>
              )}

              {success && (
                <p className="text-sm text-emerald-600 font-poppins">
                  {success}
                </p>
              )}

              <div className="flex items-center justify-between gap-4">
                <Button
                  type="submit"
                  className="bg-black hover:bg-black/90 text-white font-poppins font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Profile"}
                </Button>

                <Link href="/vendors/dashboard" className="text-sm font-poppins text-muted-foreground hover:text-black">
                  Back to Dashboard
                </Link>
              </div>
            </form>
          </CardContent>

          <CardFooter className="px-6 pb-6 pt-0">
            <p className="text-xs text-muted-foreground font-poppins">
              Once your profile is complete, we&apos;ll highlight your venue more prominently across Kohedha to help you
              reach the right guests.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

