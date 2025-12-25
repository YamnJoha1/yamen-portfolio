"use client";

import { projects } from '@/lib/data/projects';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import { ProjectTags } from '@/components/project/ProjectTags';
import { ProjectLinks } from '@/components/project/ProjectLinks';
import { DevicePreview } from '@/components/project/DevicePreview';
import { VideoPreview } from '@/components/project/VideoPreview';
import { ProjectOverview } from '@/components/project/ProjectOverview';
import { ProjectFeatures } from '@/components/project/ProjectFeatures';
import { ProjectTechnologies } from '@/components/project/ProjectTechnologies';
import { ShareProject } from '@/components/project/ShareProject';
import { RelatedGrid } from '@/components/RelatedGrid';



export function ProjectDetailPageContent({ locale, id }: { locale: string, id: string }) {
  const t = useTranslations('projects');
  const project = projects.find(p => p.id === id);
  const isRTL = locale === 'ar';

  // Get current URL for sharing
  const projectUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (!project) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t("projectNotFound")}</h1>
          <Button variant="link" asChild>
            <Link href={`/${locale}/projects`}>
              {t("backToProjects")}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <Button variant="ghost" asChild className="lg:mb-8 -ml-4 mt-3">
          <Link href={`/${locale}/projects`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("backToProjects")}
          </Link>
        </Button>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div 
            className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Left side (title, status, description, tags) */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Title + Status */}
              <div className="flex gap-3 flex-wrap mt-4 items-center">
                <h1 className="text-3xl md:text-4xl font-bold">
                  {t(project.titleKey)}
                </h1>
                {project.statusKey && (
                  <span className="text-xs md:text-sm bg-accent shadow rounded-sm px-2 py-0.5 text-center font-medium">
                    {t(project.statusKey)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className={`text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl ${isRTL ? 'text-right' : 'text-left'}`}>
                {t(project.descriptionKey)}
              </p>

              {/* Tags */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible">
                <ProjectTags variant="outline" project={project} />
              </div>
            </div>

            {/* Right side (links) */}
            <div className="flex flex-col gap-3 min-w-[200px]">
              <ProjectLinks link={project.link} t={t} />
            </div>
          </div>
        </motion.div>


        {/* Device Preview */}
        <DevicePreview project={project} locale={locale} />

        {/* Video Preview */}
        {project.videoUrl && (
          <VideoPreview videoUrl={project.videoUrl} locale={locale} />
        )}

        {/* Project Details Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <ProjectOverview project={project} locale={locale} />
            <ProjectFeatures project={project} locale={locale} />
          </div>

          {/* Sidebar */}
          <div className="space-y-8" dir={`${isRTL ? 'rtl' : 'ltr'}`}>
            <ProjectTechnologies technologies={project.technologies} locale={locale} />
            <ShareProject 
              projectTitle={t(project.titleKey)} 
              projectUrl={projectUrl} 
              locale={locale} 
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card dark:bg-card/80 rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-4">{t("quickLinks")}</h2>
              <ProjectLinks
                link={project.link}
                t={t}
                column
              />
            </motion.div>
          </div>
        </div>

        {/* Extra Project Information */}
        <div className="mt-12" dir={`${isRTL ? 'rtl' : 'ltr'}`}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.audienceKey && (
              <div className="bg-card dark:bg-card/80 rounded-xl p-5 shadow-md hover:shadow-lg transition">
                <h3 className="text-lg font-medium mb-2">{t("audienceText")}</h3>
                <p className="text-muted-foreground">{t(project.audienceKey)}</p>
              </div>
            )}
            {project.goalKey && (
              <div className="bg-card dark:bg-card/80 rounded-xl p-5 shadow-md hover:shadow-lg transition">
                <h3 className="text-lg font-medium mb-2">{t("goalText")}</h3>
                <p className="text-muted-foreground">{t(project.goalKey)}</p>
              </div>
            )}
            {project.purposeKey && (
              <div className="bg-card dark:bg-card/80 rounded-xl p-5 shadow-md hover:shadow-lg transition">
                <h3 className="text-lg font-medium mb-2">{t("purposeText")}</h3>
                <p className="text-muted-foreground">{t(project.purposeKey)}</p>
              </div>
            )}
          </div>
        </div>



      </div>
        {/* Related Projects */}
      <section className="py-16 bg-muted/30 mt-20">
          <RelatedGrid
            title={t("relatedProjects")}
            subtitle={t("relatedSub")}
            locale={locale}
            readMoreLabel={t("viewProject")}
            items={projects
              .filter((p) => p.id !== id) 
              .slice(0, 3)
              .map((p) => ({
                id: p.id,
                title: t(p.titleKey),
                description: t(p.descriptionKey),
                href: `/${locale}/projects/${p.id}`,
              }))}
          />
        </section>
    </main>
  );
}
