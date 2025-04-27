'use client';

import { useLanguage } from '@recruitpro/lib/translation/language-context';
import { useQuery } from '@tanstack/react-query';
import { JobCard, Job } from '../../components/JobCard';

export default function JobsPage() {
  const { t } = useLanguage();
  const { data, isLoading, isError } = useQuery<{ jobs: Job[] }>({
    queryKey: ['jobs'],
    queryFn: async () => {
      const res = await fetch('/api/jobs');
      if (!res.ok) throw new Error('Failed to fetch jobs');
      return res.json() as Promise<{ jobs: Job[] }>;
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{t('jobs.title')}</h1>
      {isLoading && (
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="animate-pulse h-32 bg-gray-200 rounded-lg" />
          ))}
        </div>
      )}
      {isError && <div className="text-red-500">{t('error.loadingJobs')}</div>}
      {!isLoading && data?.jobs && data.jobs.length > 0 && (
        <div className="space-y-4">
          {data.jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
      {!isLoading && data?.jobs && data.jobs.length === 0 && (
        <div className="text-gray-600">{t('jobs.noJobs')}</div>
      )}
    </div>
  );
}