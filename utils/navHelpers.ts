
export const isActive = (
  pathname: string,
  locale: string,
  href: string
): boolean => {
  return pathname === `/${locale}${href}`;
};

export const handleLanguageChange = (
  pathname: string,
  router: any,
  newLocale: string
) => {
  const segments = pathname.split("/");
  if (segments[1] === "en" || segments[1] === "ar") {
    segments[1] = newLocale;
  } else {
    segments.unshift(newLocale);
  }
  const newPathname = segments.join("/") || "/";
  router.push(newPathname);
};

export const handleNavClick = async (
  href: string,
  locale: string,
  pathname: string,
  router: any
) => {
  if (href === "/") {
    if (pathname === `/${locale}`) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      await router.push(`/${locale}`);
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }
  } else if (href.includes("#")) {
    const sectionId = href.split("#")[1];
    if (pathname !== `/${locale}`) {
      await router.push(`/${locale}`);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    router.push(`/${locale}${href}`);
  }
};
