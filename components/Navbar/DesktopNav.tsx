"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Globe2, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { handleLanguageChange, handleNavClick, isActive } from "@/utils/navHelpers";
import { navLinks } from "@/utils/navLinks";

const DesktopNav = () => {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("nav");  
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const langButtonRef = useRef<HTMLButtonElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target as Node) &&
        !langButtonRef.current?.contains(event.target as Node)
      ) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="hidden md:flex justify-between flex-1">
      <div className="md:flex-1 justify-center md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={`/${locale}${link.href}`}
            className={`font-body font-semibold transition-colors flex items-center gap-2 ${
              isActive(pathname, locale, link.href)
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(link.href, locale, pathname, router);
            }}
          >
            {t(link.labelKey)}
          </Link>
        ))}
      </div>

      <div className="relative flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="mr-2"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        <div className="relative">
          <Button
            ref={langButtonRef}
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
          >
            <Globe2 size={18} />
            {locale === "ar" ? "العربية" : "English"}
          </Button>

          <AnimatePresence>
            {isLangMenuOpen && (
              <motion.div
                ref={langMenuRef}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 8 }}
                exit={{ opacity: 0, y: 0 }}
                className="absolute right-0 top-full mt-1 w-32 bg-background border rounded-md shadow-lg z-50"
              >
                <button
                  className="w-full text-start px-4 py-2 hover:bg-muted transition-colors"
                  onClick={() => {
                    handleLanguageChange(pathname, router, "ar");
                    setIsLangMenuOpen(false);
                  }}
                >
                  🇸🇦 العربية
                </button>
                <button
                  className="w-full text-start px-4 py-2 hover:bg-muted transition-colors"
                  onClick={() => {
                    handleLanguageChange(pathname, router, "en");
                    setIsLangMenuOpen(false);
                  }}
                >
                  🇬🇧 English
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;
