"use client";

import { Mail } from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import {
  CONTACT_EMAIL,
  MESSAGE_MAX_LENGTH,
  WHATSAPP_NUMBER,
} from "@/lib/constants";

interface FormData {
  name: string;
  subject: string;
  message: string;
}

export const Form = () => {
  const tf = useTranslations("contact.form");
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Nothing is sent from this page. Both actions hand the composed message to
  // the visitor's own app, where they press send.
  const composeBody = () =>
    `${formData.name}\n\n${formData.message}`.trim();

  const openWhatsApp = () => {
    const text = `*${formData.subject}*\n\n${composeBody()}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const openEmail = () => {
    if (!formRef.current?.reportValidity()) return;
    const params = new URLSearchParams({
      subject: formData.subject,
      body: composeBody(),
    });
    window.location.href = `mailto:${CONTACT_EMAIL}?${params.toString()}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {(["name", "subject"] as const).map((field) => (
        <div key={field}>
          <label htmlFor={field} className="block text-sm font-medium mb-1">
            {tf(field)}
          </label>
          <input
            id={field}
            name={field}
            type="text"
            placeholder={tf(`${field}Placeholder`)}
            value={formData[field]}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:ring-2 focus:ring-accent outline-none"
          />
        </div>
      ))}

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          {tf("message")}
        </label>
        <textarea
          id="message"
          name="message"
          placeholder={tf("messagePlaceholder")}
          value={formData.message}
          onChange={handleChange}
          rows={4}
          required
          maxLength={MESSAGE_MAX_LENGTH}
          className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:ring-2 focus:ring-accent outline-none"
        />
      </div>

      {/* Two explicit ways to send — neither is hidden behind the other. */}
      <div className="space-y-3">
        <p className="text-sm font-medium">{tf("chooseChannel")}</p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Button type="submit" variant="default" className="w-full">
              <SiWhatsapp className="w-5 h-5 me-2" aria-hidden="true" />
              {tf("sendWhatsapp")}
            </Button>
            <p className="text-xs text-muted-foreground">
              {tf("whatsappHint")}
            </p>
          </div>

          <div className="space-y-1">
            <Button
              type="button"
              variant="outline"
              onClick={openEmail}
              className="w-full"
            >
              <Mail className="w-5 h-5 me-2" aria-hidden="true" />
              {tf("sendEmail")}
            </Button>
            <p className="text-xs text-muted-foreground">{tf("emailHint")}</p>
          </div>
        </div>
      </div>
    </form>
  );
};
