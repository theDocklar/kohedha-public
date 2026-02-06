"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleSignInButton } from "@/components/vendors/google-signin-button";
import { Mail, Lock, Store } from "lucide-react";

export default function VendorLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (!process.env.NEXT_PUBLIC_API_URL) {
      setError("Login service is not configured. Please try again later.");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/vendor/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email: trimmedEmail, password }),
        },
      );

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        router.push("/vendors/dashboard");
        return;
      }

      if (res.status === 401) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      setError(data.message || "Login failed. Please try again.");
    } catch (err) {
      setError(
        "Unable to reach login service. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 mb-4">
            <Store className="h-5 w-5 text-gray-900" />
            <span className="font-bebas text-xl tracking-wide text-gray-900">
              Kohedha Vendor Portal
            </span>
          </div>
          <h1 className="font-bebas text-5xl tracking-tight text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="font-poppins text-gray-600">
            Sign in to manage your venue and offerings
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 lg:p-10">
            {/* Google Sign In */}
            <div className="mb-6">
              <GoogleSignInButton text="Continue with Google" />
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white font-poppins text-gray-500">
                  Or sign in with email
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6">
              <p className="text-sm text-center text-gray-600 font-poppins">
                New to Kohedha as a vendor?{" "}
                <Link
                  href="/vendors/register"
                  className="text-gray-900 font-semibold hover:text-gray-600 transition-colors"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
