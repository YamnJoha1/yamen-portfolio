"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { useLocale, useTranslations } from "next-intl";
import { techStack } from "@/utils/techIcons";
import { fadeIn } from "@/utils/motion";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

export default function AboutSection() {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <Section id="about" className="bg-muted/30">
      <div className="flex flex-col gap-12 px-4 md:px-12 lg:px-20">

        {/* Header */}
        <div className="space-y-3 text-center">
          <h2 className="text-2xl md:text-4xl font-bold">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            {t("subtitle")}
          </p>

          <div className="relative h-1 mt-3 bg-accent w-24 mx-auto">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-accent bg-muted" />
          </div>
        </div>

        {/* Profile Card */}
        <motion.div
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl flex flex-col items-center text-center gap-4"
        >
          <Image
            src="/me.png"
            width={100}
            height={100}
            alt="profile"
            className="rounded-2xl shadow-lg"
          />

          <h3 className="text-xl md:text-2xl font-semibold text-primary">
            {t("titleRight")}
          </h3>
          <div
            dir={locale === "ar" ? "rtl" : "ltr"}
            className="max-w-4xl mx-auto text-center md:text-left space-y-4 text-secondary-foreground leading-relaxed"
          >
            <ReactMarkdown>{t("description")}</ReactMarkdown>
          </div>
        </motion.div>

        {/* Description - Full Width */}

        {/* Stats Cards */}
        <motion.div
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <StatCard value="3+" label={locale === "en" ? "Years Experience" : "سنوات الخبرة"} />
          <StatCard value="50+" label={locale === "en" ? "Projects Completed" : "المشاريع"} />
          <StatCard value="100%" label={locale === "en" ? "Client Satisfaction" : "رضا العملاء"} />
          <StatCard value="∞" label={locale === "en" ? "Passion" : "الشغف"} />
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {techStack.slice(6, 11).map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md"
              style={{ color: tech.color }}
            >
              <tech.icon className="w-4 h-4" />
              <span className="text-sm text-muted-foreground">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </Section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center shadow-md hover:scale-105 transition">
      <h3 className="text-xl font-bold text-accent">{value}</h3>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}