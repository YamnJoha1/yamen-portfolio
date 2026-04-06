"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useLocale } from "next-intl";

export default function StickyCVButton() {
  const locale = useLocale();

  return (
    <motion.a
      href="/YamenJoha-CV.pdf"
      target="_blank"
      rel="noopener noreferrer"
      download
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className={`
        fixed bottom-4 z-50
        left-1/2 -translate-x-1/2
        md:left-auto md:translate-x-0
        ${locale === "ar" ? "md:right-6" : "md:left-6"}
        
        flex items-center gap-2
        bg-accent text-primary
        px-5 py-3 rounded-md
        shadow-xl hover:shadow-2xl
        border-accent
        transition-all duration-300
        hover:scale-105 active:scale-95
      `}
    >
      <Download className="w-4 h-4" />

      <span className="text-sm font-medium">
        {locale === "en" ? "Download Resume" : "تحميل السيرة الذاتية"}
      </span>
    </motion.a>
  );
}