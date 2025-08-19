import LandingHero from "@/components/landing-hero";
import LatestPosts from "@/components/latest-posts";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedDeals } from "@/lib/sanity-deals";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Tag, ArrowRight, ExternalLink } from "lucide-react";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Navigation Bar */}
      <nav className="bg-black border-b border-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white">
              KOHEDHA
            </Link>
            <div className="flex items-center space-x-8">
              <Link 
                href="/blog" 
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                Blog
              </Link>
              <Link 
                href="/events" 
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                Events
              </Link>
              <Link 
                href="/deals" 
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                Deals
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section (Client Component) */}
      <LandingHero />

      {/* Features Section */}
      <section id="features" className="py-24 bg-white text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Discover What Kohedha Offers</h2>
            <p className="text-gray-600">
              Explore the powerful features that make Kohedha the ultimate companion for food and event enthusiasts in Sri Lanka.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature cards here, static content as before */}
            <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Discovery</h3>
              <p className="text-gray-600">Find restaurants and events tailored to your preferences.</p>
            </div>
            <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Restaurant Insights</h3>
              <p className="text-gray-600">Get detailed information about menus, pricing, and ambiance.</p>
            </div>
            <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Event Calendar</h3>
              <p className="text-gray-600">Stay updated with the latest cultural and food events.</p>
            </div>
          </div>
        </div>
      </section>

      {/* App Preview Section (static) */}
      <section className="py-24 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience Sri Lanka Like Never Before</h2>
              <p className="text-gray-400 mb-8">Whether you're a local or a tourist, Kohedha helps you discover hidden gems and popular hotspots across the island.</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3"><span className="mt-1 w-5 h-5 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0">✓</span><span className="text-gray-300">Real-time updates on restaurant availability</span></li>
                <li className="flex items-start gap-3"><span className="mt-1 w-5 h-5 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0">✓</span><span className="text-gray-300">Exclusive deals and discounts</span></li>
                <li className="flex items-start gap-3"><span className="mt-1 w-5 h-5 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0">✓</span><span className="text-gray-300">Personalized recommendations</span></li>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="relative w-64 md:w-72 overflow-hidden rounded-3xl border border-gray-800 bg-black shadow-xl">
                <Image src="/phonescreen.png?height=800&width=450" alt="Kohedha App Interface" width={450} height={800} className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Deals Section */}
      <FeaturedDealsSection />

      {/* Blog Section (Server Component) */}
      <LatestPosts />

      {/* Download Section (static) */}
      <section id="download" className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Download Kohedha Today</h2>
            <p className="text-gray-400 mb-10">Join thousands of users who are already discovering the best of Sri Lanka's food and entertainment scene.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="#" className="transition-transform hover:scale-105">
                <Image src="/app-store.png" alt="Download on App Store" width={200} height={60} className="h-[60px] w-[200px] object-contain" />
              </a>
              <a href="#" className="transition-transform hover:scale-105">
                <Image src="/play-store2.png" alt="Get it on Google Play" width={200} height={60} className="h-[60px] w-[200px] object-contain" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (static) */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold">KOHEDHA</h2>
              <p className="mt-2 text-sm text-gray-400">Discover Sri Lanka's best restaurants and events</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">About</Link>
              <Link href="#" className="hover:text-white transition-colors">Features</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Kohedha. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Featured Deals Section Component
async function FeaturedDealsSection() {
  const featuredDeals = await getFeaturedDeals()

  if (featuredDeals.length === 0) {
    return null // Don't show section if no featured deals
  }

  return (
    <section className="py-24 bg-gray-50 text-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Exclusive Deals & Offers</h2>
          <p className="text-gray-600">
            Save money on your favorite restaurants and experiences with our hand-picked deals and special offers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDeals.slice(0, 3).map((deal: any) => (
            <div
              key={deal.id}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={deal.image || "/placeholder.svg"}
                  alt={deal.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                  {deal.category}
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-black px-3 py-1 text-xs font-medium text-white flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Featured
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-gray-700 transition-colors">
                  {deal.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {deal.description}
                </p>
                
                {/* Primary Coupon Preview */}
                {deal.primaryCoupon && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-gray-600" />
                        <span className="font-semibold text-gray-800 text-sm">
                          {deal.primaryCoupon.discount}
                        </span>
                      </div>
                      {deal.primaryCoupon.code && (
                        <span className="text-xs text-gray-600 font-mono">
                          {deal.primaryCoupon.code}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Redeem Now Button */}
                {deal.redirectLink && (
                  <div className="mb-4">
                    <Button 
                      asChild 
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                    >
                      <a 
                        href={deal.redirectLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Redeem Now
                      </a>
                    </Button>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {deal.status === 'active' ? 'Active Deal' : deal.status}
                  </div>
                  <Link
                    href={`/deals/${deal.id}`}
                    className="flex items-center gap-1 text-sm font-medium text-black transition-colors group-hover:text-gray-700"
                  >
                    View Deal
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            className="bg-black text-white hover:bg-gray-800"
            size="lg"
            asChild
          >
            <Link href="/deals">View All Deals</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
