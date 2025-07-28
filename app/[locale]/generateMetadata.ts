import { createMetadata } from "@/utils/seoMetadata";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const resolvedParams = await params;
  return createMetadata("home", resolvedParams.locale || "en");
}