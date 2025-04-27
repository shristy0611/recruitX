import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

// Define the supported languages
export const LANGUAGES = {
  en: 'English',
  ja: '日本語',
};

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, namespace?: string) => string;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

// Define the props for the provider component
type LanguageProviderProps = {
  children: ReactNode;
  initialLanguage?: string;
};

// Create the provider component
export const LanguageProvider = ({ 
  children, 
  initialLanguage = 'en' 
}: LanguageProviderProps) => {
  const router = useRouter();
  const [language, setLanguageState] = useState(initialLanguage);
  const [translations, setTranslations] = useState<Record<string, any>>({});

  // Load translations for the current language
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const commonTranslations = await import(`../../public/locales/${language}/common.json`);
        setTranslations({ common: commonTranslations.default });
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error);
        // Fallback to English if translations fail to load
        if (language !== 'en') {
          const fallbackTranslations = await import('../../public/locales/en/common.json');
          setTranslations({ common: fallbackTranslations.default });
        }
      }
    };

    loadTranslations();
  }, [language]);

  // Set language and update the URL
  const setLanguage = (lang: string) => {
    if (Object.keys(LANGUAGES).includes(lang)) {
      setLanguageState(lang);
      
      // Update the URL to reflect the language change
      const { pathname, asPath, query } = router;
      router.push({ pathname, query }, asPath, { locale: lang });
      
      // Store the language preference in a cookie
      document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`; // 1 year
    }
  };

  // Translation function
  const t = (key: string, namespace = 'common') => {
    if (!translations[namespace]) {
      return key;
    }

    // Split the key by dots to access nested properties
    const keys = key.split('.');
    let value = translations[namespace];

    // Navigate through the nested properties
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return the key if the translation is not found
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
