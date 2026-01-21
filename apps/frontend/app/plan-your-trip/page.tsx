"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Moon,
  Sun,
  Menu,
  X,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function PlanYourTripPage() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const [tripDetails, setTripDetails] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    travelers: 1,
    budget: "budget",
    interests: [] as string[],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const destinations = [
    "Mole National Park",
    "Cape Coast Castle",
    "Kakum National Park",
    "Larabanga",
    "Accra",
    "Elmina",
    "Wli Falls",
    "Takoradi",
  ];

  const interests = [
    { id: "wildlife", label: "Wildlife & Safari" },
    { id: "history", label: "History & Culture" },
    { id: "beaches", label: "Beaches" },
    { id: "adventure", label: "Adventure Sports" },
    { id: "food", label: "Food & Cuisine" },
    { id: "photography", label: "Photography" },
    { id: "relaxation", label: "Relaxation" },
    { id: "art", label: "Art & Crafts" },
  ];

  const toggleInterest = (id: string) => {
    setTripDetails((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }));
  };

  const handleContinue = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-black font-bold text-xl">T</span>
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-white hidden sm:inline">
                Travel with Sulemana
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Home
              </Link>
              <Link href="/destinations" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Destinations
              </Link>
              <Link href="/experiences" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Experiences
              </Link>
              <Link href="/watch" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Watch
              </Link>
              <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Blog
              </Link>
              <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-lg"
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

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 space-y-3 pb-4">
              <Link href="/" className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Home
              </Link>
              <Link href="/destinations" className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Destinations
              </Link>
              <Link href="/experiences" className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Experiences
              </Link>
              <Link href="/watch" className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Watch
              </Link>
              <Link href="/blog" className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Blog
              </Link>
              <Link href="/about" className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                About
              </Link>
              <Link href="/contact" className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                Contact
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Plan Your Perfect Trip
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Answer a few simple questions and we'll help you design your ideal Ghanaian adventure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Planning Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {!showSummary ? (
              <>
                {/* Progress Bar */}
                <div className="mb-12">
                  <div className="flex justify-between mb-6">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className="flex flex-col items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${
                            step <= currentStep
                              ? "bg-black dark:bg-white text-white dark:text-black"
                              : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {step}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {["Destination", "Dates", "Details", "Interests"][step - 1]}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-black dark:bg-white"
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentStep / 4) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Step Content */}
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 md:p-12"
                >
                  {currentStep === 1 && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Where would you like to go?
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        {destinations.map((dest) => (
                          <button
                            key={dest}
                            onClick={() => setTripDetails({ ...tripDetails, destination: dest })}
                            className={`p-4 rounded-lg border-2 transition-all text-left ${
                              tripDetails.destination === dest
                                ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                                : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                            }`}
                          >
                            <MapPin className="w-5 h-5 mb-2" />
                            <span className="font-semibold">{dest}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                          When would you like to travel?
                        </h2>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                              Start Date
                            </label>
                            <input
                              type="date"
                              value={tripDetails.startDate}
                              onChange={(e) =>
                                setTripDetails({ ...tripDetails, startDate: e.target.value })
                              }
                              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                              End Date
                            </label>
                            <input
                              type="date"
                              value={tripDetails.endDate}
                              onChange={(e) =>
                                setTripDetails({ ...tripDetails, endDate: e.target.value })
                              }
                              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Trip Details
                      </h2>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          Number of Travelers
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={tripDetails.travelers}
                          onChange={(e) =>
                            setTripDetails({
                              ...tripDetails,
                              travelers: parseInt(e.target.value) || 1,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-4">
                          Budget Range
                        </label>
                        <div className="space-y-2">
                          {[
                            { id: "budget", label: "Budget-Friendly (Under $3,000)" },
                            { id: "moderate", label: "Moderate ($3,000 - $6,000)" },
                            { id: "premium", label: "Premium ($6,000 - $10,000)" },
                            { id: "luxury", label: "Luxury (Over $10,000)" },
                          ].map((option) => (
                            <label
                              key={option.id}
                              className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                            >
                              <input
                                type="radio"
                                name="budget"
                                value={option.id}
                                checked={tripDetails.budget === option.id}
                                onChange={(e) =>
                                  setTripDetails({ ...tripDetails, budget: e.target.value })
                                }
                                className="w-4 h-4"
                              />
                              <span className="ml-3 text-gray-900 dark:text-white font-medium">
                                {option.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        What interests you?
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        {interests.map((interest) => (
                          <button
                            key={interest.id}
                            onClick={() => toggleInterest(interest.id)}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              tripDetails.interests.includes(interest.id)
                                ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                                : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 text-gray-900 dark:text-white"
                            }`}
                          >
                            <CheckCircle className="w-5 h-5 mb-2" />
                            <span className="font-semibold text-sm">{interest.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Navigation Buttons */}
                <div className="mt-8 flex gap-4">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="flex-1 px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleContinue}
                    disabled={
                      (currentStep === 1 && !tripDetails.destination) ||
                      (currentStep === 2 && (!tripDetails.startDate || !tripDetails.endDate)) ||
                      (currentStep === 4 && tripDetails.interests.length === 0)
                    }
                    className="flex-1 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:bg-gray-900 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {currentStep === 4 ? (
                      <>
                        See My Plan
                        <ArrowRight className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              /* Trip Summary */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 md:p-12"
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  Your Perfect Trip
                </h2>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <MapPin className="w-6 h-6 text-black dark:text-white flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Destination</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {tripDetails.destination}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Calendar className="w-6 h-6 text-black dark:text-white flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Travel Dates</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {tripDetails.startDate} to {tripDetails.endDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Users className="w-6 h-6 text-black dark:text-white flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Travelers</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {tripDetails.travelers} {tripDetails.travelers === 1 ? "person" : "people"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <DollarSign className="w-6 h-6 text-black dark:text-white flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Budget</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                        {tripDetails.budget}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-black dark:text-white flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Interests</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {tripDetails.interests.map((interest) => (
                          <span
                            key={interest}
                            className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-sm rounded-full font-medium"
                          >
                            {
                              interests.find((i) => i.id === interest)
                                ?.label
                            }
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowSummary(false)}
                    className="flex-1 px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Edit Trip
                  </button>
                  <Link
                    href="/book"
                    className="flex-1 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:bg-gray-900 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    Browse Matching Trips
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-xl">T</span>
                </div>
                <span className="text-xl font-semibold text-white">Travel with Sulemana</span>
              </div>
              <p className="text-gray-400 text-sm">
                Exploring Ghana's hidden treasures and sharing authentic travel experiences.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/destinations" className="hover:text-white transition">Destinations</Link></li>
                <li><Link href="/book" className="hover:text-white transition">Book a Trip</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">FAQs</a></li>
                <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <p className="text-sm text-gray-400">info@travelwithsulemana.com</p>
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
