"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { fadeIn } from "@/utils/motion";

interface RelatedItem {
  slug?: string;        // للـ services
  id?: string;          // للـ projects
  title: string;        // عنوان مترجم جاهز
  description: string;  // وصف مترجم جاهز
  href: string;         // رابط التفاصيل
}

interface RelatedGridProps {
  title: string;          // عنوان القسم (ex: t("relatedTitle"))
  subtitle?: string;      // نص ثانوي (اختياري)
  items: RelatedItem[];   // العناصر المرتبطة
  locale: string;
  readMoreLabel: string;  // نص زر "اقرأ المزيد" أو "عرض المشروع"
}

export function RelatedGrid({
  title,
  subtitle,
  items,
  readMoreLabel,
}: RelatedGridProps) {
  if (!items.length) return null;

  return (
    <section >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="container mx-auto px-6"
      >
        <motion.div variants={fadeIn("up")} className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item) => (
            <motion.div
              key={item.slug ?? item.id}
              variants={fadeIn("up")}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                <div className="flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-4 pb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-6">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-background transition-colors duration-300"
                    >
                      <Link
                        href={item.href}
                        className="flex items-center justify-center gap-2"
                      >
                        {readMoreLabel}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
