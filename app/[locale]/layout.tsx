import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { ScrollProvider } from '@/lib/contexts/ScrollContext';
import { LoadingProvider } from '@/lib/contexts/LoadingContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import enNav from '@/locales/en/nav.json';
import arNav from '@/locales/ar/nav.json';
import enFooter from '@/locales/en/footer.json';
import arFooter from '@/locales/ar/footer.json';

export const revalidate = 60;

const navMessages = {
  en: enNav.nav ?? enNav,
  ar: arNav.nav ?? arNav,
};
const footerMessages = {
  en: enFooter.footer ?? enFooter,
  ar: arFooter.footer ?? arFooter,
};

const supportedLocales = ['en', 'ar'] as const;
type SupportedLocale = (typeof supportedLocales)[number];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!supportedLocales.includes(locale as SupportedLocale)) {
    notFound();
  }
  const typedLocale = locale as SupportedLocale;
  const messages = {
    nav: navMessages[typedLocale],
    footer: footerMessages[typedLocale],
  };
  return (
    <NextIntlClientProvider locale={typedLocale} messages={messages}>
      <LoadingProvider>
        <ScrollProvider>
          <LoadingSpinner />
          <header>
            <Navbar />
          </header>
          <main>{children}</main>
          <Footer />
        </ScrollProvider>
      </LoadingProvider>
    </NextIntlClientProvider>
  );
}
