"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Calendar,
  Info,
  Camera,
  Navigation as NavigationIcon,
  Hotel,
  Lightbulb,
  Heart,
  Share2,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { API_URL } from "@/lib/api";

interface Destination {
  _id: string;
  slug: string;
  name: string;
  region: string;
  tagline?: string;
  description: string;
  longDescription?: string;
  image: string;
  gallery?: string[];
  highlights?: string[];
  duration?: string;
  bestTime?: string;
  thingsToDo?: string[];
  howToGetThere?: string;
  whereToStay?: string[];
  localTips?: string[];
  estimatedCost?: string;
  rating?: number;
  reviews?: number;
  experienceIds?: string[];
}

interface Experience {
  _id: string;
  name: string;
  description: string;
  image: string;
  price?: number;
  duration?: string;
}

export default function DestinationDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [destination, setDestination] = useState<Destination | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (slug) {
      fetchDestination();
    }
  }, [slug]);

  const fetchDestination = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/destinations?slug=${slug}`);
      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        const dest = data[0];
        setDestination(dest);
        
        // Fetch related experiences if experienceIds exist
        if (dest.experienceIds && dest.experienceIds.length > 0) {
          fetchExperiences(dest.experienceIds);
        }
      }
    } catch (error) {
      console.error("Failed to fetch destination:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExperiences = async (experienceIds: string[]) => {
    try {
      const response = await fetch(`${API_URL}/api/experiences`);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        const filtered = data.filter((exp: Experience) => 
          experienceIds.includes(exp._id)
        );
        setExperiences(filtered);
      }
    } catch (error) {
      console.error("Failed to fetch experiences:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading destination...</p>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Destination not found</h1>
          <Link href="/destinations" className="text-emerald-600 hover:underline">
            ← Back to Destinations
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "things-to-do", label: "Things to Do", icon: Camera },
    { id: "practical", label: "Practical Info", icon: NavigationIcon },
    { id: "experiences", label: "Experiences", icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Destinations
              </Link>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {destination.name}
              </h1>
              
              {destination.tagline && (
                <p className="text-xl md:text-2xl text-gray-200 mb-6">
                  {destination.tagline}
                </p>
              )}
              
              <div className="flex flex-wrap gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{destination.region}</span>
                </div>
                {destination.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{destination.duration}</span>
                  </div>
                )}
                {destination.bestTime && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>Best: {destination.bestTime}</span>
                  </div>
                )}
                {destination.rating && (
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span>{destination.rating} ({destination.reviews || 0} reviews)</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-emerald-600 text-emerald-600"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">About {destination.name}</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {destination.description}
                  </p>
                  {destination.longDescription && (
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {destination.longDescription}
                    </p>
                  )}
                </div>

                {destination.highlights && destination.highlights.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Highlights</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {destination.highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg"
                        >
                          <Star className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-800 dark:text-gray-200">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {destination.gallery && destination.gallery.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {destination.gallery.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${destination.name} ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Things to Do Tab */}
            {activeTab === "things-to-do" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Things to Do</h2>
                {destination.thingsToDo && destination.thingsToDo.length > 0 ? (
                  <ul className="space-y-4">
                    {destination.thingsToDo.map((activity, index) => (
                      <li
                        key={index}
                        className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <Camera className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700 dark:text-gray-300">{activity}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">No activities listed yet.</p>
                )}
              </motion.div>
            )}

            {/* Practical Info Tab */}
            {activeTab === "practical" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {destination.howToGetThere && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                      <NavigationIcon className="w-6 h-6 text-emerald-600" />
                      How to Get There
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {destination.howToGetThere}
                    </p>
                  </div>
                )}

                {destination.whereToStay && destination.whereToStay.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                      <Hotel className="w-6 h-6 text-emerald-600" />
                      Where to Stay
                    </h3>
                    <ul className="space-y-2">
                      {destination.whereToStay.map((place, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                          <span className="text-emerald-600 mt-1">•</span>
                          {place}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {destination.localTips && destination.localTips.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                      <Lightbulb className="w-6 h-6 text-emerald-600" />
                      Local Tips
                    </h3>
                    <ul className="space-y-2">
                      {destination.localTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                          <span className="text-emerald-600 mt-1">💡</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {destination.estimatedCost && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                      <DollarSign className="w-6 h-6 text-emerald-600" />
                      Estimated Cost
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">{destination.estimatedCost}</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Experiences Tab */}
            {activeTab === "experiences" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Related Experiences</h2>
                {experiences.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {experiences.map((experience) => (
                      <Link
                        key={experience._id}
                        href={`/experiences#${experience._id}`}
                        className="group block overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 hover:border-emerald-600 transition-colors"
                      >
                        <img
                          src={experience.image}
                          alt={experience.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="p-4">
                          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                            {experience.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {experience.description}
                          </p>
                          <div className="flex items-center justify-between">
                            {experience.duration && (
                              <span className="text-sm text-gray-500 dark:text-gray-500">
                                {experience.duration}
                              </span>
                            )}
                            {experience.price && (
                              <span className="font-bold text-emerald-600">
                                ${experience.price}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">No experiences linked to this destination yet.</p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-emerald-50 dark:bg-emerald-900/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Ready to Explore {destination.name}?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's plan your perfect journey to this amazing destination
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
            >
              Book Experience
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold transition-colors border border-gray-200 dark:border-gray-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
