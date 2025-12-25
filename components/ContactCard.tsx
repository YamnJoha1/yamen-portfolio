import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";

interface ContactCardProps {
  icon: React.ReactNode;
  description: string;
  link?: string;
  label?: string;
  color?: string;
}

export const ContactCard = ({ icon, description, link, label, color }: ContactCardProps) => {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const isEmail = description.includes("@");
  const isPhone = /^[\d\s+\-()]+$/.test(description);

  const dirDescription = isEmail || isPhone ? "ltr" : isRTL ? "rtl" : "ltr";
  const textAlignLabel = isRTL ? "text-right" : "text-left";
  const textAlignDescription =
    isEmail || isPhone ? "text-right" : isRTL ? "text-right" : "text-left";

  return (
    <motion.a
      key={label}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeIn("up")}
      whileHover={{ x: 5 }}
      className="flex items-center bg-card gap-4 px-4 py-6 rounded-xl group border border-border/50 transition-all duration-300"
      style={{
        borderColor: "rgba(255,255,255,0.1)",
      }}
    >
      <style jsx>{`
        a:hover {
          border-color: ${color || "#888"} !important;
        }
      `}</style>

      {/* 🟢 الأيقونة */}
      <div
        className="p-4 rounded-lg transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundColor: `${color}20`, 
          color: color,
        }}
      >
        {icon}
      </div>

      {/* 🔵 النصوص */}
      <div className="flex-1">
        <h3 className={`font-semibold truncate max-w-[80%] ${textAlignLabel}`}>{label}</h3>
        <p
          dir={dirDescription}
          className={`text-sm text-muted-foreground truncate max-w-[90%] ${textAlignDescription}`}
        >
          {description}
        </p>
      </div>

      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
      
    </motion.a>
  );
};
