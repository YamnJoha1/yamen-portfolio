"use client";

import { motion } from "framer-motion";
import { Project } from "@/lib/data/projects";
import Image from "next/image";
import Link from "next/link";
import { Code2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ProjectTags } from "./ProjectTags";
import { ProjectLinks } from "./ProjectLinks";

interface ProjectCardProps {
  project: Project;
  index: number;
  locale: string;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const t = useTranslations('projects');
  const locale = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card dark:bg-card/80 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:border-border/50 transition-shadow h-full flex flex-col p-0"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {/* Project Image */}
      <Link href={`/${locale}/projects/${project.id}`}>
        <div className="relative h-48 bg-muted dark:bg-muted/50 group">
          <Image
            src={project.desktopImage ?? "/images/placeholder.webp"}
            alt={project.titleKey}
            fill
            className="object-cover object-top transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/50 dark:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center h-[103%]">
            <p className="text-white font-medium">
              {t("viewDetails")}
            </p>
          </div>
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-1 justify-between">
        {/* Project Info */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <Link href={`/projects/${project.id}`}>
                <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                  {t(project.titleKey)}
                </h3>
              </Link>
              <ProjectTags project={project} />
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-3">
            {t(project.descriptionKey)}
          </p>
          {project.audienceKey && (
            <div className="mb-4">
              <span className="block text-sm font-medium text-foreground">
                {t("audienceText")}:
              </span>
              <p className="text-sm text-muted-foreground">
                {t(project.audienceKey)}
              </p>
            </div>
          )}
        </div>

        {/* Footer: Tech Stack + Action Buttons */}
        <div>
          {/* Tech Stack */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{t("techStack")}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-muted rounded-md text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <ProjectLinks link={project.link} t={t} />
        </div>
      </div>

    </motion.div>
  );
}
