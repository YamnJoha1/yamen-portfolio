import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ContactCardProps {
  icon: React.ReactNode;
  description: string;
  link?: string;
  label?: string;
  color?: string;
}

export const ContactCard = ({ icon, description, link, label, color }: ContactCardProps) => {
  const isEmail = description.includes("@");
  const isPhone = /^[\d\s+\-()]+$/.test(description);

  // Emails and phone numbers are forced LTR; everything else inherits the
  // document direction set on <html>.
  const dirDescription = isEmail || isPhone ? "ltr" : undefined;
  const textAlignLabel = "text-start";
  const textAlignDescription = isEmail || isPhone ? "text-end" : "text-start";

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeIn("up")}
      whileHover={{ x: 5 }}
      className="flex items-center bg-card gap-4 px-4 py-6 rounded-xl group border border-border/50 transition-all duration-300"
    >
      {/* Icon */}
      <div
        className="p-4 rounded-lg shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundColor: `${color}20`,
          color: color,
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold truncate ${textAlignLabel}`}>
          {label}
        </h3>

        <p
          dir={dirDescription}
          className={`text-sm text-muted-foreground truncate ${textAlignDescription}`}
        >
          {description}
        </p>
      </div>

      {/* Arrow */}
      <ArrowRight className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
    </motion.a>
  );
};
