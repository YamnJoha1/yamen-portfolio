import { createMetadata } from "@/utils/seoMetadata";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return createMetadata("projects", params.locale || "en");
}
