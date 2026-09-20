import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  containerClassName?: string;
  titleSlotRight?: React.ReactNode;
  titleAlign?: "left" | "center"; 
  titleMarginBottom?: string; 
}

export const Section = ({
  children,
  id,
  className,
  title,
  description,
  containerClassName,
  titleSlotRight,
  titleAlign = "left",
  titleMarginBottom = "mb-12",
}: SectionProps) => {
  const isCentered = titleAlign === "center";

  return (
    <section id={id} className={cn("lg:py-24 py-14 bg-background", className)}>
      <div className={cn("container mx-auto px-6", containerClassName)}>
        {(title || description) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(titleMarginBottom, isCentered ? "text-center" : "mx-6")}
          >
            {title && (
              <div
                className={cn(
                  "items-center lg:gap-4 gap-8",
                  isCentered ? "flex flex-col justify-center" : "flex flex-col lg:flex-row justify-between"
                )}
              >
                <div className="w-fit group">
                  <h2 className="text-2xl md:text-4xl font-bold w-fit">
                    {title}
                  </h2>

                  {description && (
                    <p
                      className={cn(
                        "text-muted-foreground max-w-2xl text-base md:text-md",
                        isCentered ? "mx-auto" : ""
                      )}
                    >
                      {description}
                    </p>
                  )}
                </div>

                {!isCentered && titleSlotRight && (
                  <div className="shrink-0">{titleSlotRight}</div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {children}
      </div>
    </section>
  );
};
