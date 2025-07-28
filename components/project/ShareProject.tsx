"use client";

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';
import { Share2, Twitter, Linkedin, Facebook, Copy, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
// Simple toast implementation since sonner might not be installed
const toast = {
  success: (message: string) => console.log('Success:', message),
  error: (message: string) => console.error('Error:', message)
};

// Check if native sharing is supported

interface ShareProjectProps {
  projectTitle: string;
  projectUrl: string;
  locale: string;
}

export function ShareProject({ projectTitle, projectUrl, locale }: ShareProjectProps) {
  const t = useTranslations('projects');
  const [copied, setCopied] = useState(false);
  const isRTL = locale === 'ar';

  const shareData = {
    title: projectTitle,
    url: projectUrl,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(projectUrl);
      setCopied(true);
      toast.success(t("linkCopied"));
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t("copyFailed"));
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled sharing
      }
    }
  };

  const [isNativeShareSupported, setIsNativeShareSupported] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      setIsNativeShareSupported(true);
    }
  }, []);

  const handleSocialShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(projectUrl);
    const encodedTitle = encodeURIComponent(projectTitle);
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    };
    const shareUrl = urls[platform as keyof typeof urls];
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-card dark:bg-card/80 rounded-xl p-6 shadow-lg"
      dir={`${isRTL ? 'rtl' : 'ltr'}`}
    >
      <h2 className="text-xl font-semibold mb-4">{t("shareProject")}</h2>
      
      <div className="flex flex-wrap gap-2">
        {/* Native Share (mobile) */}
        {isNativeShareSupported && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleNativeShare}
            className="flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            {t("share")}
          </Button>
        )}

        {/* Social Media Buttons */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleSocialShare('twitter')}
          className="flex items-center gap-2"
        >
          <Twitter className="w-4 h-4" />
          Twitter
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleSocialShare('linkedin')}
          className="flex items-center gap-2"
          aria-label={t("shareOnLinkedIn")}
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleSocialShare('facebook')}
          className="flex items-center gap-2"
          aria-label={t("shareOnFacebook")}
        >
          <Facebook className="w-4 h-4" />
          Facebook
        </Button>

        {/* Copy Link */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="flex items-center gap-2"
          aria-label={t("copyLink")}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? t("copied") : t("copyLink")}
        </Button>
      </div>
    </motion.div>
  );
} 