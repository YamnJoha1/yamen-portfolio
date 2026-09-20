export const dynamic = 'force-static';
export const revalidate = false;


import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { Suspense } from 'react';
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { ScrollProvider } from '@/lib/contexts/ScrollContext';
import { LoadingProvider } from '@/lib/contexts/LoadingContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { NavigationProgress } from '@/components/ui/NavigationProgress';
import { cn } from '@/lib/utils';
import { fontSans } from '@/lib/fonts';

const supportedLocales = ['en', 'ar'] as const;
type SupportedLocale = (typeof supportedLocales)[number];

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
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

  // Required for static rendering: without it next-intl reads the locale from a
  // middleware header, which is unavailable under `dynamic = 'force-static'`.
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
    >
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <LoadingProvider>
              <NextIntlClientProvider>
                <ScrollProvider>
                  <LoadingSpinner />
                  <NavigationProgress />
                  <header>
                    <Navbar />
                  </header>
                  <main>{children}</main>
                  <Footer />
                </ScrollProvider>
              </NextIntlClientProvider>
            </LoadingProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
