"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export function NavigationProgress() {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsNavigating(true);
    const timeout = setTimeout(() => setIsNavigating(false), 500);
    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  if (!isNavigating) return null;

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
    />
  );
} 