"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  ArrowRight,
  Star,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Globe,
  Camera,
  Calendar,
  Mountain,
  FileText,
  MessageCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
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
  const features = [
    {
      icon: Mountain,
      title: "Expert Guides",
      description: "Local insights and personalized experiences",
    },
    {
      icon: Camera,
      title: "Memorable Moments",
      description: "Capture Ghana's beauty and culture",
    },
    {
      icon: Calendar,
      title: "Flexible Planning",
      description: "Custom itineraries for every traveler",
    },
  ];

  const stats = [
    { value: "500+", label: "Happy Travelers" },
    { value: "50+", label: "Destinations" },
    { value: "4.9", label: "Average Rating" },
    { value: "10+", label: "Years Experience" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <JsonLd />

      {/* Navigation */}
        <Navigation />

      {/* Hero Section */}
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

      {/* Book A Trip Component - Overlapping */}
      <section className="relative -mt-20 pb-20 md:pb-0">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed bottom-0 left-0 right-0 md:relative md:bottom-auto md:left-auto md:right-auto bg-white dark:bg-gray-900 rounded-t-3xl md:rounded-3xl shadow-2xl p-6 md:p-12 border border-gray-200 dark:border-gray-800 md:max-w-full mx-auto md:flex md:items-center md:gap-12"
          >
            {/* Left Side - Trip Info */}
            <div className="md:flex-1">
              {/* Trip Type */}
              <div className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
                <p className="text-gray-900 dark:text-gray-100 font-semibold text-sm">
                  Double Occupancy - Payment Plan
                </p>
              </div>

              {/* Pricing */}
              <div className="mb-8">
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Total Price</p>
                  <h3 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
                    $4,499
                  </h3>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Deposit Required</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">$250</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Remaining</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">$4,249</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Text */}
              <p className="hidden md:block text-gray-600 dark:text-gray-400 text-sm">
                Limited spots available. Secure your spot today!
              </p>
            </div>

            {/* Right Side - CTA Buttons */}
            <div className="md:flex-1 md:flex md:flex-col md:gap-4 mt-6 md:mt-0">
              <Link
                href="/book"
                className="flex items-center justify-center gap-2 px-6 py-4 bg-black hover:bg-gray-900 text-white font-semibold rounded-xl transition-colors shadow-lg md:w-full"
              >
                Book Now
                <ArrowRight className="w-5 h-5" />
              </Link>

              <button
                onClick={() => {
                  // Handle brochure download
                  const link = document.createElement('a');
                  link.href = '/brochures/ghana-travel.pdf';
                  link.download = 'Travel-with-Sulemana-Brochure.pdf';
                  link.click();
                }}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl transition-colors md:w-full"
              >
                <FileText className="w-5 h-5" />
                Download Brochure
              </button>

              <button
                onClick={() => {
                  // Handle question/inquiry
                  window.location.href = 'mailto:info@travelwithsulemana.com?subject=Trip Inquiry';
                }}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl transition-colors border border-gray-200 dark:border-gray-700 md:w-full"
              >
                <MessageCircle className="w-5 h-5" />
                Ask A Question
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
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

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Travel with Sulemana?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience Ghana like never before with expert guidance and authentic local connections
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
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Destinations Preview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Explore the most breathtaking locations Ghana has to offer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { name: "Mole National Park", region: "Northern Ghana", image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800" },
              { name: "Cape Coast Castle", region: "Central Region", image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=800" },
              { name: "Kakum National Park", region: "Central Region", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=800" },
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

      {/* Meet Sulemana Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative h-96 md:h-full min-h-96 rounded-2xl overflow-hidden"
            >
              <img
                src="/assets/images/IMG_2220.jpg"
                alt="Sulemana"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </motion.div>

            {/* Right Side - Text */}
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
                  I'm Sulemana, a passionate storyteller and travel filmmaker dedicated to showcasing the incredible beauty, rich culture, and hidden treasures of Ghana. Through my lens, I bring you authentic experiences that go beyond typical tourist destinations.
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
                  From the wildlife-rich savannas of Mole National Park to the historic walls of Cape Coast Castle, I document the stories that make Ghana truly special. My mission is to inspire travelers worldwide to discover the warmth, heritage, and natural wonders of my beloved country.
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  Join me on this journey as we explore Ghana's most captivating destinations, meet incredible local communities, and create unforgettable memories together.
                </p>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-900 text-white font-semibold rounded-lg transition-colors mt-8"
              >
                Learn More About Me
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              Let us help you plan the perfect Ghana experience with personalized itineraries and local insights
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

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <span className="text-xl font-semibold text-white">
                  Travel with<br />Sulemana
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Exploring Ghana's hidden treasures and sharing authentic travel experiences.
              </p>
            </div>

            {/* Destinations */}
            <div>
              <h3 className="text-white font-semibold mb-4">Destinations</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/destinations/northern" className="hover:text-white transition">Northern Ghana</Link></li>
                <li><Link href="/destinations/southern" className="hover:text-white transition">Southern Ghana</Link></li>
                <li><Link href="/destinations/eastern" className="hover:text-white transition">Eastern Ghana</Link></li>
                <li><Link href="/destinations/western" className="hover:text-white transition">Western Ghana</Link></li>
              </ul>
            </div>

            {/* Experiences */}
            <div>
              <h3 className="text-white font-semibold mb-4">Experiences</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/experiences/wildlife" className="hover:text-white transition">Wildlife Safaris</Link></li>
                <li><Link href="/experiences/cultural" className="hover:text-white transition">Cultural Tours</Link></li>
                <li><Link href="/experiences/adventure" className="hover:text-white transition">Adventure Activities</Link></li>
                <li><Link href="/experiences/food" className="hover:text-white transition">Food & Culinary</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+233 XX XXX XXXX</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@travelwithsulemana.com</span>
                </li>
                <li className="flex items-center gap-4 mt-4">
                  <a href="#" className="hover:text-white transition"><Facebook className="w-5 h-5" /></a>
                  <a href="#" className="hover:text-white transition"><Instagram className="w-5 h-5" /></a>
                  <a href="#" className="hover:text-white transition"><Twitter className="w-5 h-5" /></a>
                  <a href="#" className="hover:text-white transition"><Youtube className="w-5 h-5" /></a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2026 Travel with Sulemana. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
