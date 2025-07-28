import { getRequestConfig } from 'next-intl/server';
import type { GetRequestConfigParams } from 'next-intl/server';

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

export default getRequestConfig(async ({ locale }: GetRequestConfigParams) => {
  const resolvedLocale = locale ?? 'en';

  const messages = {};

  for (const name of fileNames) {
  
    const module = await import(`../locales/${resolvedLocale}/${name}.json`);
    Object.assign(messages, module.default);
  }

  return {
    locale: resolvedLocale,
    messages,
  };
});
