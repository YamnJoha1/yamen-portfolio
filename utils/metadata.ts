import enMetadata from '@/locales/data/en/metadata.json';
import arMetadata from '@/locales/data/ar/metadata.json';

export type PageType = 'home' | 'projects' ;

interface MetadataResult {
  title: string;
  description: string;
  image: string;
  siteName: string;
  defaultImage: string;
}

export function getPageMetadata(page: PageType, locale: string = 'en'): MetadataResult {
  const metadata = locale === 'ar' ? arMetadata : enMetadata;
  const pageData = metadata.pages[page];
  
  return {
    title: pageData.title,
    description: pageData.description,
    image: pageData.image,
    siteName: metadata.global.siteName,
    defaultImage: metadata.global.defaultImage,
  };
}

export function getGlobalMetadata(locale: string = 'en') {
  const metadata = locale === 'ar' ? arMetadata : enMetadata;
  return metadata.global;
} 