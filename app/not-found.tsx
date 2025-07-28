"use client";

import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NotFound() {
  const locale = "en";  

  const messages = {
    en: {
      title: "Page Not Found",
      description: "Sorry, the page you are looking for does not exist.",
      buttonText: "Go Back",
    },
    ar: {
      title: "الصفحة غير موجودة",
      description: "عذرًا، الصفحة التي تبحث عنها غير موجودة.",
      buttonText: "العودة إلى الوراء",
    },
  };

  const { title, description, buttonText } = messages[locale] || messages.en;

  return (
    <AnimatePresence>
      <motion.div
        key="notfound"
        variants={fadeIn("up")}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="flex flex-col items-center justify-center min-h-screen p-4 text-center"
      >
        <Image src="/logos/yamn-jo.png" width={50} height={50} alt="LOGO" className="max-w-10 lg:min-w-10" />
        <h2 className="mt-6 text-2xl font-semibold">{title}</h2>
        <p className="my-2">{description}</p>
        <Button
          variant={"ghost"}
          onClick={(() => window.history.back())}
          className="border border-accent"
        >
          {buttonText}
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}
