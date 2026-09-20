export type ProjectCategory = 'all' | 'web' | 'mobile';

export type ProjectType =
  | 'saas'
  | 'marketplace'
  | 'portfolio'
  | '3d-showcase';

/** A full-page screenshot shown in the gallery, for work with no public URL. */
export interface GalleryItem {
  src: string;
  captionKey: string;
  /** Intrinsic size, so the gallery reserves the right space and never shifts. */
  width: number;
  height: number;
}

/** A live environment a visitor can open, beyond the project's main link. */
export interface ProjectDemo {
  labelKey: string;
  url: string;
}

export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  overviewKey?: string;
  desktopImage?: string;
  tabletImage?: string;
  mobileImage?: string;
  videoUrl?: string;
  category: ProjectCategory;
  type: ProjectType;
  technologies: string[];
  link?: string;
  year: number;
  client?: string;
  featuresKey?: string;  
  github?: string;
  duration?: string;
  teamSize?: string;
  /** 'private' hides the Live Demo link and shows a "walkthrough on request" label instead. */
  status?: 'private';
  statusKey?: string;
  gallery?: GalleryItem[];
  demos?: ProjectDemo[];
  audienceKey?: string;
  goalKey?: string;
  purposeKey?: string;
}

export const projects: Project[] = [
  {
    id: "sello",
    titleKey: "sello.title",
    descriptionKey: "sello.description",
    overviewKey: "sello.overview",
    desktopImage: "/projects/sello/storefront.webp",
    mobileImage: "",
    tabletImage: "",
    category: "web",
    type: "saas",
    year: 2026,
    client: "Scripto",
    technologies: [
      "Next.js 15", "React 19", "TypeScript", "PostgreSQL (RLS)",
      "Supabase", "Tailwind CSS v4", "Zustand", "Zod", "Sentry", "next-intl"
    ],
    featuresKey: "sello.features",
    link: undefined,
    github: undefined,
    duration: "Ongoing",
    teamSize: "1 developer",
    status: "private",
    statusKey: "sello.status",
    gallery: [
      { src: "/projects/sello/storefront.webp", captionKey: "sello.gallery.storefront", width: 809, height: 1944 },
      { src: "/projects/sello/dashboard.webp", captionKey: "sello.gallery.dashboard", width: 1002, height: 1570 },
    ],
    audienceKey: "sello.audience",
    goalKey: "sello.goal",
    purposeKey: "sello.purpose"
  },

  {
    id: "x-bus",
    titleKey: "xBus.title",
    descriptionKey: "xBus.description",
    overviewKey: "xBus.overview",
    desktopImage: "/projects/x-bus/home.webp",
    mobileImage: "",
    tabletImage: "",
    category: "web",
    type: "marketplace",
    year: 2026,
    client: "Scripto",
    technologies: [
      "Next.js", "TypeScript", "PostgreSQL (plpgsql RPCs)", "Supabase",
      "TanStack Query", "Zustand", "Zod", "Vitest", "k6", "next-intl"
    ],
    featuresKey: "xBus.features",
    link: undefined,
    github: undefined,
    duration: "Ongoing",
    teamSize: "1 developer",
    status: "private",
    statusKey: "xBus.status",
    gallery: [
      { src: "/projects/x-bus/home.webp", captionKey: "xBus.gallery.home", width: 1366, height: 2013 },
      { src: "/projects/x-bus/trips.webp", captionKey: "xBus.gallery.trips", width: 1366, height: 1278 },
    ],
    audienceKey: "xBus.audience",
    goalKey: "xBus.goal",
    purposeKey: "xBus.purpose"
  },

  {
    id: "caros",
    titleKey: "caros.title",
    descriptionKey: "caros.description",
    overviewKey: "caros.overview",
    desktopImage: "/projects/Caros/showroom.webp",
    mobileImage: "",
    tabletImage: "",
    category: "web",
    type: "saas",
    year: 2025,
    client: "Personal Project",
    technologies: [
      "Next.js 15", "React 19", "TypeScript", "PostgreSQL (RLS)",
      "Supabase", "Tailwind CSS v4", "Web Push", "Leaflet", "next-intl"
    ],
    featuresKey: "caros.features",
    link: "https://caros.dev",
    github: undefined,
    duration: "N/A",
    teamSize: "1 developer",
    statusKey: "caros.status",
    demos: [
      { labelKey: "caros.demos.showroom", url: "https://showroom.caros.dev" },
      { labelKey: "caros.demos.rental", url: "https://rental-demo.caros.dev" },
    ],
    gallery: [
      { src: "/projects/Caros/showroom.webp", captionKey: "caros.gallery.showroom", width: 1559, height: 975 },
      { src: "/projects/Caros/rental-dashboard.webp", captionKey: "caros.gallery.dashboard", width: 1366, height: 1089 },
    ],
    audienceKey: "caros.audience",
    goalKey: "caros.goal",
    purposeKey: "caros.purpose"
  },

  {
    id: "scripto-website",
    titleKey: "scriptoWebsite.title",
    descriptionKey: "scriptoWebsite.description",
    overviewKey: "scriptoWebsite.overview",
    desktopImage: "/projects/Scripto/scripto.webp",
    mobileImage: "/projects/Scripto/scripto-iPhone.webp",
    tabletImage: "/projects/Scripto/scripto-light-iPadpro11.webp",
    category: "web",
    type: "portfolio",
    year: 2025,
    client: "Scripto",
    technologies: [
      "Next.js", "React", "Tailwind CSS", "Framer Motion", 
      "Radix UI", "React Query", "Next Themes", "Next SEO"
    ],
    featuresKey: "scriptoWebsite.features",
    link: "https://scripto-technology.com/",
    github: undefined,
    duration: "N/A",
    teamSize: "1 developer",
    statusKey: "scriptoWebsite.status",
    audienceKey: "scriptoWebsite.audience",
    goalKey: "scriptoWebsite.goal",
    purposeKey: "scriptoWebsite.purpose"
  },

  {
    id: "real-estate",
    titleKey: "realEstate.title",
    descriptionKey: "realEstate.description",
    overviewKey: "realEstate.overview",
    desktopImage: "/projects/RealEstate/real-estate-MacbookPro16.webp",
    mobileImage: "/projects/RealEstate/realestate-iphone.webp",
    tabletImage: "/projects/RealEstate/realestate-ipadpro11.webp",
    category: "web",
    type: "saas",
    year: 2024,
    client: "Personal Project",
    technologies: [
      "Next.js", "React", "Tailwind CSS", "Framer Motion",
      "Radix UI", "React Query", "Next Themes", "Next SEO",
      "NestJS", "PostgreSQL", "Cloudinary"
    ],
    featuresKey: "realEstate.features",
    link: "https://real-estate-kohl-theta.vercel.app/",
    github: undefined,
    duration: "Ongoing",
    teamSize: "1 developer",
    statusKey: "realEstate.status",
    audienceKey: "realEstate.audience",
    goalKey: "realEstate.goal",
    purposeKey: "realEstate.purpose"
  },

  {
    id: "ecommerce-platform",
    titleKey: "ecommercePlatform.title",
    descriptionKey: "ecommercePlatform.description",
    overviewKey: "ecommercePlatform.overview",
    desktopImage: "/projects/e-commerce/ecommerce-MacbookPro.webp",
    mobileImage: "/projects/e-commerce/ecommerce-light-iPhone15Pro.webp",
    tabletImage: "/projects/e-commerce/ecommerce-light-iPadpro11.webp",
    category: "web",
    type: "saas",
    year: 2024,
    client: "Personal Project",
    technologies: [
      "Next.js", "React", "Tailwind CSS", "GraphQL", "Apollo", 
      "Radix UI", "Zod", "React Query", "Prisma", 
      "NestJS", "Stripe", "React Native"
    ],
    featuresKey: "ecommercePlatform.features",
    link: "https://e-commerce-two-mu-73.vercel.app/",
    github: undefined,
    duration: "N/A",
    teamSize: "1 developer",
    statusKey: "ecommercePlatform.status",
    audienceKey: "ecommercePlatform.audience",
    goalKey: "ecommercePlatform.goal",
    purposeKey: "ecommercePlatform.purpose"
  },

  {
    id: "iphone",
    titleKey: "iphone.title",
    descriptionKey: "iphone.description",
    overviewKey: "iphone.overview",
    desktopImage: "/projects/iPhone/Macbook-Pro-16.webp",
    mobileImage: "/projects/iPhone/iPhone-15-Pro.webp",
    tabletImage: "/projects/iPhone/iPad-Pro-11.webp",
    category: "web",
    type: "3d-showcase",
    year: 2023,
    client: "Personal Project",
    technologies: [
      "React", "Vite", "Three.js", "React Three Fiber", "GSAP", 
      "@react-three/drei", "@gsap/react", "Tailwind CSS"
    ],
    featuresKey: "iphone.features",
    link: "https://i-phone-ecru-five.vercel.app/",
    github: "https://github.com/YamnJoha1/IPhone",
    duration: "N/A",
    teamSize: "1 developer",
    statusKey: "iphone.status",
    audienceKey: "iphone.audience",
    goalKey: "iphone.goal",
    purposeKey: "iphone.purpose"
  }
]
