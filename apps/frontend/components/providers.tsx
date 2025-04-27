'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ApiKeyProvider } from '@recruitpro/lib/gemini/api-key-rotation';
import { LanguageProvider } from '@recruitpro/lib/translation/language-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Initialize React Query client for data fetching
const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [apiKeys, setApiKeys] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const response = await fetch('/api/keys');
        const data = await response.json();
        
        if (data.keys && data.keys.length > 0) {
          setApiKeys(data.keys);
        } else {
          console.error('No API keys found');
        }
      } catch (error) {
        console.error('Error fetching API keys:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiKeys();
  }, []);

  if (isLoading) {
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
    <QueryClientProvider client={queryClient}>
      <ApiKeyProvider apiKeys={apiKeys}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </ApiKeyProvider>
    </QueryClientProvider>
  );
}