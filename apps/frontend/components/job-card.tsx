'use client';

import { useLanguage } from '@recruitpro/lib/translation/language-context';
import { useState } from 'react';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  status: 'active' | 'closed' | 'draft';
  requiredSkills: string[];
  preferredSkills?: string[];
  requiredExperience: string;
  requiredEducation: string;
  createdAt: string;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onFindMatches?: () => void;
}

export default function JobCard({
  id,
  title,
  company,
  location,
  jobType,
  status,
  requiredSkills,
  preferredSkills = [],
  requiredExperience,
  requiredEducation,
  createdAt,
  onView,
  onEdit,
  onDelete,
  onFindMatches,
}: JobCardProps) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  // Status badge colors
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    closed: 'bg-red-100 text-red-800',
    draft: 'bg-gray-100 text-gray-800',
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {/* Card header */}
      <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {company} • {location}
          </p>
        </div>
        <div>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              statusColors[status]
            }`}
          >
            {t(`jobs.${status}`)}
          </span>
        </div>
      </div>

      {/* Card content */}
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">{t('jobs.jobType')}</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{jobType}</dd>
          </div>

          <div className="py-3 sm:py-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">{t('jobs.requiredSkills')}</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <div className="flex flex-wrap gap-1 mt-1">
                {requiredSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </dd>
          </div>

          {expanded && (
            <>
              {preferredSkills.length > 0 && (
                <div className="py-3 sm:py-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">{t('jobs.preferredSkills')}</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <div className="flex flex-wrap gap-1 mt-1">
                      {preferredSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </dd>
                </div>
              )}

              <div className="py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{t('jobs.experience')}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {requiredExperience}
                </dd>
              </div>

              <div className="py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{t('jobs.education')}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {requiredEducation}
                </dd>
              </div>

              <div className="py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{t('jobs.createdAt')}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formatDate(createdAt)}
                </dd>
              </div>
            </>
          )}
        </dl>
      </div>

      {/* Card footer */}
      <div className="border-t border-gray-200 px-4 py-4 sm:px-6 flex justify-between">
        <div>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {expanded ? t('actions.view') : t('actions.view')}
          </button>
          {onView && (
            <button
              type="button"
              onClick={onView}
              className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t('jobs.jobDetails')}
            </button>
          )}
        </div>
        <div>
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t('actions.edit')}
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t('actions.delete')}
            </button>
          )}
          {onFindMatches && (
            <button
              type="button"
              onClick={onFindMatches}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t('matches.findMatches')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
