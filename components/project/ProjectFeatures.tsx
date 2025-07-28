"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Layers } from 'lucide-react';
import { useTranslations } from 'next-intl';
import enProjects from '@/locales/en/projects.json';
import arProjects from '@/locales/ar/projects.json';

interface ProjectFeaturesProps {
  project: {
    featuresKey?: string;
  };
  locale: string;
}

export function ProjectFeatures({ project, locale }: ProjectFeaturesProps) {
  const t = useTranslations('projects');
  const isRTL = locale === 'ar';

  // Get features array directly from messages
  const getFeatures = (): string[] => {
    if (!project?.featuresKey) return [];

    const messages = locale === 'ar' ? arProjects : enProjects;
    const keys = project.featuresKey.split('.');

    let result: unknown = messages.projects;
    for (const key of keys) {
      if (typeof result === 'object' && result !== null && key in result) {
        result = (result as Record<string, unknown>)[key];
      } else {
        return [];
      }
    }

    return Array.isArray(result) ? result as string[] : [];
  };


  const features = getFeatures();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-card dark:bg-card/80 rounded-xl p-6 shadow-lg"
      dir={`${isRTL ? 'rtl' : 'ltr'}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Layers className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">{t("keyFeatures")}</h2>
      </div>
      {features.length > 0 ? (
        <ul className="space-y-3" role="list">
          {features.map((feature: string, index: number) => (
            <li key={index} className="flex items-start gap-3">
              <span 
                className="w-1.5 h-1.5 mt-2 rounded-full bg-primary flex-shrink-0" 
                aria-hidden="true"
              />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">{t("noFeaturesAvailable")}</p>
      )}
    </motion.div>
  );
} 