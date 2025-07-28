"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section } from "../ui/Section";

import { contactLinks, socialLinks } from "@/lib/data/links";
import { ContactCard } from "../ContactCard"
import { fadeIn } from "@/utils/motion";
import { Form } from "../Form";



export default function ContactSection() {
  const t = useTranslations("contact");
 
  return (
    <Section
      id="contact"
      title={t("title")}
      description={t("description")}
      className="bg-muted/30 max-w-full"
      titleAlign="center"
    >
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info & Social */}
        <motion.div
          variants={fadeIn("right")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactLinks.map((item) => (
              <ContactCard
                key={item.name}
                icon={<item.icon className="w-5 h-5" />}
                description={item.description}
                link={item.href}
              />
            ))}
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">{t("social.title")}</h3>
            <p className="text-muted-foreground mb-4">{t("social.description")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((item) => (
                <ContactCard
                  key={item.name}
                  icon={<item.icon className="w-5 h-5" />}
                  description={item.name}
                  link={item.href}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          variants={fadeIn("left")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-card rounded-2xl p-8 shadow-lg"
        >
          <Form />
        </motion.div>
      </div>
    </Section>
  );
}
