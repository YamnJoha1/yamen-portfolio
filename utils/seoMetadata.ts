import { getPageMetadata } from "@/utils/metadata";

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
      url: `/${locale}${basePath}`
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.title,
      description: seoData.description,
      images: [seoData.image || seoData.defaultImage],
    },
    alternates: {
      canonical: `/${locale}${basePath}`,
      languages: {
        "en": isHome ? `/en` : `/en${basePath}`,
        "ar": isHome ? `/ar` : `/ar${basePath}`,
      },
    },
  };
}
