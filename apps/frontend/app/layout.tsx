'use client';

import './styles/globals.css';
import { useLanguage } from '@recruitpro/lib/translation/language-context';
import { MultilingualHeader } from '../components/ui/multilingual-wrapper';
import Navigation from '../components/ui/navigation';
import { useState, useEffect } from 'react';
import Providers from '../components/providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const { t, isLoading } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  // Set isMounted to true after component mounts to avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show loading state while translations are being fetched
  if (isLoading || !isMounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MultilingualHeader />
      <Navigation />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            {t('common.copyright')}
          </p>
        </div>
      </footer>
    </div>
  );
}
