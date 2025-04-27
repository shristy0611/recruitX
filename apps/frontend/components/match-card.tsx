'use client';

import { useLanguage } from '@recruitpro/lib/translation/language-context';
import { useState } from 'react';

// Define the match category types
type MatchCategory = 'Strong Match' | 'Good Match' | 'Potential Match' | 'Weak Match' | 'No Match';

// Define the match score colors
const matchCategoryColors: Record<MatchCategory, string> = {
  'Strong Match': 'bg-green-100 text-green-800',
  'Good Match': 'bg-blue-100 text-blue-800',
  'Potential Match': 'bg-yellow-100 text-yellow-800',
  'Weak Match': 'bg-orange-100 text-orange-800',
  'No Match': 'bg-red-100 text-red-800',
};

// Define the match card props
interface MatchCardProps {
  jobId: string;
  jobTitle: string;
  company: string;
  candidateId: string;
  candidateName: string;
  overallMatchScore: number;
  matchCategory: MatchCategory;
  criteriaScores: {
    technicalSkills: number;
    experienceLevel: number;
    education: number;
    industryKnowledge: number;
    languageProficiency: number;
    certification: number;
    softSkills: number;
    leadershipExperience: number;
  };
  matchExplanation: string;
  onViewDetails?: () => void;
}

export default function MatchCard({
  jobId,
  jobTitle,
  company,
  candidateId,
  candidateName,
  overallMatchScore,
  matchCategory,
  criteriaScores,
  matchExplanation,
  onViewDetails,
}: MatchCardProps) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  // Toggle expanded state
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {/* Card header */}
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {candidateName}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {jobTitle} at {company}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-2xl font-bold">{overallMatchScore}%</span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${matchCategoryColors[matchCategory]}`}>
            {t(`matches.${matchCategory.toLowerCase().replace(/\s+/g, '')}`)}
          </span>
        </div>
      </div>

      {/* Card content */}
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          {/* Top criteria scores */}
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <div className="flex flex-col items-center">
              <dt className="text-sm font-medium text-gray-500">{t('matches.technicalSkills')}</dt>
              <dd className="mt-1 text-sm text-gray-900 font-semibold">{criteriaScores.technicalSkills}%</dd>
            </div>
            <div className="flex flex-col items-center">
              <dt className="text-sm font-medium text-gray-500">{t('matches.experienceLevel')}</dt>
              <dd className="mt-1 text-sm text-gray-900 font-semibold">{criteriaScores.experienceLevel}%</dd>
            </div>
            <div className="flex flex-col items-center">
              <dt className="text-sm font-medium text-gray-500">{t('matches.educationMatch')}</dt>
              <dd className="mt-1 text-sm text-gray-900 font-semibold">{criteriaScores.education}%</dd>
            </div>
            <div className="flex flex-col items-center">
              <dt className="text-sm font-medium text-gray-500">{t('matches.industryKnowledge')}</dt>
              <dd className="mt-1 text-sm text-gray-900 font-semibold">{criteriaScores.industryKnowledge}%</dd>
            </div>
          </div>

          {/* Expanded content */}
          {expanded && (
            <>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                <div className="flex flex-col items-center">
                  <dt className="text-sm font-medium text-gray-500">{t('matches.languageProficiency')}</dt>
                  <dd className="mt-1 text-sm text-gray-900 font-semibold">{criteriaScores.languageProficiency}%</dd>
                </div>
                <div className="flex flex-col items-center">
                  <dt className="text-sm font-medium text-gray-500">{t('matches.certificationMatch')}</dt>
                  <dd className="mt-1 text-sm text-gray-900 font-semibold">{criteriaScores.certification}%</dd>
                </div>
                <div className="flex flex-col items-center">
                  <dt className="text-sm font-medium text-gray-500">{t('matches.softSkills')}</dt>
                  <dd className="mt-1 text-sm text-gray-900 font-semibold">{criteriaScores.softSkills}%</dd>
                </div>
                <div className="flex flex-col items-center">
                  <dt className="text-sm font-medium text-gray-500">{t('matches.leadershipExperience')}</dt>
                  <dd className="mt-1 text-sm text-gray-900 font-semibold">{criteriaScores.leadershipExperience}%</dd>
                </div>
              </div>

              <div className="py-4 sm:py-5 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{t('matches.matchDetails')}</dt>
                <dd className="mt-1 text-sm text-gray-900">{matchExplanation}</dd>
              </div>
            </>
          )}
        </dl>
      </div>

      {/* Card footer */}
      <div className="border-t border-gray-200 px-4 py-4 sm:px-6 flex justify-between">
        <button
          type="button"
          onClick={toggleExpanded}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {expanded ? t('actions.view') : t('actions.view')}
        </button>
        <button
          type="button"
          onClick={onViewDetails}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {t('matches.matchDetails')}
        </button>
      </div>
    </div>
  );
}
