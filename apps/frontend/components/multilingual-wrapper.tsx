'use client';

import { useEffect } from 'react';
import { LanguageProvider } from '@recruitpro/lib/translation/language-context';
import LanguageSwitcher from './language-switcher';

// Props for the MultilingualWrapper component
interface MultilingualWrapperProps {
  children: React.ReactNode;
}

// Wrapper component to provide language context to the application
export default function MultilingualWrapper({ children }: MultilingualWrapperProps) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}

// Header component that includes the language switcher
export function MultilingualHeader() {
  return (
    <div className="flex justify-between items-center p-4 bg-white border-b">
      <div className="flex-1"></div>
      <div className="flex-none">
        <LanguageSwitcher />
      </div>
    </div>
  );
}
