"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MapPin, Camera, Heart, Globe, Users, Award } from "lucide-react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function AboutPage() {

  const values = [
    {
      icon: MapPin,
      title: "Authentic Experiences",
      description: "We showcase the real Ghana, beyond typical tourist routes, connecting you with local communities and hidden treasures.",
    },
    {
      icon: Camera,
      title: "Storytelling Through Travel",
      description: "Every destination has a story. We help you discover and experience these narratives firsthand.",
    },
    {
      icon: Heart,
      title: "Community Impact",
      description: "Our tours support local businesses, guides, and communities, ensuring sustainable tourism.",
    },
    {
      icon: Globe,
      title: "Global Perspective",
      description: "We blend international hospitality standards with local warmth and authenticity.",
    },
  ];

  const team = [
    {
      name: "Sulemana",
      role: "Founder & Travel Filmmaker",
      bio: "Passionate about Ghana's stories and dedicated to sharing them with the world.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
    },
    {
      name: "Ama",
      role: "Tour Guide & Cultural Expert",
      bio: "Experienced guide with deep knowledge of Ghana's history and culture.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
    },
    {
      name: "Kwame",
      role: "Operations Manager",
      bio: "Ensuring every detail of your journey is perfectly planned and executed.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About Travel with Sulemana
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Discover the story behind our mission to showcase Ghana's beauty, culture, and hidden treasures to the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Meet Sulemana Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
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
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Meet Sulemana
              </h2>

              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p className="text-lg leading-relaxed">
                  I'm Sulemana, a passionate storyteller and travel filmmaker dedicated to showcasing the incredible beauty, rich culture, and hidden treasures of Ghana. Through my lens, I bring you authentic experiences that go beyond typical tourist destinations.
                </p>
                <p className="text-lg leading-relaxed">
                  From the wildlife-rich savannas of Mole National Park to the historic walls of Cape Coast Castle, I document the stories that make Ghana truly special. My mission is to inspire travelers worldwide to discover the warmth, heritage, and natural wonders of my beloved country.
                </p>
                <p className="text-lg leading-relaxed">
                  Join me on this journey as we explore Ghana's most captivating destinations, meet incredible local communities, and create unforgettable memories together.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">10+</p>
                    <p className="text-gray-600 dark:text-gray-400">Years of Experience</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">500+</p>
                    <p className="text-gray-600 dark:text-gray-400">Happy Travelers</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              These principles guide everything we do in creating exceptional travel experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 bg-black dark:bg-white rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white dark:text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Dedicated professionals committed to making your journey unforgettable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-black dark:text-gray-300 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              What sets Travel with Sulemana apart from other tour operators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Local Expertise",
                description: "Deep knowledge of Ghana's destinations, culture, and hidden gems that you won't find in guidebooks.",
              },
              {
                title: "Personal Touch",
                description: "Every tour is customized to your interests and preferences. We're not a one-size-fits-all operation.",
              },
              {
                title: "Sustainable Tourism",
                description: "We're committed to responsible tourism that benefits local communities and preserves Ghana's natural heritage.",
              },
              {
                title: "Professional Support",
                description: "24/7 customer support before, during, and after your trip ensures peace of mind throughout your journey.",
              },
              {
                title: "Quality Accommodations",
                description: "Carefully selected 4-5 star hotels and lodges that combine comfort with authentic experiences.",
              },
              {
                title: "Expert Guides",
                description: "Knowledgeable and passionate local guides who bring destinations to life with their stories and insights.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: (index % 2) * 0.2 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-black dark:bg-white">
                    <Award className="h-6 w-6 text-white dark:text-black" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Explore Ghana?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join us on an unforgettable journey through Ghana's most captivating destinations.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black hover:bg-gray-200 transition-colors rounded-lg font-semibold"
            >
              Browse Our Trips
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
