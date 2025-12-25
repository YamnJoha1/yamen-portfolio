import { Code, Palette, Server } from "lucide-react";

export type Service = {
  icon: React.ElementType;
  titleKey: "services.software" | "services.design" | "services.consulting";
  descriptionKey: "services.description.software" | "services.description.design" | "services.description.consulting";
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
];
