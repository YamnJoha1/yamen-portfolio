// utils/metadata.ts
import { Metadata } from "next";

export const globalMetadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: {
    default: "Yamen Joha | Personal Portfolio",
    template: "%s | Yamen Joha",
  },
  description:
    "Frontend developer passionate about building modern, smooth web applications using cutting-edge technologies like React.js, Next.js, and TypeScript.",
  keywords: [
    "frontend developer",
    "React.js",
    "Next.js",
    "TypeScript",
    "portfolio",
    "web development",
  ],
  authors: [{ name: "Yamen Joha" }],
  creator: "Yamen Joha",
  publisher: "Yamen Joha",
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    title: "Yamen Joha | Personal Portfolio",
    description:
      "Frontend developer passionate about building modern, smooth web applications using cutting-edge technologies like React.js, Next.js, and TypeScript.",
    siteName: "Yamen Joha",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Yamen Joha Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yamen Joha | Personal Portfolio",
    description:
      "Frontend developer passionate about building modern, smooth web applications using cutting-edge technologies like React.js, Next.js, and TypeScript.",
    creator: "@yourhandle", // Replace with your Twitter handle if available
    images: ["/images/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/logos/yamn-jo/favicon-96x96.png",
        type: "image/png",
        sizes: "96x96",
      },
      {
        url: "/logos/yamn-jo/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/logos/yamn-jo/favicon.ico",
        type: "image/x-icon",
      },
    ],
    shortcut: "/logos/yamn-jo/favicon.ico",
    apple: [
      {
        url: "/logos/yamn-jo/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },
  manifest: "/logos/yamn-jo/site.webmanifest",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
