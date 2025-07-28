import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ContactInfoItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}

interface ContactInfoProps {
  className?: string;
  items?: ContactInfoItem[];
}

const defaultContactInfo: ContactInfoItem[] = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@yourdomain.com",
    href: "mailto:contact@yourdomain.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 234 567 890",
    href: "tel:+1234567890",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Your Location",
    href: "#",
  },
];

export function ContactInfo({ className, items = defaultContactInfo }: ContactInfoProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {items.map((info) => (
        <Link
          key={info.label}
          href={info.href}
          className="flex items-center gap-4 p-4 rounded-lg bg-card hover:bg-accent transition-colors"
        >
          <div className="p-3 rounded-full bg-primary/10">
            <info.icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">{info.label}</h3>
            <p className="text-muted-foreground">{info.value}</p>
          </div>
        </Link>
      ))}
    </div>
  );
} 