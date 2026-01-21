import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Travel with Sulemana - Explore Ghana's Treasures",
    template: "%s | Travel with Sulemana",
  },
  description: "Discover Ghana's hidden treasures with expert guides. From wildlife safaris to historic sites, experience authentic travel adventures.",
  keywords: [
    "Ghana travel",
    "Ghana tourism",
    "Ghana tours",
    "West Africa travel",
    "Ghana safari",
    "Ghana destinations",
    "travel guide Ghana",
    "Ghana adventures",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Travel with Sulemana - Explore Ghana's Treasures",
    description:
      "Discover Ghana's hidden treasures with personalized itineraries and expert local guides",
    siteName: "Travel with Sulemana",
    images: [
      {
        url:
          "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Travel with Sulemana",
      },
    ],
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    site: "@travelwithsulemana",
    creator: "@travelwithsulemana",
    title: "Travel with Sulemana - Explore Ghana's Treasures",
    description:
      "Discover Ghana's hidden treasures with personalized itineraries and expert local guides",
    images: [
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}


