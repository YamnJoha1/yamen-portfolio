import { getRequestConfig } from 'next-intl/server';

const fileNames = [
  "nav",
  "home",
  "about",
  "services",
  "experience",
  "contact",
  "footer",
  "projects",
  "skills"
];

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale ?? 'en';
  const messages = {};

  for (const name of fileNames) {
    const file = await import(`../locales/${resolvedLocale}/${name}.json`);
    Object.assign(messages, file.default);
  }

  return {
    locale: resolvedLocale,
    messages,
  };
});