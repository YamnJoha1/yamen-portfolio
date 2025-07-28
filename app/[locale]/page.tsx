import { NextIntlClientProvider } from 'next-intl';
import enHome from '@/locales/en/home.json';
import arHome from '@/locales/ar/home.json';
import enAbout from '@/locales/en/about.json';
import arAbout from '@/locales/ar/about.json';
import enServices from '@/locales/en/services.json';
import arServices from '@/locales/ar/services.json';
import enExperience from '@/locales/en/experience.json';
import arExperience from '@/locales/ar/experience.json';
import enProjects from '@/locales/en/projects.json';
import arProjects from '@/locales/ar/projects.json';
import enContact from '@/locales/en/contact.json';
import arContact from '@/locales/ar/contact.json';
import enSkills from '@/locales/en/skills.json';
import arSkills from '@/locales/ar/skills.json';
import HomeClient from '@/components/HomeClient';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = locale === 'ar'
    ? { ...arHome, ...arAbout, ...arServices, ...arExperience, ...arProjects, ...arContact, ...arSkills }
    : { ...enHome, ...enAbout, ...enServices, ...enExperience, ...enProjects, ...enContact, ...enSkills };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <HomeClient />
    </NextIntlClientProvider>
  );
}
