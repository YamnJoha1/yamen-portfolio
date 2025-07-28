import { NextIntlClientProvider } from 'next-intl';
import enProjects from '@/locales/en/projects.json';
import arProjects from '@/locales/ar/projects.json';
import ProjectsPageClient from '@/components/ProjectsPageClient';

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = locale === 'ar' ? arProjects.projects : enProjects.projects;
  return (
    <NextIntlClientProvider locale={locale} messages={{ projects: messages }}>
      <ProjectsPageClient locale={locale} />
    </NextIntlClientProvider>
  );
}
