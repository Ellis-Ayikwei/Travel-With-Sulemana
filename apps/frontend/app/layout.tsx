import type { Metadata, Viewport } from "next";
import { Libre_Caslon_Text } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-libre-caslon",
});

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
    <html
      lang="en"
      suppressHydrationWarning
      className={libreCaslon.variable}
    >
      <head>
        {/* Favicons and manifest */}
        <link rel="icon" href="/assets/favicon/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/assets/favicon/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/assets/favicon/favicon-16x16.png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/assets/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/assets/favicon/site.webmanifest" />
        {/* Next.js will also inject its own metadata here */}
      </head>
      <body className="font-sans" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}


