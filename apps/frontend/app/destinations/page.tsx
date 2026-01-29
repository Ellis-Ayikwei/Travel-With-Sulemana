"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Clock, ChevronRight } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function DestinationsPage() {
  const [selectedRegion, setSelectedRegion] = useState("all");

  const regions = [
    { id: "all", label: "All Destinations" },
    { id: "northern", label: "Northern Ghana" },
    { id: "southern", label: "Southern Ghana" },
    { id: "eastern", label: "Eastern Ghana" },
    { id: "western", label: "Western Ghana" },
  ];

  const destinations = [
    {
      id: "mole",
      name: "Mole National Park",
      region: "northern",
      tagline: "Ghana's Premier Wildlife Safari Destination",
      description: "Experience the thrill of encountering elephants, antelopes, and over 300 bird species in their natural habitat. Mole offers unforgettable safari adventures across 4,840 square kilometers of pristine savanna.",
      image: "/assets/images/mole.jpg",
      highlights: [
        "Elephant Safari",
        "Bird Watching",
        "Canopy Walkways",
        "Museum Experience"
      ],
      duration: "2-3 days",
      bestTime: "Nov - Apr"
    },
    {
      id: "larabanga",
      name: "Larabanga Mosque",
      region: "northern",
      tagline: "West Africa's Oldest Mosque",
      description: "Step back in time at this stunning 15th-century mosque, built in the traditional Sudanese architectural style. The Larabanga Mosque stands as a testament to Ghana's Islamic heritage and timeless beauty.",
      image: "/assets/images/larabanga.jpg",
      highlights: [
        "Ancient Architecture",
        "Sacred Mystic Stone",
        "Local Guide",
      ],
      duration: "Half day",
      bestTime: "Year-round"
    },
    {
      id: "salaga",
      name: "Salaga Slave Wells",
      region: "northern",
      tagline: "A Journey Through History",
      description: "Discover the poignant history of the trans-Saharan slave trade at these historic wells. Salaga was once a major trading post, and these wells and shrines tell powerful stories of Ghana's past.",
      image: "/assets/images/salaga.jpg",
      highlights: [
        "Historical Tours",
        "Cultural Education",
        "Heritage Sites",
        "Local Stories"
      ],
      duration: "1 day",
      bestTime: "Year-round"
    },
    {
      id: "cape-coast",
      name: "Cape Coast Castle",
      region: "southern",
      tagline: "Where History Echoes",
      description: "Walk through the powerful corridors of Cape Coast Castle, a UNESCO World Heritage Site that stands as a sobering reminder of the Atlantic slave trade. This fortress offers profound insights into Ghana's complex colonial past.",
      image: "/assets/images/capecoast.webp",
      highlights: [
        "Historical Tours",
        "Ocean Views",
        "Museum Exhibits"
      ],
      duration: "1 day",
      bestTime: "Year-round"
    }
  ];

  const filteredDestinations = selectedRegion === "all" 
    ? destinations 
    : destinations.filter(d => d.region === selectedRegion);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navigation />

      {/* Hero Section with Map */}
      <section className="relative h-[500px] overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000"
            alt="Ghana Map"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Explore Ghana's treasures
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              From wildlife-rich savannah to historic coastal fortresses, discorver the destinations that make Ghana unforgettable.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region.id)}
                  className={`px-5 py-2 rounded-full font-semibold transition-all border ${
                    selectedRegion === region.id
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-gray-400"
                  }`}
                >
                  {region.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Destinations List */}
      <section className="py-16">
        <div className="container mx-auto px-4 space-y-12">
          {filteredDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="relative h-[400px] rounded-2xl overflow-hidden group">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {destination.name}
                </h2>
                <p className="text-xl text-gray-900 dark:text-gray-100 font-medium mb-4">
                  {destination.tagline}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
                  {destination.description}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Highlights
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {destination.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <ChevronRight className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Clock className="w-5 h-5" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Star className="w-5 h-5" />
                    <span>Best: {destination.bestTime}</span>
                  </div>
                </div>

                <Link
                  href={`/destinations/${destination.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Let us help you plan the perfect Ghana experience with personalized itineraries and local insights
          </p>
          <Link
            href="/plan"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black hover:bg-gray-50 transition-colors rounded-lg font-semibold text-lg"
          >
            Subscribe
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
