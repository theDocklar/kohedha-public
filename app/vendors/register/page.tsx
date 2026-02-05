"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VendorRegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
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
      // TODO: Replace this with your real vendor registration API call.
      // Example:
      // await fetch("/api/vendors/register", { method: "POST", body: JSON.stringify({ email, password }) });

      console.log("Register vendor:", { email, password });
      // Optionally redirect to login or dashboard after successful registration.
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <div className="max-w-md w-full">
        <Card className="border border-border shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="font-bebas text-3xl tracking-wide text-black">
              Vendor Onboarding
            </CardTitle>
            <CardDescription className="font-poppins text-sm">
              Create your vendor account to showcase your venue and manage your presence on Kohedha.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label className="block text-sm font-medium font-poppins text-black">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="font-poppins"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium font-poppins text-black">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter a secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="font-poppins"
                  required
                />
                <p className="text-xs text-muted-foreground font-poppins">
                  Minimum 8 characters for better security.
                </p>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium font-poppins text-black">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="font-poppins"
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 font-poppins">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full bg-black hover:bg-black/90 text-white font-poppins font-medium mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Create Vendor Account"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col items-center gap-2">
            <p className="text-xs text-muted-foreground font-poppins">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-accent">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-accent">
                Privacy Policy
              </Link>
              .
            </p>
            <p className="text-sm text-muted-foreground font-poppins">
              Already a vendor?{" "}
              <Link href="/vendors/login" className="text-black hover:text-accent font-medium">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}