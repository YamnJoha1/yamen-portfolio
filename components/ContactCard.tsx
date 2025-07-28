interface ContactCardProps {
  icon: React.ReactNode;
  description: string;
  link?: string;
}


export const ContactCard = ({ icon, description, link }: ContactCardProps) => (
  <div
    onClick={() => link && window.open(link, "_blank")}
    className={`bg-card hover:bg-card/50 transition-colors p-4 rounded-2xl w-full shadow-md flex items-center gap-4 ${
      link ? "cursor-pointer" : "cursor-default"
    }`}
  >
    <div className="w-10 h-10 flex items-center justify-center bg-accent text-accent-foreground rounded-full">
      {icon}
    </div>
    <p className="text-base text-foreground">{description}</p>
  </div>
);