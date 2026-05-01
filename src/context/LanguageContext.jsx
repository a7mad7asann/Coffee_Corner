import { createContext, useState, useEffect, useMemo } from "react";

// إنشاء السياق
export const LanguageContext = createContext();

// مزود اللغة
export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "ar");

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
