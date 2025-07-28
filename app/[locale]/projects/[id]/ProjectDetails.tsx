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
import { RelatedProjects } from '@/components/project/RelatedProjects';



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
    <main className="min-h-screen lg:p-24 py-10 pt-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <Button variant="ghost" asChild className="lg:mb-8 -ml-4">
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
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6" dir={`${isRTL ? 'rtl' : 'ltr'}`}>
            <div>
              <h1 className="text-4xl font-bold mb-4 inline-block">{t(project.titleKey)}</h1>
              <span className='mr-5 text-sm border border-accent shadow-lg rounded-lg py-1.5 px-3 font-bold '>
                {project.statusKey && t(project.statusKey)}
              </span>
              <ProjectTags variant="outline" project={project} />
              <p className={`text-lg text-muted-foreground max-w-3xl ${isRTL ? 'text-right' : 'text-left'}`}>
                {t(project.descriptionKey)}
              </p>
            </div>
             <div className="flex flex-col gap-4">
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

        {/* Related Projects */}
        <RelatedProjects currentProjectId={id} locale={locale} />
      </div>
    </main>
  );
}
