"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun, X, Globe2, Home, User, Briefcase, MessageSquare, FileText } from "lucide-react";
import Link from "next/link";
import { socialLinks } from "@/lib/data/links";
import Logo from "./Logo";
import { handleLanguageChange, handleNavClick, isActive } from "@/utils/navHelpers";
import { navLinks } from "@/utils/navLinks";

import { motion, AnimatePresence } from "framer-motion";

// Enhanced motion variants
const sidebarVariants = {
  closed: {
    x: "100%",
    opacity: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      duration: 0.3
    }
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      duration: 0.3,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const menuItemVariants = {
  closed: {
    x: 20,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30
    }
  }
};

const backdropVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  }
};

const MobileNav = () => {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
 
  const [isOpen, setIsOpen] = useState(false);

  // Icon mapping for nav items
  const getNavIcon = (href: string) => {
    switch (href) {
      case "/":
        return Home;
      case "/#about":
        return User;
      case "/#skills":
        return Briefcase;
      case "/projects":
        return FileText;
      case "/#contact":
        return MessageSquare;
      default:
        return Home;
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Trigger Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="relative"
        >
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={{
              open: { rotate: 90 },
              closed: { rotate: 0 }
            }}
            transition={{ duration: 0.2 }}
          >
            <Menu className="h-6 w-6" />
          </motion.div>
        </Button>
      </motion.div>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-screen w-[320px] z-50 bg-background/80 backdrop-blur-sm border-l border-border/50 shadow-2xl flex flex-col"
            aria-label="Mobile navigation menu"
          >
            {/* Header */}
            <motion.div 
              className="flex items-center justify-between p-6 border-b border-border/50"
              variants={menuItemVariants}
            >
              <h2 className="text-left font-extrabold text-accent">
                <Logo />
              </h2>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 p-0 hover:bg-muted transition-colors cursor-pointer border-border/50"
                  aria-label="Close menu"
                  onClick={handleClose}
                >
                  <motion.div
                    animate={isOpen ? "open" : "closed"}
                    variants={{
                      open: { rotate: 180 },
                      closed: { rotate: 0 }
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>

            {/* Navigation */}
            <nav className="flex flex-col flex-1 p-6 bg-inherit overflow-auto" aria-label="Primary navigation">
              <div className="space-y-2 flex-1 min-h-0 overflow-auto">
                {navLinks.map((link, index) => {
                  const IconComponent = getNavIcon(link.href);
                  const isActiveLink = isActive(pathname, locale, link.href);
                  
                  return (
                    <motion.div
                      key={link.href}
                      variants={menuItemVariants}
                      custom={index}
                      className="bg-inherit"
                    >
                      <Link
                        href={`/${locale}${link.href}`}
                        className={`group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                          isActiveLink
                            ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
                        }`}
                        aria-current={isActiveLink ? "page" : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(link.href, locale, pathname, router);
                          handleClose();
                        }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`p-2 rounded-lg transition-colors ${
                            isActiveLink 
                              ? "bg-primary/20 text-primary" 
                              : "bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                          }`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </motion.div>
                        <span className={`font-medium text-lg transition-colors ${
                          isActiveLink ? "text-primary" : "group-hover:text-foreground"
                        }`}>
                          {t(link.labelKey)}
                        </span>
                        {isActiveLink && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="w-2 h-2 bg-primary rounded-full ml-auto"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer Controls */}
              <motion.div 
                className="space-y-6 pt-6 border-t border-border/50"
                variants={menuItemVariants}
              >
                {/* Theme Toggle */}
                <motion.div 
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-sm font-medium text-muted-foreground">
                    {locale === "ar" ? "المظهر" : "Theme"}
                  </span>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label={locale === "ar" ? "تبديل الثيم" : "Toggle theme"}
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="h-9 w-9 border-border/50"
                    >
                      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Language Toggle */}
                <motion.div 
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-sm font-medium text-muted-foreground">
                    {locale === "ar" ? "اللغة" : "Language"}
                  </span>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      onClick={() =>
                        handleLanguageChange(pathname, router, locale === "ar" ? "en" : "ar")
                      }
                      className="flex items-center gap-2 h-9 border-border/50"
                      aria-label={locale === "ar" ? "تغيير اللغة" : "Change language"}
                    >
                      <Globe2 size={14} />
                      <span className="text-sm font-medium">
                        {locale === "ar" ? "العربية" : "English"}
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Social Links */}
                <motion.div 
                  className="pt-4"
                  variants={menuItemVariants}
                >
                  <div className="flex justify-center gap-4">
                    {socialLinks.map((item, index) => (
                      <motion.div
                        key={item.name}
                        whileHover={{ scale: 1.2, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 border border-border/30"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={item.name}
                        >
                          <item.icon className="h-5 w-5" aria-hidden="true" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
