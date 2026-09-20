"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { fadeIn } from "@/utils/motion";
import { GalleryItem } from "@/lib/data/projects";

interface ProjectGalleryProps {
  items: GalleryItem[];
}

/**
 * Presents full-page product screenshots for work that has no public URL to
 * link to. Each capture sits in a browser-style frame and opens full size in a
 * lightbox, so a private product can still be shown rather than described.
 */
export function ProjectGallery({ items }: ProjectGalleryProps) {
  const t = useTranslations("projects");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastOpened = useRef<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  // Escape closes, and the page behind the lightbox is locked while it is open.
  useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex, close]);

  // Focus the close button on open, and hand focus back to the card on close.
  useEffect(() => {
    if (openIndex !== null) {
      lastOpened.current = openIndex;
      const id = window.setTimeout(() => closeRef.current?.focus(), 0);
      return () => window.clearTimeout(id);
    }
    if (lastOpened.current !== null) {
      triggerRefs.current[lastOpened.current]?.focus();
      lastOpened.current = null;
    }
  }, [openIndex]);

  const active = openIndex === null ? null : items[openIndex];

  return (
    <motion.section
      variants={fadeIn("up")}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mb-20"
      aria-labelledby="project-screenshots"
    >
      <div className="mb-6">
        <h2 id="project-screenshots" className="text-2xl font-semibold text-start">
          {t("screenshots")}
        </h2>
        <p className="text-sm text-muted-foreground mt-1 text-start">
          {t("screenshotsNote")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item, index) => (
          <button
            key={item.src}
            type="button"
            ref={(el) => {
              triggerRefs.current[index] = el;
            }}
            onClick={() => setOpenIndex(index)}
            aria-label={`${t(item.captionKey)} — ${t("viewFullSize")}`}
            className="group block w-full overflow-hidden rounded-xl border border-border bg-card text-start shadow-lg transition-shadow hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {/* Browser chrome — signals this is a running product, not a mockup */}
            <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {t(item.captionKey)}
              </span>
              <Maximize2 className="ms-auto h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100" />
            </div>

            {/* Tall page captures are cropped from the top, never squashed */}
            <div className="relative h-72 overflow-hidden bg-background sm:h-80">
              <Image
                src={item.src}
                alt={t(item.captionKey)}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={t(active.captionKey)}
            onClick={close}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:p-8"
          >
            <div className="mx-auto max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-white">
                  {t(active.captionKey)}
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label={t("closePreview")}
                  className="rounded-md border border-white/30 p-2 text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <Image
                src={active.src}
                alt={t(active.captionKey)}
                width={active.width}
                height={active.height}
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="h-auto w-full rounded-lg"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
