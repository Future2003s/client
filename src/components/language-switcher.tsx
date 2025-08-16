"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import {
  locales,
  getLocaleDisplayName,
  createLocalizedPathname,
  type Locale,
} from "@/i18n/config";
import { ChevronDown, Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // Try to get locale from pathname or use default
  const pathSegments = pathname.split("/");
  const localeFromPath = pathSegments[1];
  const currentLocale: Locale = locales.includes(localeFromPath as Locale) 
    ? (localeFromPath as Locale) 
    : "vi";

  const handleLanguageChange = (newLocale: string) => {
    const newPath = createLocalizedPathname(pathname, newLocale as Locale);
    router.push(newPath);
    setIsOpen(false);
  };

  const currentLanguage = getLocaleDisplayName(currentLocale);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Globe className="h-4 w-4" />
        <span>{currentLanguage}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
          <div className="py-1">
            {locales.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  currentLocale === lang ? "bg-blue-50 text-blue-700" : "text-gray-700"
                }`}
              >
                {getLocaleDisplayName(lang)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
