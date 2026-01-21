"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";

export default function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/destinations", label: "Destinations" },
    { href: "/experiences", label: "Experiences" },
    { href: "/watch", label: "Watch" },
    { href: "/blog", label: "Blog" },
    { href: "/plan-your-trip", label: "Plan Your Trip" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
              <span className="text-white dark:text-black font-bold text-xl">T</span>
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-white hidden sm:inline">
              Travel with Sulemana
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side - Theme Toggle & Mobile Menu */}
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
