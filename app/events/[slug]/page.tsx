import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, MapPin, User, Phone, Mail, Globe, Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getEvent } from "@/lib/sanity-events"
import { PortableText } from "@portabletext/react"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import StructuredData from "@/components/structured-data"

interface EventPageProps {
  params: { slug: string }
}

// Generate metadata for the event page
export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = await getEvent(params.slug)
  
  if (!event) {
    return {
      title: 'Event Not Found',
      description: 'The requested event could not be found.',
    }
  }

  return {
    title: event.title,
    description: event.description || `Join ${event.title} in Sri Lanka. Discover amazing events and experiences with Kohedha.`,
    keywords: [
      event.category,
      'Sri Lanka',
      'events',
      'entertainment',
      'culture',
      'activities',
      'local events',
      ...(event.location?.name ? [event.location.name] : []),
    ],
    authors: [{ name: event.organizer }],
    openGraph: {
      title: event.title,
      description: event.description || `Join ${event.title} in Sri Lanka.`,
      type: 'website',
      url: `https://kohedha.lk/events/${event.id}`,
      images: [
        {
          url: event.image,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      description: event.description || `Join ${event.title} in Sri Lanka.`,
      images: [event.image],
      creator: '@kohedha',
    },
    alternates: {
      canonical: `/events/${event.id}`,
    },
    other: {
      'event:start_time': event.eventDate,
      'event:end_time': event.eventEndDate,
      'event:location': event.location?.name || '',
      'event:organizer': event.organizer,
      'event:category': event.category,
    },
  }
}

export default async function EventPage({ params }: EventPageProps) {
  // Fetch the event data from Sanity
  const event = await getEvent(params.slug)
  
  // If event doesn't exist, show 404
  if (!event) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <StructuredData type="event" data={event} />
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
              <Link href="/events" className="text-white border-b-2 border-white">
                Events
              </Link>
              <Link href="/deals" className="hover:text-gray-300 transition-colors">
                Deals
              </Link>
            </nav>
            <Button
              variant="outline"
              size="sm"
              className="border-white text-white hover:bg-white hover:text-black"
              asChild
            >
              <Link href="/events" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Events
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Event Hero */}
      <div className="relative h-[40vh] w-full overflow-hidden md:h-[50vh]">
        <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container px-4 text-center text-white">
            <div className="mb-4 inline-block rounded-full bg-black px-3 py-1 text-sm font-medium">{event.category}</div>
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">{event.title}</h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
              {event.location?.name && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Event Content */}
      <div className="container px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">About This Event</h2>
                <p className="text-gray-600">{event.description}</p>
              </div>

              {event.body && (
                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-bold">Event Details</h2>
                  <div className="prose prose-lg max-w-none">
                    <PortableText value={event.body} />
                  </div>
                </div>
              )}

              {/* Event Details */}
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="mb-4 text-xl font-bold">Event Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p className="text-gray-600">{event.date} at {event.time}</p>
                    </div>
                  </div>
                  
                  {event.location && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-gray-600">{event.location.name}</p>
                        {event.location.address && (
                          <p className="text-sm text-gray-500">{event.location.address}</p>
                        )}
                        {event.location.city && (
                          <p className="text-sm text-gray-500">{event.location.city}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {event.organizer && (
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Organizer</p>
                        <p className="text-gray-600">{event.organizer}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-green-500"></div>
                    <div>
                      <p className="font-medium">Price</p>
                      <p className="text-lg font-bold text-green-600">{event.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Ticket Purchase */}
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="mb-4 text-xl font-bold">Get Tickets</h3>
                <div className="mb-4">
                  <p className="text-2xl font-bold text-green-600">{event.price}</p>
                </div>
                <Button className="w-full bg-black text-white hover:bg-gray-800">
                  Book Now
                </Button>
              </div>

              {/* Organizer Contact */}
              {event.organizer && (
                <div className="rounded-lg border border-gray-200 p-6">
                  <h3 className="mb-4 text-xl font-bold">Contact Organizer</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{event.organizer}</span>
                    </div>
                    {event.organizerEmail && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <a href={`mailto:${event.organizerEmail}`} className="text-sm text-blue-600 hover:underline">
                          {event.organizerEmail}
                        </a>
                      </div>
                    )}
                    {event.organizerPhone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <a href={`tel:${event.organizerPhone}`} className="text-sm text-blue-600 hover:underline">
                          {event.organizerPhone}
                        </a>
                      </div>
                    )}
                    {event.organizerWebsite && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-gray-500" />
                        <a href={event.organizerWebsite} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Share Event */}
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="mb-4 text-xl font-bold">Share Event</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                    <Facebook className="h-4 w-4" />
                    <span className="sr-only">Share on Facebook</span>
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Share on Twitter</span>
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                    <Instagram className="h-4 w-4" />
                    <span className="sr-only">Share on Instagram</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="container px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Kohedha. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
} 