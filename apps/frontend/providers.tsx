import { ReactNode } from 'react';
import { LanguageProvider } from '@/lib/i18n-config';
import { ApiKeyProvider } from '@/lib/api-key-rotation';

// Mock API keys for development - these would be replaced with real keys in production
const mockApiKeys = [
  'GEMINI_API_KEY_1',
  'GEMINI_API_KEY_2',
  'GEMINI_API_KEY_3',
  'GEMINI_API_KEY_4',
  'GEMINI_API_KEY_5',
  'GEMINI_API_KEY_6',
  'GEMINI_API_KEY_7',
  'GEMINI_API_KEY_8',
  'GEMINI_API_KEY_9',
  'GEMINI_API_KEY_10',
];

export function Providers({ children, initialLanguage = 'en' }: { children: ReactNode, initialLanguage?: string }) {
  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <ApiKeyProvider apiKeys={mockApiKeys}>
        {children}
      </ApiKeyProvider>
    </LanguageProvider>
  );
}
