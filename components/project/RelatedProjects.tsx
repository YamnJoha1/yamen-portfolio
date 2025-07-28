"use client";

import React from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { projects } from '@/lib/data/projects';

interface RelatedProjectsProps {
  currentProjectId: string;
  locale: string;
}

export function RelatedProjects({ currentProjectId, locale }: RelatedProjectsProps) {
  const t = useTranslations('projects');
  const isRTL = locale === 'ar';

  // Get related projects (excluding current project, limit to 3)
  const relatedProjects = projects
    .filter(project => project.id !== currentProjectId)
    .slice(0, 3);

  if (relatedProjects.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-16"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className={`text-2xl font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>
          {t("relatedProjects")}
        </h2>
        <Button variant="outline" asChild>
          <Link href={`/${locale}/projects`}>
            {t("viewAllProjects")}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {relatedProjects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className={`text-lg ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t(project.titleKey)}
                </CardTitle>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 2).map((tech: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className={`text-sm text-muted-foreground mb-4 line-clamp-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t(project.descriptionKey)}
                </p>
                <Button variant="ghost" size="sm" asChild className="w-full">
                  <Link href={`/${locale}/projects/${project.id}`}>
                    {t("viewProject")}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 