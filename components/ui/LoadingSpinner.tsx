"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "@/lib/contexts/LoadingContext";
import Image from "next/image";

export function LoadingSpinner() {
  const { isLoading } = useLoading();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
            </motion.div>
            <div className="relative">
              <Image src="/logos/yamn-jo.png" width={80} height={80} alt="LOGO" className="animate-spin" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 