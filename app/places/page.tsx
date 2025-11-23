import Link from "next/link"
import Image from "next/image"
import { Star, MapPin, Tag, Calendar, ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getPlaces } from "@/lib/sanity-places"
import StructuredData from "@/components/structured-data"

interface Place {
  id: string
  name: string
  description: string
  image: string
  rating?: number
  priceRange?: string
  cuisine?: string[]
  formattedLocation: string
  category: string
  categoryColor?: string
  status: string
  featured: boolean
  isOpen: boolean | null
  publishedAt?: string
}

export const metadata = {
  title: "Places & Venues | Kohedha",
  description: "Discover amazing restaurants, cafes, and dining venues across Sri Lanka. Find the perfect place for your next meal or coffee break.",
  keywords: [
    "Sri Lanka restaurants",
    "Colombo cafes", 
    "Sri Lankan dining",
    "restaurants Sri Lanka",
    "cafes Colombo",
    "food venues",
    "dining places Sri Lanka",
    "best restaurants"
  ],
  openGraph: {
    title: "Places & Venues | Kohedha",
    description: "Discover amazing restaurants, cafes, and dining venues across Sri Lanka.",
    type: "website",
    url: "https://kohedha.lk/places",
  },
  twitter: {
    card: "summary_large_image",
    title: "Places & Venues | Kohedha", 
    description: "Discover amazing restaurants, cafes, and dining venues across Sri Lanka.",
  },
}

export default async function PlacesPage() {
  // Fetch all places from Sanity
  const allPlaces = await getPlaces()
  
  // Separate featured and regular places
  const featuredPlaces = allPlaces.filter((place: Place) => place.featured)
  const regularPlaces = allPlaces.filter((place: Place) => !place.featured)

  return (
    <div className="min-h-screen bg-white text-black">
      <StructuredData type="website" data={{}} />

      {/* Hero Section */}
      <section className="bg-black text-white py-16 mt-10">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Places & Venues
            </h1>
            <p className="text-lg text-gray-400 mb-6">
              Discover amazing restaurants, cafes, and dining venues across Sri Lanka. Find the perfect place for your next meal or coffee break.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Tag className="w-4 h-4 mr-1" />
                Restaurants
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Tag className="w-4 h-4 mr-1" />
                Cafes
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Tag className="w-4 h-4 mr-1" />
                Dining Venues
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container px-4 py-12">
        {/* Featured Places */}
        {featuredPlaces.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Featured Places</h2>
              <Badge variant="outline" className="text-black border-black">
                <Star className="w-4 h-4 mr-1" />
                Featured
              </Badge>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPlaces.map((place: Place) => (
                <PlaceCard key={place.id} place={place} featured={true} />
              ))}
            </div>
          </section>
        )}

        {/* All Places */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">All Places</h2>
            <div className="text-sm text-gray-600">
              {allPlaces.length} places available
            </div>
          </div>

          {allPlaces.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-bold mb-2">No places available yet</h3>
                <p className="text-gray-600 mb-6">
                  Check back soon for amazing restaurants and cafes across Sri Lanka.
                </p>
                <Button asChild>
                  <Link href="/blog">Read Our Blogs</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPlaces.map((place: Place) => (
                <PlaceCard key={place.id} place={place} featured={false} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

// Place Card Component
function PlaceCard({ place, featured }: { place: Place; featured: boolean }) {
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
    <div className={`group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg ${
      featured ? 'ring-2 ring-black' : ''
    }`}>
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={place.image || "/placeholder.svg"}
          alt={place.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
          {place.category || 'Place'}
        </div>
        {featured && (
          <div className="absolute right-4 top-4 rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </div>
        )}
        {place.isOpen !== null && (
          <div className={`absolute right-4 bottom-4 rounded-full px-3 py-1 text-xs font-medium text-white ${
            place.isOpen ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {place.isOpen ? 'Open Now' : 'Closed'}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold group-hover:text-gray-700 transition-colors">
            {place.name}
          </h3>
          {place.rating && (
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{place.rating}</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {place.description}
        </p>

        {place.formattedLocation && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{place.formattedLocation}</span>
          </div>
        )}

        {/* Cuisine Tags */}
        {place.cuisine && place.cuisine.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {place.cuisine.slice(0, 2).map((cuisine: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {cuisine}
              </Badge>
            ))}
            {place.cuisine.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{place.cuisine.length - 2} more
              </Badge>
            )}
          </div>
        )}

        {/* Price Range */}
        {place.priceRange && (
          <div className="mb-4">
            <div className="text-sm text-gray-600">
              <span className="font-semibold">Price Range:</span> {getPriceRangeLabel(place.priceRange)}
            </div>
          </div>
        )}

        {/* Publication Date */}
        {place.publishedAt && (
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
            <Calendar className="w-3 h-3" />
            <span>Published {new Date(place.publishedAt).toLocaleDateString()}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {place.status === 'open' ? 'Open' : place.status}
          </div>
          <Link
            href={`/places/${place.id}`}
            className="flex items-center gap-1 text-sm font-medium text-black transition-colors group-hover:text-gray-700"
          >
            View Details
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}

