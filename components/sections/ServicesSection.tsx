"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { services } from "@/lib/data/services";
import { useLocale, useTranslations } from "next-intl";
import { containerVariants, itemVariants } from "@/utils/motion";

export default function ServicesSection() {
  const t = useTranslations('');
  const locale = useLocale();

  return (
    <Section
      title={t("services.title")}
      className="bg-muted/30"
      titleAlign="center"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative bg-card rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >

            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl pointer-events-none" />

            <div className="relative z-10">

              <div className="mb-6 inline-block p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition">
                <service.icon className="w-8 h-8 text-accent group-hover:scale-110 transition-transform duration-200" />
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
                {t(service.titleKey)}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(service.descriptionKey)}       
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
