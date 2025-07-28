"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import { Play, AlertCircle } from 'lucide-react';

interface VideoPreviewProps {
  videoUrl: string;
  locale: string;
}

export function VideoPreview({ videoUrl, locale }: VideoPreviewProps) {
  const t = useTranslations('projects');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isRTL = locale === 'ar';

  const handleLoadStart = () => setIsLoading(true);
  const handleCanPlay = () => setIsLoading(false);
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 space-y-4"
      >
        <h2 className={`text-2xl font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>
          {t("projectPreview")}
        </h2>
        <div className="rounded-xl overflow-hidden shadow-lg bg-muted dark:bg-muted/50 p-8 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">{t("videoLoadError")}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12 space-y-4"
    >
      <h2 className={`text-2xl font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>
        {t("projectPreview")}
      </h2>
      <div className="rounded-xl overflow-hidden shadow-lg bg-muted dark:bg-muted/50 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <div className="flex items-center gap-2">
              <Play className="w-6 h-6 animate-pulse" />
              <span className="text-sm">{t("loadingVideo")}</span>
            </div>
          </div>
        )}
        <video
          src={videoUrl}
          controls
          playsInline
          preload="metadata"
          className="w-full h-auto rounded-xl"
          onLoadStart={handleLoadStart}
          onCanPlay={handleCanPlay}
          onError={handleError}
          aria-label={t("projectPreview")}
        />
      </div>
    </motion.div>
  );
} 