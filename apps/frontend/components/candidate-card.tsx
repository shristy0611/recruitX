'use client';

import { useLanguage } from '@recruitpro/lib/translation/language-context';
import { useState } from 'react';

interface CandidateCardProps {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  skills: string[];
  experience: {
    company: string;
    title: string;
    dates: string;
    description?: string;
  }[];
  education: {
    institution: string;
    degree: string;
    dates: string;
  }[];
  certifications?: string[];
  languages?: { language: string; proficiency: string }[];
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onFindMatches?: () => void;
}

export default function CandidateCard({
  id,
  name,
  email,
  phone,
  location,
  skills,
  experience,
  education,
  certifications = [],
  languages = [],
  onView,
  onEdit,
  onDelete,
  onFindMatches,
}: CandidateCardProps) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  // Get the most recent job title and company
  const currentPosition = experience.length > 0 
    ? `${experience[0].title} at ${experience[0].company}` 
    : '';

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {/* Card header */}
      <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">{name}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {currentPosition}
          </p>
        </div>
      </div>

      {/* Card content */}
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">{t('candidates.contactInfo')}</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div>{email}</div>
              {phone && <div>{phone}</div>}
              {location && <div>{location}</div>}
            </dd>
          </div>

          <div className="py-3 sm:py-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">{t('candidates.skills')}</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <div className="flex flex-wrap gap-1 mt-1">
                {skills.map((skill, index) => (
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
              <div className="py-3 sm:py-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{t('candidates.workHistory')}</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <ul className="divide-y divide-gray-200">
                    {experience.map((job, index) => (
                      <li key={index} className="py-2">
                        <div className="font-medium">{job.title}</div>
                        <div>{job.company} • {job.dates}</div>
                        {job.description && <div className="text-gray-500 mt-1">{job.description}</div>}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>

              <div className="py-3 sm:py-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{t('candidates.education')}</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <ul className="divide-y divide-gray-200">
                    {education.map((edu, index) => (
                      <li key={index} className="py-2">
                        <div className="font-medium">{edu.degree}</div>
                        <div>{edu.institution} • {edu.dates}</div>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>

              {certifications.length > 0 && (
                <div className="py-3 sm:py-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">{t('candidates.certifications')}</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <div className="flex flex-wrap gap-1 mt-1">
                      {certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </dd>
                </div>
              )}

              {languages.length > 0 && (
                <div className="py-3 sm:py-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">{t('candidates.languages')}</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <ul>
                      {languages.map((lang, index) => (
                        <li key={index}>
                          {lang.language}: {lang.proficiency}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
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
              {t('candidates.candidateDetails')}
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
