"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  MapPin,
  CheckCircle,
  ArrowRight,
  Users,
  Clock,
  Star,
  Phone,
  Mail,
  MapPinned,
  Car,
  Route,
  Moon,
  Sun,
  TrendingUp,
  Award,
  Smartphone,
  CreditCard,
  BadgeCheck,
} from "lucide-react";
<<<<<<< HEAD
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import HeroCarousel from "@/components/HeroCarousel";
=======
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";
>>>>>>> 47b07d669aa6b92cd2509c6b42730bdd3cb8c4f6

function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Campus Ride",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    logo: "/favicon.ico",
    description:
      "Safe, affordable campus ride-hailing service. Connect students with verified campus drivers.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Campus",
      addressCountry: "GH",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@campusride.com",
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
<<<<<<< HEAD
  // Hero carousel images from assets folder
  const heroImages = [
    "/assets/images/heroImage1.jpg",
    "/assets/images/DJI_0215.jpg",
    "/assets/images/mole.jpg",
    "/assets/images/larabanga.jpg",
    "/assets/images/capecoast.webp",
    "/assets/images/salaga.jpg",
    "/assets/images/DJI_0483.jpg",
    "/assets/images/DJI_0352.jpg",
    "/assets/images/independece_square.jpg",
=======
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const steps = [
    {
      icon: Smartphone,
      title: "Request a Ride",
      description: "Enter your pickup and destination on campus",
    },
    {
      icon: Users,
      title: "Get Matched",
      description: "Connect with verified campus drivers nearby",
    },
    {
      icon: MapPin,
      title: "Track Live",
      description: "Watch your ride in real-time with GPS tracking",
    },
    {
      icon: CheckCircle,
      title: "Arrive Safely",
      description: "Confirm arrival and rate your driver",
    },
>>>>>>> 47b07d669aa6b92cd2509c6b42730bdd3cb8c4f6
  ];

  const stats = [
    { value: "5,000+", label: "Rides Completed" },
    { value: "200+", label: "Verified Drivers" },
    { value: "4.8", label: "Average Rating" },
    { value: "10min", label: "Avg Response Time" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-black/10 dark:via-transparent dark:to-black/10 pointer-events-none" />

<<<<<<< HEAD
      <main>
        {/* Hero Carousel */}
        <section className="relative">
        <HeroCarousel images={heroImages} />
        
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="container mx-auto px-4 h-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl text-center pointer-events-auto"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
                Discover Ghana Through My Lens
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 mb-12 drop-shadow-lg">
                Join me on an unforgettable journey exploring Ghana's
                hidden treasures, rich culture, and breathtaking landscapes
              </p>
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
=======
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campus Ride</h1>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                How It Works
              </a>
            </div>
            <div className="flex items-center gap-3">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-lg"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
              )}
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {user.first_name || user.email}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      router.push("/");
                    }}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Sign In
                </Link>
              )}
              <Link
                href={
                  isAuthenticated && user
                    ? user.user_type === "driver"
                      ? "/driver/dashboard"
                      : user.user_type === "admin"
                      ? "/admin/dashboard"
                      : "/book-ride"
                    : "/book-ride"
                }
                className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 transition-opacity rounded-lg"
              >
                {isAuthenticated && user
                  ? user.user_type === "driver"
                    ? "Driver Dashboard"
                    : user.user_type === "admin"
                    ? "Admin Dashboard"
                    : "Book a Ride"
                  : "Book a Ride"}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-black dark:via-black dark:to-black" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 dark:bg-gray-800/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200/20 dark:bg-gray-800/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full"
                >
                  <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Trusted by 5,000+ Students
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                >
                  <span className="text-gray-900 dark:text-white">Campus Ride.</span>
                  <br />
                  <span className="text-gray-600 dark:text-gray-400">
                    Safe. Affordable.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg"
                >
                  Your campus transportation solution. Connect with verified drivers, track rides in real-time, and pay securely. 
                  <span className="font-semibold text-gray-900 dark:text-white"> Built for students, by students.</span>
                </motion.p>
              </div>


              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href={
                    isAuthenticated && user
                      ? user.user_type === "driver"
                        ? "/driver/dashboard"
                        : user.user_type === "admin"
                        ? "/admin/dashboard"
                        : "/book-ride"
                      : "/book-ride"
                  }
                  className="group flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-xl hover:scale-105 transition-transform shadow-lg"
                >
                  {isAuthenticated && user
                    ? user.user_type === "driver"
                      ? "Driver Dashboard"
                      : user.user_type === "admin"
                      ? "Admin Dashboard"
                      : "Book a Ride"
                    : "Book a Ride"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="group flex items-center justify-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 font-medium rounded-xl hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  See How It Works
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <Car className="w-16 h-16 mx-auto mb-4 text-gray-900 dark:text-white" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Get Started
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Join thousands of students using Campus Ride
                  </p>
                </div>

                <div className="space-y-4">
                  <Link
                    href="/book-ride"
                    className="block w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold py-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all text-center shadow-lg"
                  >
                    Book Your First Ride
                  </Link>

                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        <span>Secure</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Verified Drivers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>Live Tracking</span>
                      </div>
                    </div>
                  </div>
                </div>
>>>>>>> 47b07d669aa6b92cd2509c6b42730bdd3cb8c4f6
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 bg-gray-50 dark:bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Campus Ride?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Safe, affordable, and efficient transportation within your campus community.
            </p>
          </div>

<<<<<<< HEAD
        <p className="hidden md:block text-gray-500 dark:text-gray-400 text-sm italic font-medium">
          *Only a few spots left for the 2024 season. Secure your place with a flexible deposit.
        </p>
      </div>

      {/* Right Column: Actions */}
      <div className="md:w-[400px] flex flex-col gap-4 mt-10 md:mt-0">
        <Link
          href="/experiences"
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
=======
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-900 p-8 border border-gray-200 dark:border-gray-800 rounded-2xl hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-blue-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mb-6">
                <BadgeCheck className="w-7 h-7 text-blue-600 dark:text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Verified Drivers
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                All drivers are verified with campus ID and background checks. Your safety is our priority.
>>>>>>> 47b07d669aa6b92cd2509c6b42730bdd3cb8c4f6
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 border border-gray-200 dark:border-gray-800 rounded-2xl hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Secure Payments
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Pay securely via Mobile Money or Card. Fares calculated automatically. 15-20% commission supports the platform.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 border border-gray-200 dark:border-gray-800 rounded-2xl hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="w-7 h-7 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Real-Time Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Track your ride with GPS. See driver location, ETA, and route in real-time for transparency and safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              How Campus Ride Works
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Four simple steps to get you where you need to go on campus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-white dark:text-gray-900" />
                    </div>
                    <div className="text-sm font-bold text-gray-400 mb-2">STEP {i + 1}</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 rounded-3xl p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white dark:text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-gray-300 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of students using Campus Ride. Book your first ride in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-ride"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-xl hover:scale-105 transition-transform"
              >
                Book a Ride Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Campus Ride</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Safe, affordable campus transportation. Built for students, by students.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <Link href="/book-ride" className="hover:text-gray-900 dark:hover:text-white">
                    Book a Ride
                  </Link>
                </li>
                <li>
                  <Link href="/history" className="hover:text-gray-900 dark:hover:text-white">
                    Ride History
                  </Link>
                </li>
                <li>
                  <Link href="/auth/login" className="hover:text-gray-900 dark:hover:text-white">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  support@campusride.com
                </li>
                <li className="flex items-center gap-2">
                  <MapPinned className="w-4 h-4" />
                  Campus
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2025 Campus Ride. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <JsonLd />
    </div>
  );
}
