export type ProjectCategory = 'all' | 'web' | 'mobile';

export type ProjectType =
  | 'landing'
  | 'marketplace'
  | 'ecommerce'
  | 'dashboard'
  | 'ios & android'
  | 'blog'
  | 'portfolio'
  | 'saas'
  | '3d-showcase'    
  | 'landing-page'
  | 'real-estate'

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
  statusKey?: string;
  audienceKey?: string;
  goalKey?: string;
  purposeKey?: string;
}

export const projects: Project[] = [
  {
    id: "scripto-website",
    titleKey: "scriptoWebsite.title",
    descriptionKey: "scriptoWebsite.description",
    overviewKey: "scriptoWebsite.overview",
    desktopImage: "/projects/Scripto/scripto.png",
    mobileImage: "/projects/Scripto/scripto-iPhone.png",
    tabletImage: "/projects/Scripto/scripto-light-iPadPro11.png",
    category: "web",
    type: "portfolio",
    year: 2025,
    client: "Personal Project",
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
    desktopImage: "/projects/RealEstate/real-estate-MacbookPro16.png",
    mobileImage: "/projects/RealEstate/realestate-iphone.png",
    tabletImage: "/projects/RealEstate/realestate-ipadpro11.png",
    category: "web",
    type: "saas",
    year: 2025,
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
    id: "caros",
    titleKey: "caros.title",
    descriptionKey: "caros.description",
    overviewKey: "caros.overview",
    desktopImage: "/projects/Caros/Caros-Macbook-Pro-16.png",
    mobileImage: "/projects/Caros/Caros-iPhone-15-.png",
    tabletImage: "/projects/Caros/Caros-iPhone-15-Pro.png",
    category: "web",
    type: "marketplace",
    year: 2025,
    client: "Personal Project",
    technologies: [
      "Next.js", "React", "Tailwind CSS", "Zod",
      "Framer Motion", "Lucide", "Swiper", "React Hook Form"
    ],
    featuresKey: "caros.features",
    link: "https://caros-rho.vercel.app/",
    github: undefined,
    duration: "N/A",
    teamSize: "4 developers",
    statusKey: "caros.status",
    audienceKey: "caros.audience",
    goalKey: "caros.goal",
    purposeKey: "caros.purpose"
  },

  {
    id: "ecommerce-platform",
    titleKey: "ecommercePlatform.title",
    descriptionKey: "ecommercePlatform.description",
    overviewKey: "ecommercePlatform.overview",
    desktopImage: "/projects/e-commerce/ecommerce-MacbookPro.png",
    mobileImage: "/projects/e-commerce/ecommerce-light-iPhone15pro.png",
    tabletImage: "/projects/e-commerce/ecommerce-light-iPadpro11.png",
    category: "web",
    type: "saas",
    year: 2025,
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
    id: "book-library",
    titleKey: "bookLibrary.title",
    descriptionKey: "bookLibrary.description",
    overviewKey: "bookLibrary.overview",
    desktopImage: "/projects/real-estate.png",
    mobileImage: "",
    tabletImage: "",
    category: "web",
    type: "portfolio",
    year: 2025,
    client: "Personal Project",
    technologies: [
      "Next.js", "React", "Tailwind CSS", "Zod", 
      "Drizzle ORM", "Neon DB", "ImageKit", "Next Auth",
      "Radix UI", "React Hook Form", "Upstash Redis"
    ],
    featuresKey: "bookLibrary.features",
    link: "https://jo-library.vercel.app/",
    github: undefined,
    duration: "2 weeks",
    teamSize: "1 developer",
    statusKey: "bookLibrary.status",
    audienceKey: "bookLibrary.audience",
    goalKey: "bookLibrary.goal",
    purposeKey: "bookLibrary.purpose"
  },

  {
    id: "react-portfolio",
    titleKey: "reactPortfolio.title",
    descriptionKey: "reactPortfolio.description",
    overviewKey: "reactPortfolio.overview",
    desktopImage: "/projects/Portfolio/portfolio-MacbookPro.png",
    mobileImage: "/projects/Portfolio/portfolio-iphone.png",
    tabletImage: "/projects/Portfolio/portfolio-ipad11pro.png",
    category: "web",
    type: "portfolio",
    year: 2025,
    client: "Personal Project",
    technologies: [
      "React", "Vite", "Three.js", "React Three Fiber", "Framer Motion", 
      "Tailwind CSS", "EmailJS", "React Router"
    ],
    featuresKey: "reactPortfolio.features",
    link: "https://react-portfolio-topaz-omega.vercel.app/",
    github: "https://github.com/YamnJoha1/react-portfolio/",
    duration: "N/A",
    teamSize: "1 developer",
    statusKey: "reactPortfolio.status",
    audienceKey: "reactPortfolio.audience",
    goalKey: "reactPortfolio.goal",
    purposeKey: "reactPortfolio.purpose"
  },  

  {
    id: "iphone",
    titleKey: "iphone.title",
    descriptionKey: "iphone.description",
    overviewKey: "iphone.overview",
    desktopImage: "/projects/iPhone/Macbook-pro-16.png",
    mobileImage: "/projects/iPhone/iPhone-15-Pro.png",
    tabletImage: "/projects/iPhone/iPad-Pro-11.png",
    category: "web",
    type: "3d-showcase",
    year: 2025,
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
  },
  {
    id: "travel-app",
    titleKey: "travelApp.title",
    descriptionKey: "travelApp.description",
    overviewKey: "travelApp.overview",
    desktopImage: "/projects/TravelApp/travel-macbook.png",
    mobileImage: "/projects/TravelApp/travel-iphone.png",
    tabletImage: "/projects/TravelApp/travel-ipad.png",
    category: "web",
    type: "landing-page",
    year: 2025,
    client: "Personal Project",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS"
    ],
    featuresKey: "travelApp.features",
    link: "https://travel-app-rho-rosy.vercel.app/",
    github: "https://github.com/YamnJoha1/travel-app",
    duration: "N/A",
    teamSize: "1 developer",
    statusKey: "travelApp.status",
    audienceKey: "travelApp.audience",
    goalKey: "travelApp.goal",
    purposeKey: "travelApp.purpose"
  }
  
]
