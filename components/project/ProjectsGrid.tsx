"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/project/ProjectCard";
import { Project } from "@/lib/data/projects";

interface ProjectsGridProps {
  projects: Project[];
  locale: string;
}

export function ProjectsGrid({ projects, locale }: ProjectsGridProps) {
  return (
    <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} locale={locale} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
