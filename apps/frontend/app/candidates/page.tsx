'use client';

import { useLanguage } from '@recruitpro/lib/translation/language-context';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CandidateCard, Candidate } from '../../components/CandidateCard';

export default function CandidatesPage() {
  const { t } = useLanguage();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { data, isLoading, isError } = useQuery<{ candidates: Candidate[] }>({
    queryKey: ['candidates'],
    queryFn: async () => {
      const res = await fetch('/api/candidates');
      if (!res.ok) throw new Error('Failed to fetch candidates');
      return res.json() as Promise<{ candidates: Candidate[] }>;
    },
  });
  const candidates = data?.candidates ?? [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{t('candidates.title')}</h1>
      {isLoading && (
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="animate-pulse h-32 bg-gray-200 rounded-lg" />
          ))}
        </div>
      )}
      {isError && <div className="text-red-500">{t('error.loadingCandidates')}</div>}
      {!isLoading && candidates.length > 0 && (
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} onPreview={(url) => setPreviewUrl(url)} />
          ))}
        </div>
      )}
      {!isLoading && candidates.length === 0 && (
        <div className="text-gray-600">{t('candidates.noCandidates')}</div>
      )}
      {previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 w-3/4 h-3/4">
            <button className="mb-2 text-right w-full text-red-500" onClick={() => setPreviewUrl(null)}>
              {t('close') || 'Close'}
            </button>
            <iframe src={previewUrl} className="w-full h-full" />
          </div>
        </div>
      )}
    </div>
  );
}