import { projects } from '@/lib/data/projects';
import enProjects from '@/locales/en/projects.json';
import arProjects from '@/locales/ar/projects.json';
import { getGlobalMetadata } from '@/utils/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { locale, id } = await params;
  const project = projects.find(p => p.id === id);
  const messages = locale === 'ar' ? arProjects : enProjects;
  const globalMetadata = getGlobalMetadata(locale);
  
  if (!project) {
    return {
      title: locale === 'ar' ? 'المشروع غير موجود | Portfolio' : 'Project Not Found | Portfolio',
      description: locale === 'ar' ? 'المشروع المطلوب غير موجود' : 'The requested project could not be found',
      openGraph: {
        title: locale === 'ar' ? 'المشروع غير موجود | Portfolio' : 'Project Not Found | Portfolio',
        description: locale === 'ar' ? 'المشروع المطلوب غير موجود' : 'The requested project could not be found',
        type: 'website',
        locale: locale,
        alternateLocale: locale === 'en' ? 'ar' : 'en',
        siteName: globalMetadata.siteName,
        images: [globalMetadata.defaultImage],
      },
      twitter: {
        card: 'summary_large_image',
        title: locale === 'ar' ? 'المشروع غير موجود | Portfolio' : 'Project Not Found | Portfolio',
        description: locale === 'ar' ? 'المشروع المطلوب غير موجود' : 'The requested project could not be found',
        images: [globalMetadata.defaultImage],
      },
      alternates: {
        canonical: `/${locale}/projects/${id}`,
        languages: {
          "en": `/en/projects/${id}`,
          "ar": `/ar/projects/${id}`,
        },
      },
    };
  }

  const title = messages.projects[project.titleKey as keyof typeof messages.projects] as string;
  const description = messages.projects[project.descriptionKey as keyof typeof messages.projects] as string;
  const projectImage = project.desktopImage || project.tabletImage || project.mobileImage || globalMetadata.defaultImage;

  return {
    title: `${title} | Portfolio`,
    description,
    openGraph: {
      title: `${title} | Portfolio`,
      description,
      type: 'website',
      locale: locale,
      alternateLocale: locale === 'en' ? 'ar' : 'en',
      siteName: globalMetadata.siteName,
      url: `/${locale}/projects/${id}`,
      images: [projectImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Portfolio`,
      description,
      images: [projectImage],
    },
    alternates: {
      canonical: `/${locale}/projects/${id}`,
      languages: {
        "en": `/en/projects/${id}`,
        "ar": `/ar/projects/${id}`,
      },
    },
  };
}