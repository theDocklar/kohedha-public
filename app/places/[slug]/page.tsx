import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Star, MapPin, Tag, Calendar, Clock, Phone, Mail, Globe, Facebook, Instagram, Twitter, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getPlace } from "@/lib/sanity-places"
import { PortableText } from "@portabletext/react"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import StructuredData from "@/components/structured-data"

interface PlacePageProps {
  params: { slug: string }
}

// Generate metadata for the place page
export async function generateMetadata({ params }: PlacePageProps): Promise<Metadata> {
  const place = await getPlace(params.slug)
  
  if (!place) {
    return {
      title: 'Place Not Found',
      description: 'The requested place could not be found.',
    }
  }

  return {
    title: place.name,
    description: place.description || `Visit ${place.name} in Sri Lanka. Discover amazing restaurants and cafes with Kohedha.`,
    keywords: [
      place.category,
      'Sri Lanka',
      'restaurants',
      'cafes',
      'dining',
      'food',
      'local places',
      ...(place.cuisine || []),
      ...(place.tags || []),
    ],
    authors: [{ name: 'Kohedha Team' }],
    openGraph: {
      title: place.name,
      description: place.description || `Visit ${place.name} in Sri Lanka.`,
      type: 'website',
      url: `https://kohedha.lk/places/${place.id}`,
      images: [
        {
          url: place.image,
          width: 1200,
          height: 630,
          alt: place.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: place.name,
      description: place.description || `Visit ${place.name} in Sri Lanka.`,
      images: [place.image],
      creator: '@kohedha',
    },
    alternates: {
      canonical: `/places/${place.id}`,
    },
  }
}

export default async function PlacePage({ params }: PlacePageProps) {
  // Fetch the place data from Sanity
  const place = await getPlace(params.slug)
  
  // If place doesn't exist, show 404
  if (!place) {
    notFound()
  }

  const getPriceRangeLabel = (range?: string) => {
    if (!range) return ''
    const labels: { [key: string]: string } = {
      'budget': 'Under LKR 1,000',
      'moderate': 'LKR 1,000 - 3,000',
      'expensive': 'LKR 3,000 - 7,000',
      'fine-dining': 'Above LKR 7,000',
    }
    return labels[range] || range
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <StructuredData type="organization" data={place} />
      
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
              <Link href="/deals" className="hover:text-gray-300 transition-colors">
                Deals
              </Link>
              <Link href="/places" className="text-white border-b-2 border-white">
                Places
              </Link>
            </nav>
            <Button
              variant="outline"
              size="sm"
              className="border-white text-white hover:bg-white hover:text-black"
              asChild
            >
              <Link href="/places" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Places
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Place Hero */}
      <div className="relative h-[40vh] w-full overflow-hidden md:h-[50vh]">
        <Image src={place.image || "/placeholder.svg"} alt={place.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container px-4 text-center text-white">
            <div className="mb-4 flex justify-center gap-2">
              <Badge className="bg-black px-3 py-1 text-sm font-medium" style={place.categoryColor ? { backgroundColor: place.categoryColor } : {}}>
                {place.category}
              </Badge>
              {place.featured && (
                <Badge className="bg-black px-3 py-1 text-sm font-medium">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
              {place.isOpen !== null && (
                <Badge className={`px-3 py-1 text-sm font-medium ${
                  place.isOpen ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {place.isOpen ? 'Open Now' : 'Closed'}
                </Badge>
              )}
            </div>
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">{place.name}</h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              {place.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{place.rating} stars</span>
                </div>
              )}
              {place.formattedLocation && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{place.formattedLocation}</span>
                </div>
              )}
              {place.priceRange && (
                <div className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  <span>{getPriceRangeLabel(place.priceRange)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Place Content */}
      <div className="container px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              
              {/* Description */}
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">About This Place</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{place.description}</p>
              </div>

              {/* Detailed Description */}
              {place.body && (
                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-bold">More Details</h2>
                  <div className="prose prose-lg max-w-none">
                    <PortableText value={place.body} />
                  </div>
                </div>
              )}

              {/* Cuisine Types */}
              {place.cuisine && place.cuisine.length > 0 && (
                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-bold">Cuisine</h2>
                  <div className="flex flex-wrap gap-2">
                    {place.cuisine.map((cuisine: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-sm px-3 py-1">
                        {cuisine}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Features & Amenities */}
              {place.features && place.features.length > 0 && (
                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-bold">Features & Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {place.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="capitalize">{feature.replace(/-/g, ' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Images */}
              {place.images && place.images.length > 0 && (
                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-bold">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {place.images.map((image: any, index: number) => (
                      <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                        <Image
                          src={image.url || "/placeholder.svg"}
                          alt={image.alt || place.name}
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
              
              {/* Place Information Card */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Place Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  {/* Location */}
                  {place.location && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Location
                      </h4>
                      <div className="text-sm text-gray-600">
                        {place.location.name && <div className="font-medium">{place.location.name}</div>}
                        {place.location.address && <div>{place.location.address}</div>}
                        {place.location.city && <div>{place.location.city}</div>}
                        {place.location.district && <div>{place.location.district}</div>}
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Opening Hours */}
                  {place.openingHours && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Opening Hours
                      </h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        {Object.entries(place.openingHours).map(([day, hours]: [string, any]) => (
                          <div key={day} className="flex justify-between">
                            <span className="capitalize font-medium">{day}:</span>
                            <span>{hours || 'Closed'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Price Range */}
                  {place.priceRange && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Price Range
                      </h4>
                      <div className="text-sm text-gray-600">
                        {getPriceRangeLabel(place.priceRange)}
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Rating */}
                  {place.rating && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        Rating
                      </h4>
                      <div className="text-sm text-gray-600">
                        {place.rating} out of 5 stars
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Tags */}
                  {place.tags && place.tags.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {place.tags.map((tag: string, index: number) => (
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
              {place.contactInfo && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {place.contactInfo.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <a href={`tel:${place.contactInfo.phone}`} className="text-blue-600 hover:underline">
                          {place.contactInfo.phone}
                        </a>
                      </div>
                    )}
                    {place.contactInfo.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <a href={`mailto:${place.contactInfo.email}`} className="text-blue-600 hover:underline">
                          {place.contactInfo.email}
                        </a>
                      </div>
                    )}
                    {place.contactInfo.whatsapp && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-green-500" />
                        <a href={`https://wa.me/${place.contactInfo.whatsapp}`} className="text-green-600 hover:underline">
                          WhatsApp: {place.contactInfo.whatsapp}
                        </a>
                      </div>
                    )}
                    {place.contactInfo.website && (
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <a href={place.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Visit Website
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Social Links */}
              {place.socialLinks && (
                <Card>
                  <CardHeader>
                    <CardTitle>Follow & Share</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {place.socialLinks.facebook && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={place.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                            <Facebook className="w-4 h-4 mr-2" />
                            Facebook
                          </a>
                        </Button>
                      )}
                      {place.socialLinks.instagram && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={place.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                            <Instagram className="w-4 h-4 mr-2" />
                            Instagram
                          </a>
                        </Button>
                      )}
                      {place.socialLinks.twitter && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={place.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                            <Twitter className="w-4 h-4 mr-2" />
                            Twitter
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

