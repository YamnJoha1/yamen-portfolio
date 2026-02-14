export const dynamic = 'force-static';
export const revalidate = false;


import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { ScrollProvider } from '@/lib/contexts/ScrollContext';
import { LoadingProvider } from '@/lib/contexts/LoadingContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const supportedLocales = ['en', 'ar'] as const;
type SupportedLocale = (typeof supportedLocales)[number];

async function getMessages(locale: SupportedLocale) {
  try {
    const files = [
      "nav", "experience", "footer",
      "contact", "services", "about", "home", "projects", "skills"
    ];

    const messagesList = await Promise.all(
      files.map(async (name) => {
        const mod = await import(`@/locales/${locale}/${name}.json`);
        return mod.default;
      })
    );

    return Object.assign({}, ...messagesList);
  } catch (e) {
    console.error('Error loading messages:', e);
    notFound();
  }
}

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

  const messages = await getMessages(locale as SupportedLocale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
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

