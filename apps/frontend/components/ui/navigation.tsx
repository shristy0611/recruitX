'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@recruitpro/lib/translation/language-context';

export default function Navigation() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navigation = [
    { name: t('nav.dashboard'), href: '/dashboard' },
    { name: t('nav.jobs'), href: '/jobs' },
    { name: t('nav.candidates'), href: '/candidates' },
    { name: t('nav.matches'), href: '/matches' },
    { name: t('nav.reports'), href: '/reports' },
    { name: t('nav.settings'), href: '/settings' },
  ];

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold">{t('common.appName')}</Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || 
                                 (item.href !== '/' && pathname?.startsWith(item.href));
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        isActive 
                          ? 'bg-blue-700 text-white' 
                          : 'text-white hover:bg-blue-700 hover:text-white'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 