import { Github, Linkedin, Twitter, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

const defaultSocialLinks: SocialLink[] = [
  {
    icon: Github,
    href: "https://github.com/yourusername",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/yourusername",
    label: "LinkedIn",
  },
  {
    icon: Twitter,
    href: "https://twitter.com/yourusername",
    label: "Twitter",
  },
];

export function SocialLinks({ className, iconClassName }: SocialLinksProps) {
  return (
    <div className={cn("flex gap-4", className)}>
      {defaultSocialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors",
            iconClassName
          )}
          aria-label={`Visit our ${social.label} profile`}
        >
          <social.icon className="w-6 h-6 text-primary" />
        </a>
      ))}
    </div>
  );
} 