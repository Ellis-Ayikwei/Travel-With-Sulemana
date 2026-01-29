"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Camera,
  FileText,
  MapPin,
  MessageCircle,
  Mountain,
  Star,
  Youtube,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Travel with Sulemana",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    logo: "/logo.png",
    description:
      "Explore Ghana's treasures with personalized itineraries and local insights. Discover wildlife, historic sites, and cultural experiences.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Accra",
      addressCountry: "GH",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "info@travelwithsulemana.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function Home() {
  const stats = [
    { value: "50K+", label: "Community members" },
    { value: "120+", label: "Documented destinations" },
    { value: "15", label: "Regions explored" },
    { value: "4.9/5", label: "Traveler rating" },
  ];

  const features = [
    {
      icon: Camera,
      title: "Cinematic storytelling",
      description: "Travel films that spotlight Ghana's culture, nature, and people.",
    },
    {
      icon: Calendar,
      title: "Tailored itineraries",
      description: "Flexible plans that match your pace, interests, and budget.",
    },
    {
      icon: Mountain,
      title: "Authentic adventures",
      description: "Off-the-beaten-path experiences with trusted local guides.",
    },
  ];

  const travelerStories = [
    {
      name: "Sarah Johnson",
      location: "United States",
      image: "/assets/images/heroImage1.jpg",
      story: "My trip to Ghana was absolutely transformative. Sulemana's authentic guides and carefully curated itinerary made me feel like a local, not a tourist.",
      rating: 5,
    },
    {
      name: "Marcus Chen",
      location: "Singapore",
      image: "/assets/images/salaga.jpg",
      story: "From Mole National Park's wildlife to Cape Coast's history, every moment was magical. Highly recommend for anyone seeking genuine cultural connections.",
      rating: 5,
    },
    {
      name: "Elena Rodriguez",
      location: "Spain",
      image: "/assets/images/capecoast.webp",
      story: "The level of organization and personal touch exceeded my expectations. Sulemana goes above and beyond to ensure unforgettable experiences.",
      rating: 5,
    },
    {
      name: "David Okonkwo",
      location: "Canada",
      image: "/assets/images/independece_square.jpg",
      story: "I discovered Ghana through Sulemana's documentaries and decided to visit. The real experience was even better than what I saw on screen!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <JsonLd />
      <Navigation />

      <main>
        {/* Hero */}
        <section className="relative h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/images/heroImage1.jpg"
            alt="Mosque with minarets at twilight"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Discover Ghana Through My Lens
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-12 drop-shadow-md">
Join me on an unforgettable journey exploring Ghana's
hidden treasures, rich culture, and breathtaking
landscapes            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 px-8 py-4 bg-black hover:bg-gray-900 text-white rounded-lg font-semibold transition-colors shadow-lg"
              >
                Explore Destinations
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/watch"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-lg font-semibold transition-colors shadow-lg"
              >
                Watch Videos
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

        {/* Book A Trip */}
        <section className="relative -mt-20 pb-24 z-20">
  <div className="container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] dark:shadow-none p-8 md:p-14 border border-gray-100 dark:border-white/5 md:flex md:items-center md:gap-16"
    >
      {/* Left Column: Pricing Details */}
      <div className="md:flex-1 space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-500/10 rounded-full border border-amber-100 dark:border-amber-500/20">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <p className="text-amber-700 dark:text-amber-500 font-bold text-xs uppercase tracking-widest">
            Double Occupancy · Payment Plan Available
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-tighter">Investment Total</p>
          <h3 className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter flex items-start gap-1">
            <span className="text-2xl mt-2 text-amber-600 dark:text-amber-500">$</span>
            4,499
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100 dark:border-white/5">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase mb-2">Deposit</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">$250</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase mb-2">Balance Due</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">$4,249</p>
          </div>
        </div>

        <p className="hidden md:block text-gray-500 dark:text-gray-400 text-sm italic font-medium">
          *Only a few spots left for the 2024 season. Secure your place with a flexible deposit.
        </p>
      </div>

      {/* Right Column: Actions */}
      <div className="md:w-[400px] flex flex-col gap-4 mt-10 md:mt-0">
        <Link
          href="/book"
          className="group flex items-center justify-center gap-3 px-8 py-5 bg-gray-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-sm rounded-2xl transition-all hover:scale-[1.02] shadow-xl dark:shadow-white/5"
        >
          Book Your Experience
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/brochures/ghana-travel.pdf";
              link.download = "Travel-with-Sulemana-Brochure.pdf";
              link.click();
            }}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all border border-gray-200 dark:border-white/5"
          >
            <FileText className="w-4 h-4 text-amber-600 dark:text-amber-500" />
            Brochure
          </button>

          <button
            onClick={() => {
              window.location.href = "mailto:info@travelwithsulemana.com?subject=Trip Inquiry";
            }}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all border border-gray-200 dark:border-white/5"
          >
            <MessageCircle className="w-4 h-4 text-amber-600 dark:text-amber-500" />
            Inquire
          </button>
        </div>
      </div>
    </motion.div>
  </div>
</section>

        {/* Stats */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Travel with Sulemana?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Experience Ghana with expert guidance and authentic local connections.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-gray-700 dark:text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Destinations */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Adventures
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Experience Ghana's beauty through my latest travel document and cultural explorations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { name: "Salaga", region: "Northern Ghana", image: "/assets/images/salaga.jpg" },
                { name: "Cape Coast Castle", region: "Central Region", image: "/assets/images/capecoast.webp" },
                { name: "Independence Square", region: "Greater Accra Region", image: "/assets/images/independece_square.jpg" },
              ].map((dest, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer"
                >
                  <div className="aspect-[4/5] relative">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 text-white mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{dest.region}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 transition-opacity rounded-lg font-semibold"
              >
                View All Destinations
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Meet Sulemana */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative h-54 md:h-full min-h-54 rounded-2xl overflow-hidden"
              >
                <img
                  src="/assets/images/IMG_2220.jpg"
                  alt="Sulemana"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-6">
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Meet Sulemana
                  </h2>
                  <div className="w-16 h-1 bg-black dark:bg-white" />
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
                    I'm Sulemana, a storyteller and travel filmmaker dedicated to showcasing the beauty, culture, and hidden treasures of Ghana. Through my lens, I bring you authentic experiences that go beyond typical tourist destinations.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
                    From the wildlife-rich savannas of Mole National Park to the historic walls of Cape Coast Castle, my mission is to inspire travelers worldwide to discover the warmth, heritage, and natural wonders of my beloved country.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    Join me as we explore Ghana's most captivating destinations, meet incredible local communities, and create unforgettable memories together.
                  </p>
                </div>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-900 text-white font-semibold rounded-lg transition-colors mt-8"
                >
                  Read My Full Story
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Traveler Stories */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Traveler Stories
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Hear from travelers who've experienced Ghana through our curated journeys.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {travelerStories.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{story.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{story.location}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    "{story.story}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-black rounded-3xl p-12 md:p-16 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Start Your Adventure?
              </h2>
              <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                Let us help you plan the perfect Ghana experience with personalized itineraries and local insights.
              </p>
              <Link
                href="/plan"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black hover:bg-gray-50 transition-colors rounded-lg font-semibold text-lg"
              >
                Plan Your Trip
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
