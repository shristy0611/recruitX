'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the language context type
type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, params?: Record<string, string>) => string;
  translations: Record<string, any>;
  isLoading: boolean;
};

// Create the language context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
  translations: {},
  isLoading: true,
});

// Props for the LanguageProvider component
interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: string;
}

// Create the LanguageProvider component
export const LanguageProvider = ({ 
  children, 
  defaultLanguage = 'en' 
}: LanguageProviderProps) => {
  const [language, setLanguage] = useState<string>(defaultLanguage);
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Function to fetch translations
  const fetchTranslations = async (lang: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/i18n/translations?language=${lang}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch translations: ${response.status}`);
      }
      
      const data = await response.json();
      setTranslations(data.translations || {});
      
      // Store the selected language in localStorage
      localStorage.setItem('preferredLanguage', lang);
    } catch (error) {
      console.error('Error fetching translations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to change the language
  const changeLanguage = (lang: string) => {
    if (lang !== language) {
      setLanguage(lang);
      fetchTranslations(lang);
    }
  };

  // Translation function
  const translate = (key: string, params?: Record<string, string>): string => {
    // Split the key by dots to navigate nested objects
    const keys = key.split('.');
    
    // Start with the full translations object
    let value: any = translations;
    
    // Navigate through the nested objects
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // If the key doesn't exist, return the key itself
        return key;
      }
    }
    
    // If the value is not a string, return the key
    if (typeof value !== 'string') {
      return key;
    }
    
    // Replace parameters in the translation string
    if (params) {
      return Object.entries(params).reduce((str, [param, val]) => {
        return str.replace(new RegExp(`{{${param}}}`, 'g'), val);
      }, value);
    }
    
    return value;
  };

  // Initialize translations on component mount
  useEffect(() => {
    // Check if there's a preferred language in localStorage
    const storedLanguage = localStorage.getItem('preferredLanguage');
    
    if (storedLanguage && ['en', 'ja'].includes(storedLanguage)) {
      setLanguage(storedLanguage);
      fetchTranslations(storedLanguage);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      const supportedLang = ['en', 'ja'].includes(browserLang) ? browserLang : defaultLanguage;
      
      setLanguage(supportedLang);
      fetchTranslations(supportedLang);
    }
  }, [defaultLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        t: translate,
        translations,
        isLoading,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
