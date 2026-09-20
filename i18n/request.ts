import { getRequestConfig } from 'next-intl/server';

const supportedLocales = ['en', 'ar'] as const;
const defaultLocale = 'en';

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

export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` is the value of the [locale] segment. The `locale` param is
  // only populated when an explicit locale is passed to an awaitable API such as
  // getTranslations({locale}), so it is undefined on a normal page render.
  const requested = await requestLocale;
  const resolvedLocale = supportedLocales.includes(
    requested as (typeof supportedLocales)[number]
  )
    ? (requested as string)
    : defaultLocale;

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
