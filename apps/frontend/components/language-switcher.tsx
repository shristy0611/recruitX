'use client';

import { useEffect } from 'react';
import { useLanguage } from '@recruitpro/lib/translation/language-context';

// Language switcher component
export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  // Handle language change
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">{t('common.language')}:</span>
      <div className="flex space-x-1">
        <button
          onClick={() => handleLanguageChange('en')}
          className={`px-2 py-1 text-sm rounded ${
            language === 'en'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          aria-label={t('common.english')}
        >
          EN
        </button>
        <button
          onClick={() => handleLanguageChange('ja')}
          className={`px-2 py-1 text-sm rounded ${
            language === 'ja'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          aria-label={t('common.japanese')}
        >
          日本語
        </button>
      </div>
    </div>
  );
}
