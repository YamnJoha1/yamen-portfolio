"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/project/ProjectCard";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/Section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function ProjectsSection() {
  const t = useTranslations('projects');
  const params = useParams();
  const locale = params.locale as string || 'en';
  const featuredProjects = projects.slice(0, 3);

  return (
    <Section
      title={t("title")}
      description={t("description")}
      titleSlotRight={
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link href={`${locale}/projects`}>
            <Button variant="outline" className="group">
              {t("viewAll")}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
            </Button>
          </Link>
        </motion.div>
      }
    >

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} locale={locale} />
        ))}
      </div>
    </Section>
  );
} 