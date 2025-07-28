"use client";

import { createContext, useContext, useEffect, useCallback } from "react";

interface ScrollContextType {
  setTargetId: (id: string) => void;
  scrollToSection: (sectionId: string) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  setTargetId: () => {},
  scrollToSection: () => {},
});

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const scrollToSection = useCallback((sectionId: string) => {
    const cleanId = sectionId.replace("#", "");

    const attemptScroll = (attempts = 0) => {
      const element = document.getElementById(cleanId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }

      if (attempts < 5) {
        setTimeout(() => attemptScroll(attempts + 1), 100 * (attempts + 1));
      }
    };

    attemptScroll();
  }, []);

  useEffect(() => {
    const storedId = localStorage.getItem("scroll-target-id");
    if (storedId) {
      scrollToSection(storedId);
      localStorage.removeItem("scroll-target-id");
    }
  }, [scrollToSection]);

  const value = {
    setTargetId: (id: string) => {
      const cleanId = id.replace("#", "");
      localStorage.setItem("scroll-target-id", cleanId);
    },
    scrollToSection,
  };

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
