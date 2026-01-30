"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MapPin, Camera, Heart, Globe, Award, Sparkles, Compass, ShieldCheck } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-white transition-colors duration-500">
      <Navigation />

      {/* --- Breadcrumb --- */}
      <div className="pt-32 pb-6">
        <div className="container mx-auto px-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-gray-400 hover:text-amber-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              ABOUT <br />
              <span className="text-amber-500 uppercase">Sulemana.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
              Discover the story behind our mission to showcase Ghana's beauty, culture, and hidden treasures to the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- MEET SULEMANA (Text preserved exactly) --- */}
      <section className="py-24 bg-gray-50 dark:bg-white/5 border-y border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                <img
                  src="/assets/images/IMG_2220.jpg"
                  alt="Sulemana"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-amber-500 text-black p-8 rounded-3xl shadow-2xl rotate-3 hidden md:block">
                <Sparkles className="w-8 h-8 mb-2" />
                <p className="text-xs font-black uppercase tracking-widest">Storyteller</p>
              </div>
            </motion.div>

            {/* Right Side - Text (UNTOUCHED) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <h2 className="text-5xl font-black tracking-tighter uppercase mb-8">Meet Sulemana</h2>

              <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                <p>
                  I'm Sulemana, a passionate storyteller and travel filmmaker dedicated to showcasing the incredible beauty, rich culture, and hidden treasures of Ghana. Through my lens, I bring you authentic experiences that go beyond typical tourist destinations.
                </p>
                
                {/* Visual Break / Pull Quote Style */}
                <div className="py-4 px-8 border-l-4 border-amber-500 bg-amber-500/5 my-8">
                   <p className="text-xl font-bold text-gray-900 dark:text-white italic">
                     "From the wildlife-rich savannas of Mole National Park to the historic walls of Cape Coast Castle, I document the stories that make Ghana truly special."
                   </p>
                </div>

                <p>
                  My mission is to inspire travelers worldwide to discover the warmth, heritage, and natural wonders of my beloved country.
                </p>
                <p>
                  Join me on this journey as we explore Ghana's most captivating destinations, meet incredible local communities, and create unforgettable memories together.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="mt-12 pt-12 border-t border-gray-200 dark:border-white/10">
                <div className="grid grid-cols-2 gap-10">
                  <div>
                    <p className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">10+</p>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mt-2">Years of Experience</p>
                  </div>
                  <div>
                    <p className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">500+</p>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mt-2">Happy Travelers</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">Our Core Values</h2>
            <p className="text-gray-500 font-medium tracking-wide uppercase text-xs tracking-[0.3em]">The principles that guide our journey</p>
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
                  className="p-10 bg-white dark:bg-white/5 rounded-[2.5rem] border border-gray-100 dark:border-white/10 hover:border-amber-500/50 transition-all shadow-xl shadow-black/5"
                >
                  <div className="w-14 h-14 bg-black dark:bg-white rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white dark:text-black" />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-4">{value.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Preserved Text, Modern Grid) --- */}
      <section className="py-32 bg-black text-white rounded-[4rem] mx-4 relative overflow-hidden">
        <div className="container mx-auto px-10 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black tracking-tighter uppercase">Why Choose Us?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { title: "Local Expertise", desc: "Deep knowledge of Ghana's destinations, culture, and hidden gems that you won't find in guidebooks." },
              { title: "Personal Touch", desc: "Every tour is customized to your interests and preferences. We're not a one-size-fits-all operation." },
              { title: "Sustainable Tourism", desc: "We're committed to responsible tourism that benefits local communities and preserves Ghana's natural heritage." },
              { title: "Professional Support", desc: "24/7 customer support before, during, and after your trip ensures peace of mind." },
              { title: "Quality Accommodations", desc: "Carefully selected 4-5 star hotels and lodges that combine comfort with authentic experiences." },
              { title: "Expert Guides", desc: "Knowledgeable and passionate local guides who bring destinations to life with stories." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0 h-10 w-10 bg-amber-500 rounded-lg flex items-center justify-center text-black">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-black uppercase tracking-tight mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-40 text-center">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-12">
              Ready to <span className="text-amber-500">Explore?</span>
            </h2>
            <Link
              href="/book"
              className="inline-flex items-center gap-4 px-12 py-6 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl transition-transform hover:scale-105"
            >
              Browse Our Trips <ArrowLeft className="w-5 h-5 rotate-180" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}