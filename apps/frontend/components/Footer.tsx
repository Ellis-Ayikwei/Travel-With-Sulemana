"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
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

          {/* Destinations */}
          <div>
            <h3 className="text-white font-semibold mb-4">Destinations</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/destinations/northern" className="hover:text-white transition">Northern Ghana</Link></li>
              <li><Link href="/destinations/southern" className="hover:text-white transition">Southern Ghana</Link></li>
              <li><Link href="/destinations/eastern" className="hover:text-white transition">Eastern Ghana</Link></li>
              <li><Link href="/destinations/western" className="hover:text-white transition">Western Ghana</Link></li>
            </ul>
          </div>

          {/* Experiences */}
          <div>
            <h3 className="text-white font-semibold mb-4">Experiences</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/experiences/wildlife" className="hover:text-white transition">Wildlife Safaris</Link></li>
              <li><Link href="/experiences/cultural" className="hover:text-white transition">Cultural Tours</Link></li>
              <li><Link href="/experiences/adventure" className="hover:text-white transition">Adventure Activities</Link></li>
              <li><Link href="/experiences/food" className="hover:text-white transition">Food & Culinary</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+233 XX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@travelwithsulemana.com</span>
              </li>
              <li className="flex items-center gap-4 mt-4">
                <a href="#" className="hover:text-white transition"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="hover:text-white transition"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="hover:text-white transition"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="hover:text-white transition"><Youtube className="w-5 h-5" /></a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© 2026 Travel with Sulemana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
