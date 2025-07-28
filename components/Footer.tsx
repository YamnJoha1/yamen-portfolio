"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { navSocialLinks } from "@/lib/data/links";

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background/80 backdrop-blur-sm border-t">
      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-center md:justify-between gap-8">
        {/* Brand and Description */}
        <div className="text-center md:text-left space-y-4 max-w-md flex flex-col md:flex-row gap-4 items-center">
          <Link href={`/${locale}`}> 
            <Image 
              src="/logos/yamn-jo.png"
              width={50} height={50}
              alt="LOGO"
            />
          </Link>
          <div className="flex flex-col gap-4">
            <p className="text-muted-foreground text-sm">
              {t("description")}
            </p>
            <div className="flex justify-center md:justify-start gap-6">
              {navSocialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                >
                  <item.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-muted-foreground text-sm text-center md:text-right">
          &copy; {year} {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
