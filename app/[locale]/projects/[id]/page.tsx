import { projects } from "@/lib/data/projects";
import { NextIntlClientProvider } from "next-intl";
import enProjects from '@/locales/en/projects.json';
import arProjects from '@/locales/ar/projects.json';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { ProjectDetailPageContent } from "./ProjectDetails";

export async function generateStaticParams() {
  const locales = ["en", "ar"];
  return projects.flatMap((project) =>
    locales.map((locale) => ({
      locale,
      id: project.id,
    }))
  );
}

export default async function Page({
  params, 
  }: {
  params: Promise<{ locale: string, id: string }>}) {
  const { locale, id } = await params;
  const messages = locale === "ar" ? arProjects : enProjects;

  return (
    <ErrorBoundary>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ProjectDetailPageContent locale={locale} id={id} />
      </NextIntlClientProvider>
    </ErrorBoundary>
  );
}