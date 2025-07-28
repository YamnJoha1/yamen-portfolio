"use client";

import { useEffect } from "react";
import WelcomeSection from "@/components/sections/WelcomeSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";

export default function HomeClient() {
  useEffect(() => {
    const targetId = localStorage.getItem("scroll-target-id");
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        localStorage.removeItem("scroll-target-id");
      } else {
        setTimeout(() => {
          const elDelayed = document.getElementById(targetId);
          if (elDelayed) {
            elDelayed.scrollIntoView({ behavior: "smooth" });
            localStorage.removeItem("scroll-target-id");
          }
        }, 500);
      }
    }
  }, []);

  return (
    <div className="flex flex-col">
      <WelcomeSection />
      <AboutSection />
      <ServicesSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
} 