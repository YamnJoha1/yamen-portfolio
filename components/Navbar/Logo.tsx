"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

const Logo = () => {
  const locale = useLocale();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/${locale}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link href={`/${locale}`} onClick={handleClick} className="text-3xl font-brand font-extrabold text-accent">
      <Image src="/logos/yamn-jo.png" width={50} height={50} alt="LOGO" className="max-w-10 lg:min-w-13 cursor-pointer" />
    </Link>
  );
};

export default Logo;
