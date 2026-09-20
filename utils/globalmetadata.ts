import { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const globalMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yamen Joha | Product Engineer — Full-Stack",
    template: "%s | Yamen Joha",
  },
  description:
    "Product Engineer — Full-Stack specialising in multi-tenant SaaS, scalable architectures, and modern web applications.",
  keywords: [
    "Product Engineer",
    "Full-Stack Developer",
    "React.js",
    "Next.js",
    "TypeScript",
    "SaaS",
    "Multi-tenant",
    "Portfolio",
    "Web Development",
  ],
  authors: [{ name: "Yamen Joha" }],
  creator: "Yamen Joha",
  publisher: "Yamen Joha",
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: `${SITE_URL}/en`,
      ar: `${SITE_URL}/ar`,
    },
  },
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Yamen Joha | Product Engineer — Full-Stack",
    description:
      "Product Engineer — Full-Stack specialising in multi-tenant SaaS, scalable architectures, and modern web applications.",
    siteName: "Yamen Joha",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yamen Joha - Product Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yamen Joha | Product Engineer — Full-Stack",
    description:
      "Product Engineer — Full-Stack specialising in multi-tenant SaaS, scalable architectures, and modern web applications.",
    images: ["/og-image.png"],
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
