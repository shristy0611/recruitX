import { useLanguage } from '@/lib/language-context';
import { MultilingualHeader } from '@/components/multilingual-wrapper';
import { useState, useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
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
      <nav className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-xl font-bold">{t('common.appName')}</span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    {t('navigation.dashboard')}
                  </a>
                  <a href="/jobs" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    {t('navigation.jobs')}
                  </a>
                  <a href="/candidates" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    {t('navigation.candidates')}
                  </a>
                  <a href="/matches" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    {t('navigation.matches')}
                  </a>
                  <a href="/reports" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    {t('navigation.reports')}
                  </a>
                  <a href="/settings" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    {t('navigation.settings')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

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
