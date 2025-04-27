'use client';

import { useLanguage } from '@recruitpro/lib/translation/language-context';
import { useQuery } from '@tanstack/react-query';
import { MatchCard, Match } from '../../components/MatchCard';

export default function MatchesPage() {
  const { t } = useLanguage();
  const { data, isLoading, isError } = useQuery<{ matches: Match[] }>({
    queryKey: ['matches'],
    queryFn: async () => {
      const res = await fetch('/api/matches');
      if (!res.ok) throw new Error('Failed to fetch matches');
      return res.json() as Promise<{ matches: Match[] }>;
    },
  });
  const matches = data?.matches ?? [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{t('matches.title')}</h1>
      {isLoading && (
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="animate-pulse h-48 bg-gray-200 rounded-lg" />
          ))}
        </div>
      )}
      {isError && <div className="text-red-500">{t('error.loadingMatches')}</div>}
      {!isLoading && matches.length > 0 && (
        <div className="space-y-4">
          {matches.map((match) => (
            <MatchCard key={`${match.jobId}-${match.candidateId}`} match={match} />
          ))}
        </div>
      )}
      {!isLoading && matches.length === 0 && (
        <div className="text-gray-600">{t('matches.noMatches')}</div>
      )}
    </div>
  );
}