"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleSignInButton } from "@/components/vendors/google-signin-button";
import { registerVendor } from "@/lib/auth";
import { Store, Mail, Lock, CheckCircle2 } from "lucide-react";

export default function VendorRegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (!process.env.NEXT_PUBLIC_API_URL) {
      setError(
        "Registration service is not configured. Please try again later.",
      );
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await registerVendor(
        trimmedEmail,
        password,
        confirmPassword,
      );

      if (result.success) {
        // Redirect to step 2 to continue registration
        router.push("/vendors/register/step-2");
        return;
      }

      setError(result.error || "Registration failed. Please try again.");
    } catch (err) {
      setError(
        "Unable to reach registration service. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding & Benefits */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <Store className="h-5 w-5 text-gray-900" />
              <span className="font-bebas text-xl tracking-wide text-gray-900">
                Kohedha Vendor Portal
              </span>
            </div>
            <h1 className="font-bebas text-6xl tracking-tight text-gray-900 leading-tight">
              Grow Your Business
              <br />
              <span className="text-gray-600">with Kohedha</span>
            </h1>
            <p className="font-poppins text-lg text-gray-600 max-w-md">
              Join Sri Lanka's premier platform for venues, dining, and
              experiences. Connect with thousands of potential customers.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-1 p-2 bg-green-50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-gray-900 mb-1">
                  Reach More Customers
                </h3>
                <p className="font-poppins text-sm text-gray-600">
                  Showcase your venue to engaged users actively searching for
                  experiences.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 p-2 bg-blue-50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-gray-900 mb-1">
                  Manage Deals & Events
                </h3>
                <p className="font-poppins text-sm text-gray-600">
                  Create promotional offers and event listings with an intuitive
                  dashboard.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 p-2 bg-purple-50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-gray-900 mb-1">
                  Track Performance
                </h3>
                <p className="font-poppins text-sm text-gray-600">
                  Get insights on views, engagement, and customer interactions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Registration Form */}
        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8 lg:p-10">
              <div className="mb-8">
                <h2 className="font-bebas text-4xl tracking-tight text-gray-900 mb-2">
                  Create Your Account
                </h2>
                <p className="font-poppins text-sm text-gray-600">
                  Start showcasing your venue on Kohedha today
                </p>
              </div>

              {/* Google Sign In */}
              <div className="mb-6">
                <GoogleSignInButton text="Sign up with Google" />
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white font-poppins text-gray-500">
                    Or continue with email
                  </span>
                </div>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="block text-sm font-medium font-poppins text-gray-900">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="vendor@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-11 font-poppins h-12 border-gray-200 focus:border-gray-900 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium font-poppins text-gray-900">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Create a secure password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-11 font-poppins h-12 border-gray-200 focus:border-gray-900 transition-colors"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 font-poppins">
                    Minimum 8 characters required
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium font-poppins text-gray-900">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-11 font-poppins h-12 border-gray-200 focus:border-gray-900 transition-colors"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600 font-poppins">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-black hover:bg-gray-900 text-white font-poppins font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Creating account..."
                    : "Create Vendor Account"}
                </Button>
              </form>

              <div className="mt-6 space-y-4">
                <p className="text-xs text-center text-gray-500 font-poppins">
                  By creating an account, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="text-gray-900 underline hover:text-gray-600"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-gray-900 underline hover:text-gray-600"
                  >
                    Privacy Policy
                  </Link>
                </p>

                <p className="text-sm text-center text-gray-600 font-poppins">
                  Already have an account?{" "}
                  <Link
                    href="/vendors/login"
                    className="text-gray-900 font-semibold hover:text-gray-600 transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
