import { MetadataRoute } from "next";
import { projects } from "@/lib/data/projects";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "ar"] as const;
  const lastModified = new Date();

  const homeEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: {
      languages: {
        en: `${SITE_URL}/en`,
        ar: `${SITE_URL}/ar`,
      },
    },
  }));

  const projectsIndexEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${SITE_URL}/${locale}/projects`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: {
      languages: {
        en: `${SITE_URL}/en/projects`,
        ar: `${SITE_URL}/ar/projects`,
      },
    },
  }));

  const projectDetailEntries: MetadataRoute.Sitemap = projects.flatMap((project) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/projects/${project.id}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${SITE_URL}/en/projects/${project.id}`,
          ar: `${SITE_URL}/ar/projects/${project.id}`,
        },
      },
    }))
  );

  return [...homeEntries, ...projectsIndexEntries, ...projectDetailEntries];
}
