"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Users,
  MapPin,
  DollarSign,
  CheckCircle,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function BookPage() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const trips = [
    {
      id: 1,
      name: "Northern Ghana Safari Explorer",
      region: "Northern Ghana",
      startDate: "March 15, 2026",
      duration: "7 days",
      groupSize: "8-12",
      price: 4499,
      deposit: 250,
      availability: 4,
      highlights: ["Mole National Park", "Larabanga Mosque", "Wildlife Safaris", "Local Guides"],
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800",
    },
    {
      id: 2,
      name: "Cape Coast Historical Journey",
      region: "Central Region",
      startDate: "April 5, 2026",
      duration: "5 days",
      groupSize: "10-15",
      price: 3499,
      deposit: 200,
      availability: 6,
      highlights: ["Cape Coast Castle", "Historical Tours", "Beach Relaxation", "Cultural Experience"],
      image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=800",
    },
    {
      id: 3,
      name: "Kakum & Waterfall Adventure",
      region: "Eastern Region",
      startDate: "May 10, 2026",
      duration: "4 days",
      groupSize: "6-10",
      price: 2999,
      deposit: 150,
      availability: 2,
      highlights: ["Canopy Walkway", "Wli Waterfalls", "Nature Hikes", "Swimming"],
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=800",
    },
    {
      id: 4,
      name: "West Coast Cultural Experience",
      region: "Western Region",
      startDate: "June 1, 2026",
      duration: "6 days",
      groupSize: "12-18",
      price: 3999,
      deposit: 220,
      availability: 7,
      highlights: ["Local Villages", "Artisan Workshops", "Traditional Food", "Photography Tours"],
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                Travel with<br />Sulemana
              </span>
            </Link>

            {/* Theme Toggle */}
            <div className="flex items-center gap-4">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-lg"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              )}
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold mb-6 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Book Your Ghana Adventure
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
              Explore available trips, check dates, and secure your spot on an unforgettable journey through Ghana's most amazing destinations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Available Trips */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow"
              >
                {/* Trip Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {trip.availability} spots left
                  </div>
                </div>

                {/* Trip Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {trip.name}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{trip.region}</span>
                      </div>
                    </div>
                  </div>

                  {/* Trip Info Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">Dates</p>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {trip.startDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">Duration</p>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {trip.duration}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">Group Size</p>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {trip.groupSize}
                      </p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Highlights</p>
                    <div className="flex flex-wrap gap-2">
                      {trip.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">From</span>
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        ${trip.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Deposit: ${trip.deposit} • Remaining: ${(trip.price - trip.deposit).toLocaleString()}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => {
                      // Handle booking - navigate to checkout/booking form
                      router.push(`/book/${trip.id}`);
                    }}
                    className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Book This Trip
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "What's included in the trip price?",
                a: "All trips include accommodations, guided tours, transportation, and most meals. Flight tickets are not included.",
              },
              {
                q: "When is the deposit due?",
                a: "The deposit is due within 7 days of booking to secure your spot. The remaining balance is due 30 days before departure.",
              },
              {
                q: "Can I get a refund?",
                a: "We offer full refunds if you cancel 60 days before the trip. Cancellations within 60 days forfeit the deposit.",
              },
              {
                q: "What if a trip is full?",
                a: "You can join the waitlist and we'll notify you if a spot opens up. We also add dates based on demand.",
              },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {faq.q}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Need More Information?
          </h2>
          <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
            Contact our travel experts to customize your Ghana adventure
          </p>
          <button
            onClick={() => {
              window.location.href = 'mailto:info@travelwithsulemana.com';
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 hover:bg-gray-50 transition-colors rounded-lg font-semibold text-lg"
          >
            Contact Us
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
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

            {/* Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/destinations" className="hover:text-white transition">Destinations</Link></li>
                <li><Link href="/book" className="hover:text-white transition">Book a Trip</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Booking FAQs</a></li>
                <li><a href="#" className="hover:text-white transition">Refund Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span>+233 XX XXX XXXX</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>info@travelwithsulemana.com</span>
                </li>
                <li className="pt-2">
                  <span className="text-gray-400">Available 24/7 for inquiries</span>
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
