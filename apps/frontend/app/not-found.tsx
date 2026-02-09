"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Compass, ArrowLeft, Home, Map } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-white transition-colors duration-300 flex flex-col">
      <Navigation />

      <main className="flex-grow flex items-center justify-center relative overflow-hidden py-20">
        {/* --- Background Decorative Elements --- */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 dark:bg-amber-500/5 blur-[120px] rounded-full z-0" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated Icon */}
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="inline-block mb-8"
            >
              <Compass className="w-24 h-24 text-amber-600 dark:text-amber-500 stroke-[1px]" />
            </motion.div>

            {/* Error Text */}
            <h1 className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter opacity-10 dark:opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
              404
            </h1>

            <div className="relative">
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                OFF THE <br /> 
                <span className="text-amber-600 dark:text-amber-500">BEATEN PATH.</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-12 font-medium">
                It looks like the destination you're looking for doesn't exist or has moved to a new territory.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="group flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-sm rounded-2xl transition-all hover:scale-105 shadow-xl"
              >
                <Home className="w-4 h-4" /> Return Home
              </Link>
              
              <Link
                href="/destinations"
                className="group flex items-center gap-3 px-8 py-4 bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 font-black uppercase tracking-widest text-sm rounded-2xl transition-all hover:bg-gray-200 dark:hover:bg-white/10"
              >
                <Map className="w-4 h-4 text-amber-600" /> Explore Map
              </Link>
            </div>

            {/* Back Link */}
            <button 
              onClick={() => window.history.back()}
              className="mt-12 flex items-center gap-2 mx-auto text-xs font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}