import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BlogPage() {
  // Sample blog posts data
  const blogPosts = [
    {
      id: "top-10-beachside-restaurants-in-colombo",
      image: "/placeholder.svg?height=400&width=600",
      category: "Restaurants",
      title: "Top 10 Beachside Restaurants in Colombo",
      excerpt:
        "Discover the most stunning oceanfront dining experiences with breathtaking views and exceptional cuisine.",
      date: "May 12, 2025",
      readTime: "5 min read",
      author: "Priya Mendis",
    },
    {
      id: "upcoming-cultural-festivals-you-cant-miss",
      image: "/placeholder.svg?height=400&width=600",
      category: "Events",
      title: "Upcoming Cultural Festivals You Can't Miss",
      excerpt: "Mark your calendar for these vibrant celebrations of Sri Lankan heritage and tradition.",
      date: "May 10, 2025",
      readTime: "4 min read",
      author: "Ashan Fernando",
    },
    {
      id: "a-beginners-guide-to-sri-lankan-spices",
      image: "/placeholder.svg?height=400&width=600",
      category: "Food Guide",
      title: "A Beginner's Guide to Sri Lankan Spices",
      excerpt: "Learn about the essential spices that give Sri Lankan cuisine its distinctive and delicious flavor.",
      date: "May 5, 2025",
      readTime: "6 min read",
      author: "Nimal Perera",
    },
    {
      id: "hidden-gems-kandy-food-scene",
      image: "/placeholder.svg?height=400&width=600",
      category: "Restaurants",
      title: "Hidden Gems in Kandy's Food Scene",
      excerpt: "Explore the lesser-known culinary treasures in the historic city of Kandy that locals love.",
      date: "May 3, 2025",
      readTime: "7 min read",
      author: "Dilini Rajapakse",
    },
    {
      id: "best-rooftop-bars-colombo",
      image: "/placeholder.svg?height=400&width=600",
      category: "Nightlife",
      title: "Best Rooftop Bars in Colombo With Stunning Views",
      excerpt: "Elevate your evening with these spectacular rooftop venues offering panoramic views of Colombo.",
      date: "April 28, 2025",
      readTime: "5 min read",
      author: "Malik Jayawardena",
    },
    {
      id: "traditional-sri-lankan-desserts",
      image: "/placeholder.svg?height=400&width=600",
      category: "Food Guide",
      title: "Traditional Sri Lankan Desserts You Must Try",
      excerpt: "Indulge in the sweet side of Sri Lankan cuisine with these authentic and delicious desserts.",
      date: "April 25, 2025",
      readTime: "4 min read",
      author: "Chamari Silva",
    },
  ]

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="bg-black py-6 text-white">
        <div className="container px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              KOHEDHA
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="border-white text-white hover:bg-white hover:text-black"
              asChild
            >
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Blog Hero */}
      <section className="bg-black py-16 text-white">
        <div className="container px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Kohedha Blog</h1>
          <p className="mx-auto max-w-2xl text-gray-400">
            Discover the latest insights, tips, and stories about Sri Lanka's vibrant food and event scene.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="mb-2 text-xl font-bold transition-colors group-hover:text-gray-700">{post.title}</h2>
                  <p className="mb-4 text-gray-600">{post.excerpt}</p>
                  <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="flex items-center gap-1 text-sm font-medium text-black transition-colors group-hover:text-gray-700"
                  >
                    Read Full Article
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-black py-16 text-white">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Stay Updated</h2>
            <p className="mb-6 text-gray-400">
              Subscribe to our newsletter to receive the latest blog posts and updates about Sri Lanka's food and event
              scene.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-white placeholder:text-gray-500 focus:border-white focus:outline-none"
              />
              <Button className="bg-white text-black hover:bg-gray-200">Subscribe</Button>
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
