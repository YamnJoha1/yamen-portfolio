"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/utils/motion";

interface HeroSectionProps {
  title: string;
  description?: string;
  children?: ReactNode; // CTA أو أي محتوى إضافي
  withBackground?: boolean; // خيار إظهار الخلفية
}

export function HeroSection({ 
  title, 
  description, 
  children, 
  withBackground = true 
}: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Background Elements */}
      {withBackground && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
        </>
      )}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer()}
        className="container mx-auto px-6 relative z-10 text-center max-w-4xl"
      >
        <motion.div variants={fadeIn("up")}>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold pb-6 bg-gradient-to-tr from-primary to-secondary bg-clip-text text-transparent">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>

        {/* Extra content (buttons, links, etc.) */}
        {children && <div className="mt-8">{children}</div>}
      </motion.div>
    </section>
  );
}
