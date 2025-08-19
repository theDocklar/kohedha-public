import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Star, MapPin, Tag, Calendar, Clock, Phone, Mail, Globe, Facebook, Instagram, Twitter, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getDeal } from "@/lib/sanity-deals"
import { PortableText } from "@portabletext/react"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import StructuredData from "@/components/structured-data"

interface DealPageProps {
  params: { slug: string }
}

// Generate metadata for the deal page
export async function generateMetadata({ params }: DealPageProps): Promise<Metadata> {
  const deal = await getDeal(params.slug)
  
  if (!deal) {
    return {
      title: 'Deal Not Found',
      description: 'The requested deal could not be found.',
    }
  }

  return {
    title: deal.name,
    description: deal.description || `Get amazing deals and discounts on ${deal.name} in Sri Lanka. Save money with exclusive offers and coupons.`,
    keywords: [
      deal.category,
      'Sri Lanka deals',
      'restaurant deals',
      'food discounts',
      'coupons',
      'offers',
      ...(deal.tags || []),
    ],
    authors: [{ name: 'Kohedha Team' }],
    openGraph: {
      title: deal.name,
      description: deal.description || `Get amazing deals and discounts on ${deal.name} in Sri Lanka.`,
      type: 'website',
      url: `https://kohedha.lk/deals/${deal.id}`,
      images: [
        {
          url: deal.image,
          width: 1200,
          height: 630,
          alt: deal.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: deal.name,
      description: deal.description || `Get amazing deals and discounts on ${deal.name} in Sri Lanka.`,
      images: [deal.image],
      creator: '@kohedha',
    },
    alternates: {
      canonical: `/deals/${deal.id}`,
    },
  }
}

export default async function DealPage({ params }: DealPageProps) {
  // Fetch the deal data from Sanity
  const deal = await getDeal(params.slug)
  
  // If deal doesn't exist, show 404
  if (!deal) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <StructuredData type="organization" data={deal} />
      
      {/* Header */}
      <header className="bg-black py-6 text-white">
        <div className="container px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              KOHEDHA
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="hover:text-gray-300 transition-colors">
                Home
              </Link>
              <Link href="/blog" className="hover:text-gray-300 transition-colors">
                Blog
              </Link>
              <Link href="/events" className="hover:text-gray-300 transition-colors">
                Events
              </Link>
              <Link href="/deals" className="text-white border-b-2 border-white">
                Deals
              </Link>
            </nav>
            <Button
              variant="outline"
              size="sm"
              className="border-white text-white hover:bg-white hover:text-black"
              asChild
            >
              <Link href="/deals" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Deals
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Deal Hero */}
      <div className="relative h-[40vh] w-full overflow-hidden md:h-[50vh]">
        <Image src={deal.image || "/placeholder.svg"} alt={deal.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container px-4 text-center text-white">
            <div className="mb-4 flex justify-center gap-2">
              <Badge className="bg-black px-3 py-1 text-sm font-medium" style={deal.categoryColor ? { backgroundColor: deal.categoryColor } : {}}>
                {deal.category}
              </Badge>
              {deal.featured && (
                <Badge className="bg-black px-3 py-1 text-sm font-medium">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">{deal.name}</h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              {deal.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{deal.rating} stars</span>
                </div>
              )}
              {deal.formattedAddress && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{deal.formattedAddress}</span>
                </div>
              )}
              {deal.publishedDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Published {deal.publishedDate}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Deal Content */}
      <div className="container px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              
              {/* Deal Status */}
              <div className="mb-8">
                <Badge 
                  variant="default"
                  className="text-lg px-4 py-2 bg-black text-white"
                >
                  {deal.status === 'active' ? '🎉 Active Deal' : 
                   deal.status === 'expired' ? '❌ Expired' :
                   deal.status === 'coming-soon' ? '🔜 Coming Soon' :
                   deal.status === 'sold-out' ? '🚫 Sold Out' : '⏸️ Paused'}
                </Badge>
              </div>

              {/* Redeem Now Button */}
              {deal.redirectLink && (
                <div className="mb-8">
                  <Button 
                    asChild 
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-8 py-6"
                  >
                    <a 
                      href={deal.redirectLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3"
                    >
                      <ExternalLink className="w-6 h-6" />
                      Redeem Now
                    </a>
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">
                    Click to visit the deal site and redeem your offer
                  </p>
                </div>
              )}

              {/* Description */}
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">About This Deal</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{deal.description}</p>
              </div>

              {/* Coupons & Offers */}
              {deal.validCoupons && deal.validCoupons.length > 0 && (
                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-bold">Available Offers</h2>
                  <div className="grid gap-4">
                    {deal.validCoupons.map((coupon: any, index: number) => (
                      <CouponCard key={index} coupon={coupon} />
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Notes */}
              {deal.notes && (
                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-bold">Terms & Conditions</h2>
                  <div className="prose prose-lg max-w-none">
                    <PortableText value={deal.notes} />
                  </div>
                </div>
              )}

              {/* Additional Images */}
              {deal.images && deal.images.length > 0 && (
                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-bold">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {deal.images.map((image: any, index: number) => (
                      <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                        <Image
                          src={image.url || "/placeholder.svg"}
                          alt={image.alt || deal.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              
              {/* Deal Information Card */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Deal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  {/* Redeem Now Button */}
                  {deal.redirectLink && (
                    <div>
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

                  {/* Address */}
                  {deal.address && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Location
                      </h4>
                      <div className="text-sm text-white">
                        {deal.address.street && <div>{deal.address.street}</div>}
                        {deal.address.city && <div>{deal.address.city}</div>}
                        {deal.address.district && <div>{deal.address.district}</div>}
                        {deal.address.country && <div>{deal.address.country}</div>}
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Validity Information */}
                  {deal.couponValidityInfo && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Validity
                      </h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        {deal.couponValidityInfo.startDate && (
                          <div>From: {new Date(deal.couponValidityInfo.startDate).toLocaleDateString()}</div>
                        )}
                        {deal.couponValidityInfo.endDate && (
                          <div>Until: {new Date(deal.couponValidityInfo.endDate).toLocaleDateString()}</div>
                        )}
                        {deal.couponValidityInfo.validDays && deal.couponValidityInfo.validDays.length > 0 && (
                          <div>Valid on: {deal.couponValidityInfo.validDays.join(', ')}</div>
                        )}
                        {deal.couponValidityInfo.validHours && (
                          <div>Hours: {deal.couponValidityInfo.validHours.start} - {deal.couponValidityInfo.validHours.end}</div>
                        )}
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Tags */}
                  {deal.tags && deal.tags.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {deal.tags.map((tag: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contact Information */}
              {deal.contactInfo && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {deal.contactInfo.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <a href={`tel:${deal.contactInfo.phone}`} className="text-blue-600 hover:underline">
                          {deal.contactInfo.phone}
                        </a>
                      </div>
                    )}
                    {deal.contactInfo.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <a href={`mailto:${deal.contactInfo.email}`} className="text-blue-600 hover:underline">
                          {deal.contactInfo.email}
                        </a>
                      </div>
                    )}
                    {deal.contactInfo.whatsapp && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-green-500" />
                        <a href={`https://wa.me/${deal.contactInfo.whatsapp}`} className="text-green-600 hover:underline">
                          WhatsApp: {deal.contactInfo.whatsapp}
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Social Links */}
              {deal.socialLinks && (
                <Card>
                  <CardHeader>
                    <CardTitle>Follow & Share</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {deal.socialLinks.facebook && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={deal.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                            <Facebook className="w-4 h-4 mr-2" />
                            Facebook
                          </a>
                        </Button>
                      )}
                      {deal.socialLinks.instagram && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={deal.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                            <Instagram className="w-4 h-4 mr-2" />
                            Instagram
                          </a>
                        </Button>
                      )}
                      {deal.socialLinks.website && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={deal.socialLinks.website} target="_blank" rel="noopener noreferrer">
                            <Globe className="w-4 h-4 mr-2" />
                            Website
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Coupon Card Component
function CouponCard({ coupon }: { coupon: any }) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Tag className="w-6 h-6 text-gray-600" />
            <span className="text-2xl font-bold text-gray-800">{coupon.discount}</span>
          </div>
          {coupon.code && (
            <Button
              variant="outline" 
              size="sm"
              onClick={() => copyToClipboard(coupon.code)}
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              <Copy className="w-4 h-4 mr-2" />
              {coupon.code}
            </Button>
          )}
        </div>
        
        <div className="text-sm text-gray-700 space-y-1">
          {coupon.minimumSpend && (
            <div>Minimum spend: LKR {coupon.minimumSpend}</div>
          )}
          {coupon.maxDiscount && (
            <div>Maximum discount: LKR {coupon.maxDiscount}</div>
          )}
          {coupon.usageLimit && (
            <div>Usage limit: {coupon.usageLimit} times</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
