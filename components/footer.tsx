import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="font-bebas text-3xl text-primary-foreground tracking-wider mb-4">
              ko<span className="text-accent">|</span>HEDHA
            </div>
            <p className="font-playfair italic text-lg text-primary-foreground/80 mb-6">
              "More than a guide — we're your local vibe compass."
            </p>
            <p className="font-poppins text-primary-foreground/70 text-sm leading-relaxed">
              Discover the soul of Sri Lanka through its flavors, celebrations, and hidden gems. Your trusted companion
              for authentic culinary adventures.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bebas text-xl text-primary-foreground tracking-wide mb-4">EXPLORE</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="font-poppins text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  Discovery Feed
                </Link>
              </li>
              <li>
                <Link
                  href="/deals"
                  className="font-poppins text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  Current Deals
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="font-poppins text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-poppins text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bebas text-xl text-primary-foreground tracking-wide mb-4">CONNECT</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="font-poppins text-primary-foreground/80 text-sm">123 Galle Road, Colombo 03</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="font-poppins text-primary-foreground/80 text-sm">+94 11 234 5678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="font-poppins text-primary-foreground/80 text-sm">hello@kohedha.lk</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="font-poppins font-medium text-primary-foreground mb-3 text-sm">Follow Us</h4>
              <div className="flex space-x-3">
                <Button variant="ghost" size="sm" className="text-accent hover:text-accent hover:bg-accent/10 p-2">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-accent hover:text-accent hover:bg-accent/10 p-2">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-accent hover:text-accent hover:bg-accent/10 p-2">
                  <Twitter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bebas text-xl text-primary-foreground tracking-wide mb-4">STAY UPDATED</h3>
            <p className="font-poppins text-primary-foreground/70 text-sm mb-4">
              Get the latest food trends, exclusive deals, and event updates delivered to your inbox.
            </p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent"
              />
              <Button
                size="sm"
                className="w-full bg-black hover:bg-black/90 text-white font-poppins font-medium"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="font-poppins text-primary-foreground/70 text-sm">© 2024 ko|HEDHA. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href="/privacy"
                className="font-poppins text-primary-foreground/70 hover:text-accent transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="font-poppins text-primary-foreground/70 hover:text-accent transition-colors text-sm"
              >
                Terms of Service
              </Link>
              <div className="flex items-center space-x-1 text-primary-foreground/70">
                <span className="font-poppins text-sm">Made with</span>
                <Heart className="h-3 w-3 text-accent" />
                <span className="font-poppins text-sm">in Sri Lanka</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
