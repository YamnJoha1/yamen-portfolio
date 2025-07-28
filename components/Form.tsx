import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const Form = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const tf = useTranslations("contact.form");
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {["name", "email", "subject"].map((field) => (
        <div key={field}>
          <label htmlFor={field} className="block text-sm font-medium mb-1">
            {tf(field)}
          </label>
          <input
            id={field}
            name={field}
            type={field === "email" ? "email" : "text"}
            placeholder={tf(`${field}Placeholder`)}
            value={formData[field as keyof FormData]}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:ring-2 focus:ring-accent outline-none"
          />  
        </div>
      ))}

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">{tf("message")}</label>
          <textarea
            id="message"
            name="message"
            placeholder={tf("messagePlaceholder")}
            value={formData.message}
            onChange={handleChange}
            rows={4}
            required
            className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:ring-2 focus:ring-accent outline-none"
          />
      </div>

      <Button type="submit" variant="default" disabled={isSubmitting} className="w-full">
        <Send className="w-5 h-5 mr-2" />
          {isSubmitting ? tf("sending") : tf("submit")}
      </Button>

      {submitStatus === "success" && (
        <p className="text-green-600 text-center">{tf("success")}</p>
      )}
      {submitStatus === "error" && (
        <p className="text-red-600 text-center">{tf("error")}</p>
      )}
    </form>
  )
}