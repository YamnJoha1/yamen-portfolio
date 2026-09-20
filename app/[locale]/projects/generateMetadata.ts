import { createMetadata } from "@/utils/seoMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return createMetadata("projects", locale || "en");
}

