'use client';

import { useLanguage } from '@recruitpro/lib/translation/language-context';

export default function SettingsPage() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{t('settings.title')}</h1>
      <p>Settings page content will go here.</p>
    </div>
  );
} 