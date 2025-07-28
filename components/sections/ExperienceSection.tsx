"use client";

import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Section } from "@/components/ui/Section";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion"; 
import Link from "next/link";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

type Experience = {
  title: string;
  company: string;
  date: string;
  icon: string;
  iconBg: string;
  points: string[];
};

export default function ExperienceSection() {
  const t = useTranslations("experience");
  const experiences = t.raw("list") as Experience[];
  const locale = useLocale();

  return (
    <Section
      title={t("title")}
      description={t("subtitle")}
      className="bg-muted/30"
      titleAlign="left"
      titleMarginBottom="mb-10"
      titleSlotRight={
        <Link href="/YamnJoha-CV.pdf" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="default" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            {locale === "ar" ? "عرض السيرة الذاتية" : "View CV"}
          </Button>
        </Link>
      }
    >
      <motion.div
        variants={fadeIn("up", "spring", 0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <VerticalTimeline lineColor="var(--muted-foreground)">
          {experiences.map((exp, index) => (
            <VerticalTimelineElement
              key={index}
              contentStyle={{
              background: "var(--card)",
              color: "var(--card-foreground)",
              borderRadius: "1rem",
              padding: "1.5rem", 
              boxShadow: "var(--shadow-lg)",
              border: "none",
              position: "relative",  
            }}
              contentArrowStyle={{ borderRight: "7px solid var(--border)" }}
              date={exp.date}
              iconStyle={{ background: exp.iconBg }}
              icon={
                <div className="flex justify-center items-center w-full h-full">
                  <Image
                    src={exp.icon}
                    alt={exp.company}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              }
            >
              <motion.div
                variants={fadeIn("up", "spring", index * 0.2, 0.4)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
              >
                <h3 className="text-lg font-bold">{exp.title}</h3>
                <p className="text-sm text-muted-foreground">{exp.company}</p>
                <ul className="mt-4 list-disc mx-5 space-y-2">
                  {exp.points.map((point, i) => (
                    <li key={i} className="text-sm leading-relaxed text-foreground">
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </motion.div>
    </Section>
  );
}


