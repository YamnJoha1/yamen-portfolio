import { Code, Palette, Server, Smartphone } from "lucide-react";

export type Service = {
  icon: React.ElementType;
  titleKey: "services.software" | "services.design" | "services.consulting" | "services.mobileDev";
  descriptionKey: "services.description.software" | "services.description.design" | "services.description.consulting" | "services.description.mobileDev";
};

export const services: Service[] = [
  {
    icon: Code,
    titleKey: "services.software",
    descriptionKey: "services.description.software",
  },
  {
    icon: Palette,
    titleKey: "services.design",
    descriptionKey: "services.description.design",
  },
  {
    icon: Server,
    titleKey: "services.consulting",
    descriptionKey: "services.description.consulting",
  },
  {
    icon: Smartphone,
    titleKey: "services.mobileDev",
    descriptionKey: "services.description.mobileDev",
  },
];
