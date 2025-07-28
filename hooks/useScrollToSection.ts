import { useEffect } from "react";

export const useScrollToSection = () => {
  useEffect(() => {
    const section = window.location.hash?.substring(1);
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300); // يسمح للصفحة أن تجهز أولاً
      }
    }
  }, []);
};
