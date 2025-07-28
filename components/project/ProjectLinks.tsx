import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface ProjectLinksProps {
  link?: string;
  github?: string;
  t: ReturnType<typeof useTranslations>;
  column?: boolean;
}


export function ProjectLinks({ link, t, column = false }: ProjectLinksProps) {
  const containerClasses = `flex gap-2 mt-2 ${column ? "flex-col" : ""}`;

  return (
    <div className={containerClasses}>
      {link && (
        <Button
          className="flex-1"
          onClick={() => window.open(link, "_blank")}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          {t("liveDemo")}
        </Button>
      )}
    </div>
  );
}
