"use client";

import { useState } from "react";
import { projects, ProjectCategory, ProjectType } from "@/lib/data/projects";
import { Filters } from "@/components/project/Filters";
import { ProjectsGrid } from "@/components/project/ProjectsGrid";
import { useTranslations } from 'next-intl';

export default function ProjectsPageClient({ locale }: { locale: string }) {
  const t = useTranslations('projects');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");
  const [selectedType, setSelectedType] = useState<ProjectType | "all">("all");

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory !== "all" && project.category !== selectedCategory) return false;
    if (selectedType !== "all" && project.type !== selectedType) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold my-6">{t('title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
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

          <ProjectsGrid projects={filteredProjects} locale={locale} />

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 bg-muted/30 rounded-xl mt-8">
              <p className="text-muted-foreground">{t('activeFilters')}: {t('clearAllFilters')}</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedType("all");
                }}
                className="mt-2 text-primary underline"
              >
                {t('clearAllFilters')}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 