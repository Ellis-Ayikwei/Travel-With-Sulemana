"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/destinations", label: "Destinations" },
    { href: "/experiences", label: "Experiences" },
    { href: "/watch", label: "Watch" },
    { href: "/blog", label: "Blog" },
    { href: "/plan-your-trip", label: "Plan Trip" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-[100] border-b border-gray-200/50 dark:border-white/5 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="relative flex items-center hover:opacity-80 transition-opacity">
            {mounted ? (
              <Image
                src={theme === "dark" ? "/assets/images/logo-dark-mode.png" : "/assets/images/logo-light-mode.png"}
                alt="Travel with Sulemana"
                width={140}
                height={38}
                priority
                className="object-contain"
              />
            ) : (
              <div className="w-32 h-8 bg-gray-200 dark:bg-gray-800 animate-pulse rounded" />
            )}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-bold tracking-tight transition-colors ${
                    isActive 
                      ? "text-amber-600 dark:text-amber-500" 
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-amber-600 dark:bg-amber-500" 
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side Tools */}
          <div className="flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative p-2.5 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-all group overflow-hidden"
                aria-label="Toggle theme"
              >
                <motion.div
                  initial={false}
                  animate={{ y: theme === "dark" ? 0 : 40, opacity: theme === "dark" ? 1 : 0 }}
                  className="absolute inset-0 flex items-center justify-center text-amber-400"
                >
                  <Sun className="w-5 h-5" />
                </motion.div>
                <motion.div
                  initial={false}
                  animate={{ y: theme === "light" ? 0 : -40, opacity: theme === "light" ? 1 : 0 }}
                  className="flex items-center justify-center text-gray-700"
                >
                  <Moon className="w-5 h-5" />
                </motion.div>
              </button>
            )}

            <Link 
              href="/book" 
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Book Now <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 bg-gray-100 dark:bg-white/5 rounded-full text-gray-900 dark:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-100 dark:border-white/5 bg-white dark:bg-[#050505] overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-black tracking-tighter transition-colors ${
                    pathname === link.href ? "text-amber-600 dark:text-amber-500" : "text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 w-full py-4 bg-amber-500 text-black text-center font-black uppercase tracking-widest rounded-xl"
              >
                Book Your Adventure
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}