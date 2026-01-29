"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw, Home, MessageSquare } from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-white transition-colors duration-300 flex flex-col">
      <Navigation />

      <main className="flex-grow flex items-center justify-center relative overflow-hidden py-20">
        {/* --- Background Decorative Elements --- */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 dark:bg-red-500/5 blur-[120px] rounded-full z-0" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            {/* Warning Icon */}
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full" />
              <div className="relative p-6 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl">
                <AlertTriangle className="w-12 h-12 text-amber-600 dark:text-amber-500" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-[0.9]">
              The Path <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-500">
                Is Blocked.
              </span>
            </h1>
            
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 font-medium">
              We encountered an unexpected technical glitch while loading this part of your journey. Even the best explorers hit a snag sometimes.
            </p>

            {/* Recovery Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => reset()}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-sm rounded-2xl transition-all hover:scale-105 shadow-xl shadow-amber-500/10"
              >
                <RefreshCcw className="w-4 h-4" /> Try Again
              </button>
              
              <Link
                href="/"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 font-black uppercase tracking-widest text-sm rounded-2xl transition-all hover:bg-gray-200 dark:hover:bg-white/10"
              >
                <Home className="w-4 h-4" /> Go Home
              </Link>
            </div>

            {/* Secondary Help */}
            <div className="mt-16 pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col items-center gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                Persistent issue? Let us know.
              </p>
              <Link 
                href="/contact"
                className="flex items-center gap-2 text-sm font-black text-amber-600 dark:text-amber-500 hover:underline underline-offset-4"
              >
                <MessageSquare className="w-4 h-4" /> Contact Support
              </Link>
            </div>

            {/* Error Code (Subtle) */}
            {error.digest && (
              <p className="mt-8 text-[10px] font-mono text-gray-300 dark:text-gray-600 uppercase tracking-widest">
                Error Ref: {error.digest}
              </p>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}