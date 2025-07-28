"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Server, Rocket } from "lucide-react";
import { techStack } from "@/utils/techIcons";
import { fadeIn, slideIn } from "@/utils/motion";

const titles = [
  { title: "Modern Tech Stack", icon: Code2 },
  { title: "API Integration", icon: Server },
  { title: "CI/CD & Deployment", icon: Rocket },
];

export const TechIconsSection = () => {
  const [index, setIndex] = useState(0);
  const t = useTranslations("home.graph");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = titles[index].icon;

  return (
    <motion.div
      variants={fadeIn("up", "tween", 0, 0.8)}
      initial="hidden"
      animate="visible"
      className="relative hidden lg:block"
    >
      <div className="relative w-full h-[600px]">
        {/* Floating Tech Icons */}
        {techStack.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -10, 0],
            }}
            transition={{
              delay: index * 0.1,
              y: {
                repeat: Infinity,
                duration: 2 + (index % 3),
                repeatType: "reverse",
              },
            }}
            className="absolute cursor-pointer hover:scale-125 transition-transform"
            style={{
              top: `${tech.position.top}%`,
              left: `${tech.position.left}%`,
              color: tech.color,
              zIndex: 10,
            }}
          >
            <tech.icon className="w-8 h-8 md:w-10 md:h-10" />
          </motion.div>
        ))}

        {/* Central Card with dynamic icon & title */}
        <motion.div
          variants={fadeIn("up", "tween", 0.4)}
          initial="hidden"
          animate="visible"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <div className="bg-card/50 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-border/50">
            <div className="flex flex-col items-center gap-3">
              {/* Animated Icon */}
              <motion.div
                key={titles[index].title + "-icon"}
                variants={slideIn("right", "tween", 0.1, 0.4)}
                initial="hidden"
                animate="visible"
              >
                <CurrentIcon className="h-8 w-8 text-primary" />
              </motion.div>

              {/* Animated Title */}
              <motion.h3
                key={titles[index].title}
                variants={slideIn("left", "tween", 0.2, 0.4)}
                initial="hidden"
                animate="visible"
                className="text-xl font-semibold mb-2 text-center"
              >
                {titles[index].title}
              </motion.h3>
              <p className="text-muted-foreground text-center">
                {t("title")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Background Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
      </div>
    </motion.div>
  );
};
