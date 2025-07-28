"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { useLocale, useTranslations } from "next-intl";
import { techStack } from "@/utils/techIcons";
import { fadeIn } from "@/utils/motion";
import Image from "next/image";

export default function AboutSection() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <Section id="about" className="bg-muted/30 pl-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Personal Info */}
        <motion.div
          variants={fadeIn("up")}    
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="w-fit">
            <h2 className="text-3xl md:text-4xl font-bold w-fit">
              {t("title")}
            </h2>
            <p className="text-muted-foreground max-w-xl mt-1">
              {t("subtitle")}
            </p>
            <div className="relative h-1 mt-3 bg-accent w-[60%]">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-accent bg-muted" />
              <div className="absolute -left-[26px] -top-[11px] w-8 h-1 rotate-45 bg-accent" />
            </div>
          </div>

          {/* Personal Stats */}
          <StatsSection />

          {/* Tech Stack */}
          <motion.div
            variants={fadeIn("up")}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 pt-4"
          >
            {techStack.map((tech, index) => (
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

        {/* Right Column - Expertise */}
        <div dir={locale === "ar" ? "rtl" : "ltr"} className="text-left lg:text-start">
          <motion.div
            variants={fadeIn("left")}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative bg-white/5 backdrop-blur-md p-6 rounded-2xl 
              border border-white/10 shadow-xl overflow-hidden
              transition-all hover:scale-[1.01] hover:shadow-2xl"
          >
            {/* Optional light background swirl or shape */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div className="absolute w-40 h-40 bg-primary/30 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>

            {/* Content */}
            <div className="relative space-y-4">
              <div className="flex gap-3 items-center">
                <Image src="/logos/yamn-jo.png" width={40} height={40} alt="LOGO" />
                <h3 className="text-2xl font-semibold text-primary">
                  {t("titleRight")}
                </h3>
              </div>

              {t("description").split("\n").map((line, index) => (
                <p key={index} className="text-md text-foreground leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

function StatsSection() {
  const locale = useLocale();
  return (
    <div 
      className="grid grid-cols-2 gap-6"
    >
      <StatItem value="3+" label={locale === "en" ? "Years Experience" : "سنوات الخبرة"} />
      <StatItem value="50+" label={locale === "en" ? "Projects Completed" : "المشاريع المكتملة"} />
      <StatItem value="100%" label={locale === "en" ? "Client Satisfaction" : "رضا العملاء"} />
      <StatItem value="∞" label={locale === "en" ? "Passion" : "الشغف"} />
    </div>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div 
      className="space-y-2 border-l-2 border-primary pl-4"
    >
      <h3 className="text-2xl font-bold text-accent">{value}</h3>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
}
