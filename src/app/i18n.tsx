"use client";

import { useEffect, useState } from "react";

export type Lang = "uz" | "ru" | "en";

export type Localized = Record<Lang, string>;

const languages: Array<{ label: string; value: Lang }> = [
  { label: "UZ", value: "uz" },
  { label: "RU", value: "ru" },
  { label: "EN", value: "en" },
];

export function text(value: Localized, lang: Lang) {
  return value[lang];
}

export function useLanguage() {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") {
      return "ru";
    }

    const saved = window.localStorage.getItem("zinvo-language") as Lang | null;
    return saved === "uz" || saved === "ru" || saved === "en" ? saved : "ru";
  });

  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const nextLang = (event as CustomEvent<Lang>).detail;
      if (nextLang === "uz" || nextLang === "ru" || nextLang === "en") {
        setLangState(nextLang);
      }
    };

    window.addEventListener("zinvo-language-change", handleLanguageChange);

    return () => {
      window.removeEventListener("zinvo-language-change", handleLanguageChange);
    };
  }, []);

  function setLang(nextLang: Lang) {
    setLangState(nextLang);
    window.localStorage.setItem("zinvo-language", nextLang);
    window.dispatchEvent(new CustomEvent("zinvo-language-change", { detail: nextLang }));
  }

  return { lang, setLang };
}

export function LanguageSwitcher({
  lang,
  setLang,
  className = "",
}: {
  lang: Lang;
  setLang: (lang: Lang) => void;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex rounded-full border border-white/10 bg-white/[0.045] p-1 backdrop-blur-xl ${className}`}
      aria-label="Language switcher"
    >
      {languages.map((language) => (
        <button
          key={language.value}
          type="button"
          onClick={() => setLang(language.value)}
          className={`h-9 rounded-full px-3 text-xs font-semibold transition ${
            lang === language.value
              ? "bg-cyan-300 text-[#051124] shadow-[0_0_22px_rgba(34,211,238,0.28)]"
              : "text-slate-300 hover:text-white"
          }`}
        >
          {language.label}
        </button>
      ))}
    </div>
  );
}
