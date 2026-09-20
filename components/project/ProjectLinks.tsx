import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Project } from "@/lib/data/projects";

interface ProjectLinksProps {
  link?: string;
  github?: string;
  status?: Project["status"];
  demos?: Project["demos"];
  t: ReturnType<typeof useTranslations>;
  column?: boolean;
}

export function ProjectLinks({
  link,
  status,
  demos,
  t,
  column = false,
}: ProjectLinksProps) {
  const containerClasses = `flex gap-2 mt-2 ${column ? "flex-col" : "flex-wrap"}`;

  if (status === "private") {
    return (
      <div className={containerClasses}>
        <span className="text-xs uppercase tracking-wide text-muted-foreground border border-border rounded-md px-2 py-1">
          {t("privateLabel")}
        </span>
      </div>
    );
  }

  if (!link && (!demos || demos.length === 0)) return null;

  return (
    <div className={containerClasses}>
      {link && (
        <Button
          className="flex-1"
          onClick={() => window.open(link, "_blank", "noopener,noreferrer")}
        >
          <ExternalLink className="w-4 h-4 me-2" />
          {t("liveDemo")}
        </Button>
      )}

      {demos?.map((demo) => (
        <Button
          key={demo.url}
          variant="outline"
          className="flex-1"
          onClick={() => window.open(demo.url, "_blank", "noopener,noreferrer")}
        >
          <ExternalLink className="w-4 h-4 me-2" />
          {t(demo.labelKey)}
        </Button>
      ))}
    </div>
  );
}
