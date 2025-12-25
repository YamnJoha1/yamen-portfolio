"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Section } from "../ui/Section";

import { contactInfo, socialLinks } from "@/lib/data/links";
import { ContactCard } from "../ContactCard"
import { fadeIn } from "@/utils/motion";
import { Form } from "../Form";
import { Send } from "lucide-react";



export default function ContactSection() {
  const t = useTranslations("contact");
  const ts = useTranslations("contact.social.links");
  const ti = useTranslations("contact.info.items");
  const locale = useLocale()
  const isRTL = locale === 'ar' ;  
 
  return (
    <Section
      id="contact"
      title={t("title")}
      description={t("description")}
      className="bg-background max-w-full"
      titleAlign="center"
    >
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info & Social */}
        <motion.div
          variants={fadeIn("right")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8 flex flex-col relative"
        >
          {/* Contact Info */}
          <div dir={isRTL ? 'rtl' : 'ltr'}>
            <h3 className="text-lg font-semibold mb-3">{t("info.title")}</h3>
            <p className="text-muted-foreground mb-4">{t("info.description")}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.slice(0, 4).map((item) => (
                <ContactCard
                  key={item.labelKey}
                  label={ti(item.labelKey)}
                  icon={<item.icon className="w-5 h-5" />}
                  description={ti(item.descriptionKey)}
                  link={item.href}
                  color={item.color} 
                />
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div dir={isRTL ? 'rtl' : 'ltr'}>
            <h3 className="text-lg font-semibold mb-3">{t("social.title")}</h3>
            <p className="text-muted-foreground mb-4">{t("social.description")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((item) => (
                <ContactCard
                  key={item.labelKey}
                  label={ts(item.labelKey)}
                  icon={<item.icon className="w-5 h-5" />}
                  description={ts(item.descriptionKey)}
                  link={item.href}
                  color={item.color}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          variants={fadeIn("up")}
          className="space-y-8"
          dir={`${locale === 'ar' ? "rtl" : "ltr"}`}
        >
          <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Send className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">{t("form.title")}</h2>
            </div>
            <p className="text-muted-foreground mb-8">
              {t("form.description")}
            </p>
            <Form />
          </div>
        </motion.div>              
      </div>
    </Section>
  );
}
