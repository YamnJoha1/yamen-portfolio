"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useTranslations } from "next-intl";
import { fadeIn, slideIn } from "@/utils/motion";
import { TechIconsSection } from "@/graphic/TechIconsFloating";
import { techStack } from "@/utils/techIcons";



export default function WelcomeSection() {
  const t = useTranslations('home.hero');



  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-background to-background/80">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            variants={fadeIn("down", "tween", 0, 0.8)}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div 
              variants={slideIn("left", "tween", 0.2, 0.4)}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <Sparkles size={16} className="text-accent"/>
              <span className="text-sm font-medium">Yamen Joha</span>
            </motion.div>

            <h1 
              className="text-4xl md:text-6xl font-bold text-foreground"
            >
              {t("title")}
            </h1>

            <p 
              className="text-lg text-muted-foreground max-w-xl"
            >
              {t("subtitle")}
            </p>

            <div 
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="group">
                {t("cta")}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
              </Button>
              <Button size="lg" variant="outline" className="group">
                {t("bprojects")}
                <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
              </Button>
            </div>

            {/* Tech Stack Pills */}
            <motion.div 
              variants={fadeIn("right", "tween", 0.2, 0.8)}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3 pt-4"
            >
              {techStack.slice(0, 5).map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg"
                  style={{ color: tech.color }}
                >
                  <tech.icon className="w-4 h-4" />
                  <span className="text-sm text-muted-foreground">{tech.name}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Graphic Elements */}
          <TechIconsSection />
        </div>
      </div>
    </section>
  );
} 