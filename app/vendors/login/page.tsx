"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VendorLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      // TODO: Replace with your real vendor login API call.
      // Example:
      // const res = await fetch("/api/vendors/login", { method: "POST", body: JSON.stringify({ email, password }) });

      console.log("Login vendor:", { email, password });
      // Optionally redirect to vendor dashboard after successful login.
    } catch (err) {
      setError("Invalid credentials. Please try again.");
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
              Vendor Login
            </CardTitle>
            <CardDescription className="font-poppins text-sm">
              Access your vendor dashboard to manage your venue, deals, and events on Kohedha.
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground font-poppins">
              New to Kohedha as a vendor?{" "}
              <Link href="/vendors/register" className="text-black hover:text-accent font-medium">
                Create a vendor account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}