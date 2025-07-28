"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ProjectOverviewProps {
  project: {
    overviewKey?: string;
    purposeKey?: string;
    goalKey?: string;
    audienceKey?: string;
  };
  locale: string;
}

export function ProjectOverview({ project, locale }: ProjectOverviewProps) {
  const t = useTranslations('projects');
  const isRTL = locale === 'ar';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card dark:bg-card/80 rounded-xl p-6 shadow-lg"
      dir={`${isRTL ? 'rtl' : 'ltr'}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">{t("projectOverview")}</h2>
      </div>
      <div className="space-y-3 text-muted-foreground text-normal leading-relaxed">
        {project.overviewKey && <p>{t(project.overviewKey)}</p>}

        {project.purposeKey ? (
          <p>
            {t("purposeText")} <span className="font-bold">{t(project.purposeKey)}</span>.
          </p>
        ) : (
          <p>{t("defaultPurpose")}</p>
        )}

        {project.goalKey ? (
          <p>
            {t("goalText")} <span className="font-bold">{t(project.goalKey)}</span>.
          </p>
        ) : (
          <p>{t("defaultGoal")}</p>
        )}

        {project.audienceKey ? (
          <p>
            {t("audienceText")} <span className="font-bold">{t(project.audienceKey)}</span>.
          </p>
        ) : (
          <p>{t("defaultAudience")}</p>
        )}
      </div>
    </motion.div>
  );
} 