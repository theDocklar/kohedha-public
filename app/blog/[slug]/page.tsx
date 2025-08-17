import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, Facebook, Instagram, Twitter, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPost, getRelatedPosts } from "@/lib/sanity"
import { PortableText } from "@portabletext/react"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import StructuredData from "@/components/structured-data"

interface BlogPostPageProps {
  params: { slug: string }
}

interface RelatedPost {
  id: string
  title: string
  image: string
}

// Generate metadata for the blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: post.title,
    description: post.excerpt || `Read ${post.title} by ${post.author} on Kohedha. Discover the best of Sri Lanka's food and culture.`,
    keywords: [
      post.category,
      'Sri Lanka',
      'restaurants',
      'food',
      'culture',
      'travel',
      'blog',
      ...(post.categories || []),
    ],
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read ${post.title} by ${post.author} on Kohedha.`,
      type: 'article',
      url: `https://kohedha.lk/blog/${post.id}`,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      authors: [post.author],
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      section: post.category,
      tags: post.categories || [post.category],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || `Read ${post.title} by ${post.author} on Kohedha.`,
      images: [post.image],
      creator: '@kohedha',
    },
    alternates: {
      canonical: `/blog/${post.id}`,
    },
    other: {
      'article:published_time': post.publishedAt,
      'article:modified_time': post.publishedAt,
      'article:author': post.author,
      'article:section': post.category,
      'article:tag': (post.categories || [post.category]).join(', '),
    },
  }
}

export default async function BlogPost({ params }: BlogPostPageProps) {
  // Fetch the blog post data from Sanity
  const post = await getPost(params.slug)
  
  // If post doesn't exist, show 404
  if (!post) {
    notFound()
  }

  // Fetch related posts
  const relatedPosts = await getRelatedPosts(params.slug)

  return (
    <div className="min-h-screen bg-white text-black">
      <StructuredData type="article" data={post} />
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
              <Link href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Blog Post Hero */}
      <div className="relative h-[40vh] w-full overflow-hidden md:h-[50vh]">
        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container px-4 text-center text-white">
            <div className="mb-4 inline-block rounded-full bg-black px-3 py-1 text-sm font-medium">{post.category}</div>
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">{post.title}</h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
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
          </div>
        </div>
      </div>

      {/* Blog Post Content */}
      <div className="container px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center gap-4 border-b border-gray-200 pb-8">
            <Image
              src={post.authorImage || "/placeholder.svg"}
              alt={post.author}
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <p className="font-medium">{post.author}</p>
              <p className="text-sm text-gray-500">Food & Travel Writer</p>
            </div>
            <div className="ml-auto flex gap-2">
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

          <article className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-black">
            {post.body && <PortableText value={post.body} />}
          </article>

          {/* App Download CTA */}
          <div className="my-12 rounded-lg bg-black p-8 text-white">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
              <div className="relative aspect-[9/16] w-32 overflow-hidden rounded-2xl border-2 border-gray-700 md:w-40">
                <Image src="/placeholder.svg?height=800&width=450" alt="Kohedha App" fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-2xl font-bold">Discover More with Kohedha</h3>
                <p className="mb-4 text-gray-400">
                  Find the best restaurants and events in Sri Lanka with our mobile app. Get personalized
                  recommendations, exclusive deals, and instant bookings.
                </p>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:items-start sm:justify-start">
                  <Button className="bg-white text-black hover:bg-gray-200">Download Now</Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedPosts.map((relatedPost: RelatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.id}`}
                    className="group overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-md"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold transition-colors group-hover:text-gray-700">{relatedPost.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
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
