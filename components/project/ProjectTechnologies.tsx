"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Code2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';

interface ProjectTechnologiesProps {
  technologies: string[];
  locale: string;
}

export function ProjectTechnologies({ technologies, locale }: ProjectTechnologiesProps) {
  const t = useTranslations('projects');
  const isRTL = locale === 'ar';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card dark:bg-card/80 rounded-xl p-6 shadow-lg"
      dir={`${isRTL ? 'rtl' : 'ltr'}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Code2 className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">{t("technologies")}</h2>
      </div>
      {technologies.length > 0 ? (
        <div className="flex flex-wrap gap-2" role="list">
          {technologies.map((tech, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="transition-colors hover:bg-secondary/80"
            >
              {tech}
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">{t("noTechnologiesAvailable")}</p>
      )}
    </motion.div>
  );
} 