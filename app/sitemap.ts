import { MetadataRoute } from 'next'
import { getPosts } from '@/lib/sanity'
import { getEvents } from '@/lib/sanity-events'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kohedha.lk'
  
  // Get all blog posts
  const posts = await getPosts()
  const blogUrls = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Get all events
  const events = await getEvents()
  const eventUrls = events.map((event: any) => ({
    url: `${baseUrl}/events/${event.id}`,
    lastModified: event.eventDate ? new Date(event.eventDate) : new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  return [...staticPages, ...blogUrls, ...eventUrls]
}
