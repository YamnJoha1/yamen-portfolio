"use client";

import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ErrorPage() {
  const locale = "en";  
  const messages = {
    en: {
      title: "Something went wrong",
      description: "An unexpected error has occurred. Please try again later.",
      buttonText: "Try again",
    },
    ar: {
      title: "حدث خطأ ما",
      description: "حدث خطأ غير متوقع. الرجاء المحاولة لاحقًا.",
      buttonText: "حاول مرة أخرى",
    },
  };

  const { title, description, buttonText } = messages[locale];
  return (
    <AnimatePresence>
      <motion.div
        key="error"
        variants={fadeIn("up")}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="flex flex-col items-center justify-center min-h-screen p-4 text-center"
      >
        <Image src="/logos/yamn-jo.png" width={50} height={50} alt="LOGO" className="max-w-10 lg:min-w-10" />
        <h2 className="text-3xl font-semibold mb-2">{title}</h2>
        <p className="mb-6">{description}</p>
        <Button
          variant={"destructive"}
          onClick={(() => window.location.reload())}
        >
          {buttonText}
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}
