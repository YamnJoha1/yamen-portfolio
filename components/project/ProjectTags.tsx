import { Project } from "@/lib/data/projects";
import { Calendar, Folder, Tag } from "lucide-react";
import { Badge, BadgeProps } from "../ui/badge";

interface ProjectTagsProps {
  project: Project;
  variant?: BadgeProps["variant"];
}

export const ProjectTags = ({ project, variant = "secondary" }: ProjectTagsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <TagItem icon={<Tag className="w-4 h-4" />} label={project?.category} variant={variant} />
      <TagItem icon={<Folder className="w-4 h-4" />} label={project?.type} variant={variant} />
      <TagItem icon={<Calendar className="w-4 h-4" />} label={project?.year} variant={variant} />
    </div>
  );
};

const TagItem = ({
  icon,
  label,
  variant,
}: {
  icon: React.ReactNode;
  label?: string | number;
  variant: BadgeProps["variant"];
}) => {
  return (
    <Badge variant={variant} className="gap-1 text-sm">
      {icon}
      {label}
    </Badge>
  );
};
