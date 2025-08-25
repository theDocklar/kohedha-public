import Link from "next/link"
import Image from "next/image"
import { Star, MapPin, Tag, Calendar, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getDeals } from "@/lib/sanity-deals"
import StructuredData from "@/components/structured-data"

interface Deal {
  id: string
  name: string
  description: string
  image: string
  rating?: number
  redirectLink?: string
  formattedAddress: string
  category: string
  categoryColor?: string
  status: string
  featured: boolean
  validCoupons: any[]
  publishedAt?: string
}

export const metadata = {
  title: "Deals & Offers | Kohedha",
  description: "Discover amazing deals and offers on restaurants, food, and entertainment in Sri Lanka. Save money with exclusive coupons and discounts.",
  keywords: [
    "Sri Lanka deals",
    "restaurant deals Sri Lanka", 
    "food offers Colombo",
    "discount coupons Sri Lanka",
    "restaurant coupons",
    "food discounts",
    "dining deals Sri Lanka",
    "special offers restaurants"
  ],
  openGraph: {
    title: "Deals & Offers | Kohedha",
    description: "Discover amazing deals and offers on restaurants, food, and entertainment in Sri Lanka.",
    type: "website",
    url: "https://kohedha.lk/deals",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deals & Offers | Kohedha", 
    description: "Discover amazing deals and offers on restaurants, food, and entertainment in Sri Lanka.",
  },
}

export default async function DealsPage() {
  // Fetch all deals from Sanity
  const allDeals = await getDeals()
  
  // Separate featured and regular deals
  const featuredDeals = allDeals.filter((deal: Deal) => deal.featured)
  const regularDeals = allDeals.filter((deal: Deal) => !deal.featured)

  return (
    <div className="min-h-screen bg-white text-black">
      <StructuredData type="website" data={{}} />

      {/* Hero Section */}
      <section className="bg-black text-white py-16 mt-10">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Exclusive Deals & Offers
            </h1>
            <p className="text-lg text-gray-400 mb-6">
              Save money on your favorite restaurants and experiences across Sri Lanka with our exclusive deals and discount coupons.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Tag className="w-4 h-4 mr-1" />
                Restaurant Discounts
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Tag className="w-4 h-4 mr-1" />
                Food Offers
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Tag className="w-4 h-4 mr-1" />
                Exclusive Coupons
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container px-4 py-12">
        {/* Featured Deals */}
        {featuredDeals.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Featured Deals</h2>
              <Badge variant="outline" className="text-black border-black">
                <Star className="w-4 h-4 mr-1" />
                Featured
              </Badge>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDeals.map((deal: Deal) => (
                <DealCard key={deal.id} deal={deal} featured={true} />
              ))}
            </div>
          </section>
        )}

        {/* All Deals */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">All Deals</h2>
            <div className="text-sm text-gray-600">
              {allDeals.length} deals available
            </div>
          </div>

          {allDeals.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <Tag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-bold mb-2">No deals available yet</h3>
                <p className="text-gray-600 mb-6">
                  Check back soon for amazing deals and offers on restaurants and food experiences across Sri Lanka.
                </p>
                <Button asChild>
                  <Link href="/blog">Read Our Blogs</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularDeals.map((deal: Deal) => (
                <DealCard key={deal.id} deal={deal} featured={false} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* CTA Section */}
    
    </div>
  )
}

// Deal Card Component
function DealCard({ deal, featured }: { deal: Deal; featured: boolean }) {
  const primaryCoupon = deal.validCoupons?.[0]
  
  return (
    <div className={`group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg ${
      featured ? 'ring-2 ring-black' : ''
    }`}>
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={deal.image || "/placeholder.svg"}
          alt={deal.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
          {deal.category || 'Deal'}
        </div>
        {featured && (
          <div className="absolute right-4 top-4 rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold group-hover:text-gray-700 transition-colors">
            {deal.name}
          </h3>
          {deal.rating && (
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{deal.rating}</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {deal.description}
        </p>

        {deal.formattedAddress && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{deal.formattedAddress}</span>
          </div>
        )}

        {/* Primary Coupon */}
        {primaryCoupon && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-800 text-sm">
                  {primaryCoupon.discount}
                </div>
                {primaryCoupon.code && (
                  <div className="text-xs text-gray-600">
                    Code: {primaryCoupon.code}
                  </div>
                )}
              </div>
              <Tag className="w-5 h-5 text-gray-600" />
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

        {/* Publication Date */}
        {deal.publishedAt && (
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
            <Calendar className="w-3 h-3" />
            <span>Published {new Date(deal.publishedAt).toLocaleDateString()}</span>
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
  )
}
