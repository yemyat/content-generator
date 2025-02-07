import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
  useState,
} from "react";
import { type languageOptions } from "~/lib/schemas/generate-post-schema";

type Language = (typeof languageOptions)[number];

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const STORAGE_KEY = "generation-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "English";
    return (localStorage.getItem(STORAGE_KEY) as Language) ?? "English";
  });

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem(STORAGE_KEY, newLanguage);
  };

  // Sync with localStorage
  useEffect(() => {
    const storedLanguage = localStorage.getItem(STORAGE_KEY);
    if (
      storedLanguage &&
      (storedLanguage === "English" || storedLanguage === "Burmese")
    ) {
      setLanguageState(storedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
