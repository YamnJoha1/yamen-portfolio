"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { ProjectCategory, ProjectType } from "@/lib/data/projects";
import { ReactNode } from "react";
import { Filter as FilterIcon, Laptop, Smartphone } from "lucide-react";

interface FiltersProps {
  selectedCategory: ProjectCategory;
  selectedType: ProjectType | "all";
  onCategoryChange: (value: ProjectCategory) => void;
  onTypeChange: (value: ProjectType | "all") => void;
  clearFilters: () => void;
}

// القيم الثابتة للـ categories والـ types
const categoryValues: ProjectCategory[] = ["all", "web", "mobile"];

const categoryIcons: Record<ProjectCategory, ReactNode> = {
  all: <FilterIcon className="w-4 h-4" />,
  web: <Laptop className="w-4 h-4" />,
  mobile: <Smartphone className="w-4 h-4" />,
};

const typeValues: (ProjectType | "all")[] = [
  "all",
  "landing",
  "real-estate",
  "marketplace",
  "ecommerce",
  "dashboard",
  "ios & android",
  "blog",
];

export function Filters({
  selectedCategory,
  selectedType,
  onCategoryChange,
  onTypeChange,
  clearFilters,
}: FiltersProps) {
  const t = useTranslations("projects");

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {(selectedCategory !== "all" || selectedType !== "all") && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center gap-3 mb-4"
        >
          <span className="text-sm text-muted-foreground">{t("activeFilters") || "Active Filters:"}</span>

          {selectedCategory !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-2">
              {categoryIcons[selectedCategory]}
              {t(`categories.${selectedCategory}`)}
              <X
                className="w-3 h-3 ml-1 cursor-pointer"
                onClick={() => onCategoryChange("all")}
              />
            </Badge>
          )}

          {selectedType !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-2">
              {t(`types.${selectedType}`)}
              <X
                className="w-3 h-3 ml-1 cursor-pointer"
                onClick={() => onTypeChange("all")}
              />
            </Badge>
          )}
        </motion.div>
      )}

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {categoryValues.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => onCategoryChange(category)}
            className="min-w-[120px]"
          >
            {categoryIcons[category]}
            <span className="ml-2">{t(`categories.${category}`)}</span>
          </Button>
        ))}
      </div>

      {/* Type Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {typeValues.map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? "secondary" : "outline"}
            onClick={() => onTypeChange(type)}
            size="sm"
          >
            {t(`types.${type}`)}
          </Button>
        ))}
      </div>

      {/* Clear Button */}
      {(selectedCategory !== "all" || selectedType !== "all") && (
        <div className="text-center">
          <Button variant="link" onClick={clearFilters}>
            {t("clearAllFilters") || "Clear all filters"}
          </Button>
        </div>
      )}
    </div>
  );
}
