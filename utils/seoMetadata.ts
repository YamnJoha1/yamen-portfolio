import { getPageMetadata } from "@/utils/metadata";
import { SITE_URL } from "@/lib/constants";

export function createMetadata(page: 'home' | 'projects', locale: string) {
  const seoData = getPageMetadata(page, locale);

  const isHome = page === 'home';
  const basePath = isHome ? '' : `/${page}`;
  
  return {
    title: seoData.title,
    description: seoData.description,
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      images: [seoData.image || seoData.defaultImage],
      siteName: seoData.siteName,
      locale: locale || "en",
      type: "website",
      url: `${SITE_URL}/${locale}${basePath}`,
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.title,
      description: seoData.description,
      images: [seoData.image || seoData.defaultImage],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}${basePath}`,
      languages: {
        en: isHome ? `${SITE_URL}/en` : `${SITE_URL}/en${basePath}`,
        ar: isHome ? `${SITE_URL}/ar` : `${SITE_URL}/ar${basePath}`,
      },
    },
  };
}
