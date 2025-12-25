  import { SiGithub, SiWhatsapp } from "@icons-pack/react-simple-icons";
  import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

  export interface SocialLink {
    icon: React.ElementType;
    href: string;
    labelKey: string;
    descriptionKey: string;
    color: string;
  }

  export interface ContactInfo {
    icon: React.ElementType;
    href?: string;
    labelKey: string;
    descriptionKey: string;
    color: string;
  }

  export const socialLinks: SocialLink[] = [
    {
      icon: SiGithub,
      href: "https://github.com/YamnJoha1",
      labelKey: "github.label",
      descriptionKey: "github.description",
      color: "#181717",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/yamn-joha-45586a267",
      labelKey: "linkedin.label",
      descriptionKey: "linkedin.description",
      color: "#0A66C2",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/scripto.technology/",
      labelKey: "instagram.label",
      descriptionKey: "instagram.description",
      color: "#E1306C",
    },
    {
      icon: SiWhatsapp,
      href: "https://wa.me/963938044059",
      labelKey: "whatsapp.label",
      descriptionKey: "whatsapp.description",
      color: "#25D366",
    },
  ];


  export const contactInfo: ContactInfo[] = [
    {
      icon: Mail,
      href: "mailto:yamn.joha@gmail.com",
      labelKey: "email.label",
      descriptionKey: "email.description",
      color: "#3B82F6", // blue-500
    },
    {
      icon: Phone,
      href: "tel:+963938044059",
      labelKey: "phone.label",
      descriptionKey: "phone.description",
      color: "#16A34A", // green-600
    },
    {
      icon: MapPin,
      labelKey: "location.label",
      descriptionKey: "location.description",
      color: "#DC2626", // red-600
    },
  ];

