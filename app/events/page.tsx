import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, MapPin, User, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getEvents } from "@/lib/sanity-events"

interface Event {
  id: string
  title: string
  description: string
  image: string
  date: string
  time: string
  location: {
    name: string
    address: string
    city: string
  }
  category: string
  organizer: string
  price: string
  status: string
}

export default async function EventsPage() {
  // Fetch events from Sanity
  const events = await getEvents()

  return (
    <div className="min-h-screen bg-white text-black mt-10">
      {/* Events Hero */}
      <section className="bg-black py-16 text-white">
        <div className="container px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Kohedha Events</h1>
          <p className="mx-auto max-w-2xl text-gray-400">
            Discover exciting events, cultural festivals, and entertainment across Sri Lanka.
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="container px-4">
          {events.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">No events scheduled yet</h2>
              <p className="text-gray-600 mb-6">
                Check back soon for upcoming events and cultural celebrations across Sri Lanka.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event: Event) => (
                <div
                  key={event.id}
                  className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                      {event.category || 'Event'}
                    </div>
                    {event.status === 'ongoing' && (
                      <div className="absolute right-4 top-4 rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
                        Live Now
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="mb-2 text-xl font-bold transition-colors group-hover:text-gray-700">{event.title}</h2>
                    <p className="mb-4 text-gray-600 line-clamp-2">{event.description}</p>
                    
                    <div className="mb-4 space-y-2 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      {event.location?.name && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location.name}</span>
                        </div>
                      )}
                      {event.organizer && (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{event.organizer}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-green-600">{event.price}</div>
                      <Link
                        href={`/events/${event.id}`}
                        className="flex items-center gap-1 text-sm font-medium text-black transition-colors group-hover:text-gray-700"
                      >
                        View Details
                        <ArrowLeft className="h-3 w-3 rotate-180 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-black py-16 text-white">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Stay Updated</h2>
            <p className="mb-6 text-gray-400">
              Subscribe to our newsletter to receive updates about upcoming events and exclusive offers.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-white placeholder:text-gray-500 focus:border-white focus:outline-none"
              />
              <Button className="bg-black text-white hover:bg-black/90">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="container px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Kohedha. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
} 