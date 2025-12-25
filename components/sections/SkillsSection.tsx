"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { useTranslations } from "next-intl";
import { fadeIn, staggerContainer } from "@/utils/motion";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiNestjs,
  SiNodedotjs,
  SiPostgresql,
  SiVercel,
  SiGithub,
  SiJavascript,
  SiCss3,
  SiGit,
  SiPrisma,
  SiStripe,
  SiWebpack,
  SiBabel,
  SiExpress,
  SiRedux
} from "@icons-pack/react-simple-icons";
import { 
  Code2, 
  Cloud, 
  Settings,
  Zap,
  Smartphone
} from "lucide-react";

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> | null;
  color: string;
  level: number; // 0-100
  category: string;
}

const skills: Skill[] = [
  // Frontend
  { name: "React", icon: SiReact, color: "#61DAFB", level: 85, category: "frontend" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000", level: 90, category: "frontend" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 85, category: "frontend" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", level: 90, category: "frontend" },
  { name: "Redux", icon: SiRedux, color: "#764ABC", level: 70, category: "frontend" },
  { name: "React Query", icon: null, color: "#FF4154", level: 75, category: "frontend" },
  { name: "React Hook Form", icon: null, color: "#EC5990", level: 70, category: "frontend" },
  
  //UI & Styling
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", level: 92, category: "ui" },
  { name: "Framer Motion", icon: null, color: "#FF0080", level: 85, category: "ui" },
  { name: "Shadcn/ui", icon: null, color: "#000000", level: 80, category: "ui" },
  { name: "CSS3", icon: SiCss3, color: "#1572B6", level: 90, category: "ui" },
  { name: "Three js", icon: null, color: "#15f2B6", level: 90, category: "ui" },
  

  // Mobile / Learning
  { name: "React Native", icon: SiReact, color: "#61DAFB", level: 65, category: "learning" },
  { name: "Expo", icon: null, color: "#000020", level: 60, category: "learning" },
  { name: "Context API", icon: SiReact, color: "#61DAFB", level: 70, category: "learning" },
  { name: "Material UI", icon: null, color: "#007FFF", level: 65, category: "learning" },

  // Backend
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", level: 72, category: "backend" },
  { name: "Express.js", icon: SiExpress, color: "#000000", level: 70, category: "backend" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#3388C6", level: 70, category: "backend" },
  { name: "Prisma", icon: SiPrisma, color: "#2D3748", level: 60, category: "learning" },
  { name: "Nest.js", icon: SiNestjs, color: "#E0234E", level: 60, category: "learning" },
  { name: "GraphQL", icon: null, color: "#E10098", level: 60, category: "learning" },

  // Dev Tools & Deployment
  { name: "Git", icon: SiGit, color: "#F05032", level: 90, category: "devtools" },
  { name: "GitHub", icon: SiGithub, color: "#181717", level: 92, category: "devtools" },
  { name: "Vercel", icon: SiVercel, color: "#000000", level: 88, category: "devtools" },
  { name: "Webpack", icon: SiWebpack, color: "#8DD6F9", level: 70, category: "devtools" },
  { name: "Babel", icon: SiBabel, color: "#F9DC3E", level: 70, category: "devtools" },
  { name: "Vite", icon: null, color: "#646CFF", level: 65, category: "devtools" },

  // Payment & Services
  { name: "Stripe", icon: SiStripe, color: "#008CDD", level: 70, category: "services" },
  { name: "Postman", icon: null, color: "#FF6C37", level: 75, category: "services" },
  { name: "Google Analytics", icon: null, color: "#4285F4", level: 90, category: "services" },
];


const categories = [
  { id: "frontend", name: "Frontend Development", icon: Code2, color: "#3B82F6" },
  { id: "ui", name: "UI & Styling", icon: Code2, color: "#3Bf2F6" },
  { id: "backend", name: "Backend Basics", icon: Settings, color: "#10B981" },
  { id: "learning", name: "Learning / Familiar", icon: Zap, color: "#A78BFA" },
  { id: "devtools", name: "Dev Tools & Deployment", icon: Cloud, color: "#8B5CF6" },
  { id: "services", name: "Payment & Services", icon: Smartphone, color: "#F97316" },
];


export default function SkillsSection() {
  const t = useTranslations('skills');

  return (
    <Section id="skills" className="bg-gradient-to-br from-background via-muted/20 to-background">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-16"
      >
        {/* Header */}
        <motion.div
          variants={fadeIn("up")}
          className="text-center space-y-4"
        >
          <div className="w-fit mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mt-2">
              {t("subtitle")}
            </p>
            <div className="relative h-1 mt-3 bg-accent w-[60%] mx-auto">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-accent bg-muted" />
              <div className="absolute -left-[26px] -top-[11px] w-8 h-1 rotate-45 bg-accent" />
            </div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={fadeIn("up")}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => {
            const categorySkills = skills.filter(skill => skill.category === category.id);
            const IconComponent = category.icon;
            
            return (
              <motion.div
                key={category.id}
                variants={fadeIn("up")}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <IconComponent 
                      className="w-5 h-5" 
                      style={{ color: category.color }}
                    />
                  </div>
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {categorySkills.map((skill) => {
                    const SkillIcon = skill.icon;
                    return (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {SkillIcon && (
                              <SkillIcon 
                                className="w-4 h-4" 
                                style={{ color: skill.color }}
                              />
                            )}
                            <span className="text-sm font-medium">{skill.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${skill.level}%`,
                              backgroundColor: skill.color,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          variants={fadeIn("up")}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold text-blue-500 mb-2">
              {t("frontendTitle")}
            </h3>
            <p className="text-muted-foreground text-sm">
              {t("frontendDesc")}
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold text-green-500 mb-2">
              {t("backendTitle")}
            </h3>
            <p className="text-muted-foreground text-sm">
              {t("backendDesc")}
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold text-purple-500 mb-2">
              {t("fullstackTitle")}
            </h3>
            <p className="text-muted-foreground text-sm">
              {t("fullstackDesc")}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
} 