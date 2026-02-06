"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, Heart, User } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="left-0 right-0  bg-white  backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="font-bebas text-2xl text-black tracking-wider">
              ko<span className="text-accent">|</span>HEDHA
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="font-poppins font-medium text-black hover:text-accent transition-colors"
            >
              Discover
            </Link>
            <Link
              href="/deals"
              className="font-poppins font-medium text-black hover:text-accent transition-colors"
            >
              Deals
            </Link>
            <Link
              href="/events"
              className="block px-3 py-2 font-poppins font-medium text-black hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/about"
              className="font-poppins font-medium text-black hover:text-accent transition-colors"
            >
              About
            </Link>
            {/* <Link
              href="/contact"
              className="font-poppins font-medium text-black hover:text-accent transition-colors"
            >
              Contact
            </Link> */}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-black hover:text-accent"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-black hover:text-accent"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-black hover:text-accent"
            >
              <User className="h-4 w-4" />
            </Button>
            <Link href="/vendors/register">
              <Button
                size="sm"
                className="bg-black hover:bg-black/90 text-white font-poppins font-medium"
              >
                Join as a Vendor
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-black"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              <Link
                href="/"
                className="block px-3 py-2 font-poppins font-medium text-black hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Discover
              </Link>
              <Link
                href="/deals"
                className="block px-3 py-2 font-poppins font-medium text-black hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Deals
              </Link>
              <Link
                href="/events"
                className="block px-3 py-2 font-poppins font-medium text-black hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Events
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 font-poppins font-medium text-black hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              {/* <Link
                href="/contact"
                className="block px-3 py-2 font-poppins font-medium text-black hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link> */}
              <div className="px-3 py-2">
                <Link href="/vendors/register" onClick={() => setIsOpen(false)}>
                  <Button
                    size="sm"
                    className="w-full bg-black hover:bg-black/90 text-white font-poppins font-medium"
                  >
                    Join Community
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
