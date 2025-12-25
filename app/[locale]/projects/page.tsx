"use client";

import { useState } from "react";
import { projects, ProjectCategory, ProjectType } from "@/lib/data/projects";
import { Filters } from "@/components/project/Filters";
import { ProjectsGrid } from "@/components/project/ProjectsGrid";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/utils/motion";
import { 
  Filter, 
  Search, 
} from "lucide-react";
import { HeroSection } from "@/components/HeroSection";

export default function ProjectsPage() {
  const t = useTranslations("projects");
  const locale = useLocale();

  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");
  const [selectedType, setSelectedType] = useState<ProjectType | "all">("all");

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory !== "all" && project.category !== selectedCategory) return false;
    if (selectedType !== "all" && project.type !== selectedType) return false;
    return true;
  });

  // const stats = [
  //   {
  //     icon: Briefcase,
  //     value: projects.length.toString(),
  //     label: "Projects Completed",
  //     description: "Successful deliveries"
  //   },
  //   {
  //     icon: Users,
  //     value: "50+",
  //     label: "Happy Clients",
  //     description: "Satisfied customers"
  //   },
  //   {
  //     icon: Award,
  //     value: "100%",
  //     label: "Success Rate",
  //     description: "Project completion"
  //   },
  //   {
  //     icon: Star,
  //     value: "5.0",
  //     label: "Client Rating",
  //     description: "Average satisfaction"
  //   }
  // ];

  return (
    <main className="min-h-screen bg-background">
      {/* Enhanced Hero Section */}
      <HeroSection
        title={t("title")}
        description={t("projectsPageDescription")}
      />

      {/* Filters + Grid Section */}
      <section className="pb-20 pt-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer()}
          className="container mx-auto px-6"
        >
          {/* Filters */}
          <motion.div
            variants={fadeIn("up")}
            className="mb-12"
          >
            <div className="rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Filter className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Filter Projects</h2>
              </div>
              
              <Filters
                selectedCategory={selectedCategory}
                selectedType={selectedType}
                onCategoryChange={setSelectedCategory}
                onTypeChange={setSelectedType}
                clearFilters={() => {
                  setSelectedCategory("all");
                  setSelectedType("all");
                }}
              />
            </div>
          </motion.div>

          {/* Results Summary */}
          {/* <motion.div
            variants={fadeIn("up")}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredProjects.length}</span> of <span className="font-semibold text-foreground">{projects.length}</span> projects
                </span>
              </div>
              
              {(selectedCategory !== "all" || selectedType !== "all") && (
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedType("all");
                  }}
                  className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div> */}

          {/* Projects Grid */}
          <motion.div
            variants={fadeIn("up")}
          >
            <ProjectsGrid projects={filteredProjects} locale={locale} />
          </motion.div>

          {/* No Results State */}
          {filteredProjects.length === 0 && (
            <motion.div
              variants={fadeIn("up")}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-6">
                  {t("projectNotFound")}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedType("all");
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  Clear all filters
                </button>
              </div>
            </motion.div>
          )}

          {/* Load More or CTA */}
        </motion.div>
      </section>
    </main>
  );
}
