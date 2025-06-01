"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Search, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const featuresRef = useRef(null);
  const downloadRef = useRef(null);
  const isFeatureInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const isDownloadInView = useInView(downloadRef, { once: true, amount: 0.3 });

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900"></div>
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Phone Column */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className=" w-64 md:w-80 overflow-hidden rounded-3xl border border-gray-800 bg-black shadow-xl">
                  <Image
                    src="/phonescreen.png?height=800&width=450"
                    alt="Kohedha App Screenshot"
                    width={450}
                    height={800}
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
                Discover <span className="text-gray-400">Sri Lanka</span>{" "}
                through your fingertips
              </h1>

              <p className="text-lg text-gray-400 mb-8 max-w-md">
                Find the best restaurants and events across Sri Lanka with
                personalized recommendations.
              </p>

              <div className=" w-64 md:w-80 overflow-hidden rounded-3xl bg-black shadow-xl">
                <Image
                  src="/KO.png?height=800&width=450"
                  alt="Kohedha App Screenshot"
                  width={450}
                  height={500}
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex flex-wrap gap-4 mt-8 mb-12">
                <Button
                  className="bg-white text-black hover:bg-gray-200"
                  size="lg"
                  onClick={() =>
                    document
                      .getElementById("features")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore Features
                </Button>
                <Button
                  className="border-white bg-transparent hover:bg-white hover:text-black"
                  size="lg"
                  variant="outline"
                  onClick={() =>
                    document
                      .getElementById("download")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Download Now
                </Button>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm text-gray-400">Active Users</div>
                </div>
                <div className="h-8 w-px bg-gray-800"></div>
                <div>
                  <div className="text-2xl font-bold">4.9</div>
                  <div className="text-sm text-gray-400">App Rating</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-24 bg-white text-black"
        ref={featuresRef}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Discover What Kohedha Offers
            </h2>
            <p className="text-gray-600">
              Explore the powerful features that make Kohedha the ultimate
              companion for food and event enthusiasts in Sri Lanka.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="h-6 w-6" />,
                title: "Smart Discovery",
                description:
                  "Find restaurants and events tailored to your preferences.",
              },
              {
                icon: <Utensils className="h-6 w-6" />,
                title: "Restaurant Insights",
                description:
                  "Get detailed information about menus, pricing, and ambiance.",
              },
              {
                icon: <Calendar className="h-6 w-6" />,
                title: "Event Calendar",
                description:
                  "Stay updated with the latest cultural and food events.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isFeatureInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Preview */}
      <section className="py-24 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Experience Sri Lanka Like Never Before
              </h2>
              <p className="text-gray-400 mb-8">
                Whether you're a local or a tourist, Kohedha helps you discover
                hidden gems and popular hotspots across the island.
              </p>

              <ul className="space-y-4">
                {[
                  "Real-time updates on restaurant availability",
                  "Exclusive deals and discounts",
                  "Personalized recommendations",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 3L4.5 8.5L2 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative w-64 md:w-72 overflow-hidden rounded-3xl border border-gray-800 bg-black shadow-xl">
                <Image
                  src="/phonescreen.png?height=800&width=450"
                  alt="Kohedha App Interface"
                  width={450}
                  height={800}
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 bg-white text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Explore Our Blog</h2>
            <p className="text-gray-600">
              Discover insider tips, restaurant reviews, and event highlights
              across Sri Lanka.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: "/placeholder.svg?height=400&width=600",
                category: "Restaurants",
                title: "Top 10 Beachside Restaurants in Colombo",
                date: "May 12, 2025",
              },
              {
                image: "/placeholder.svg?height=400&width=600",
                category: "Events",
                title: "Upcoming Cultural Festivals You Can't Miss",
                date: "May 10, 2025",
              },
              {
                image: "/placeholder.svg?height=400&width=600",
                category: "Food Guide",
                title: "A Beginner's Guide to Sri Lankan Spices",
                date: "May 5, 2025",
              },
            ].map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group overflow-hidden rounded-lg border border-gray-100 bg-white hover:shadow-md transition-shadow"
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
                  <h3 className="text-xl font-bold mb-2 group-hover:text-gray-700 transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <Link
                      href={`/blog/${post.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="flex items-center gap-1 text-sm font-medium text-black group-hover:text-gray-700 transition-colors"
                    >
                      Read More
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              className="bg-black text-white hover:bg-gray-800"
              size="lg"
              asChild
            >
              <Link href="/blog">View All Articles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section
        id="download"
        className="py-24 bg-black text-white"
        ref={downloadRef}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isDownloadInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Download Kohedha Today
              </h2>
              <p className="text-gray-400 mb-10">
                Join thousands of users who are already discovering the best of
                Sri Lanka's food and entertainment scene.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <motion.a
                  href="#"
                  initial={{ opacity: 0 }}
                  animate={isDownloadInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="transition-transform hover:scale-105"
                >
                  <Image
                    src="/app-store.png"
                    alt="Download on App Store"
                    width={200}
                    height={60}
                    className="h-[60px] w-[200px] object-contain"
                  />
                </motion.a>

                <motion.a
                  href="#"
                  initial={{ opacity: 0 }}
                  animate={isDownloadInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="transition-transform hover:scale-105"
                >
                  <Image
                    src="/play-store2.png"
                    alt="Get it on Google Play"
                    width={200}
                    height={60}
                    className="h-[60px] w-[200px] object-contain"
                  />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold">KOHEDHA</h2>
              <p className="mt-2 text-sm text-gray-400">
                Discover Sri Lanka's best restaurants and events
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Contact
              </Link>
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
