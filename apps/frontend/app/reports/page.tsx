'use client';

import { useLanguage } from '@recruitpro/lib/translation/language-context';
import { useQuery } from '@tanstack/react-query';
import { ReportCard, Report } from '../../components/ReportCard';

export default function ReportsPage() {
  const { t } = useLanguage();
  const { data, isLoading, isError } = useQuery<{ reports: Report[] }>({
    queryKey: ['reports'],
    queryFn: async () => {
      const res = await fetch('/api/reports');
      if (!res.ok) throw new Error('Failed to fetch reports');
      return res.json() as Promise<{ reports: Report[] }>;
    },
  });
  const reports = data?.reports ?? [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{t('reports.title')}</h1>
      {isLoading && (
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="animate-pulse h-32 bg-gray-200 rounded-lg" />
          ))}
        </div>
      )}
      {isError && <div className="text-red-500">{t('error.loadingReports')}</div>}
      {!isLoading && reports.length > 0 && (
        <div className="space-y-4">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
      {!isLoading && reports.length === 0 && (
        <div className="text-gray-600">{t('reports.noReports')}</div>
      )}
    </div>
  );
}