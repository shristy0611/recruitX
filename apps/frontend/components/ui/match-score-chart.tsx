import { useLanguage } from '@/lib/i18n-config';
import { useState } from 'react';

interface MatchScoreChartProps {
  scores: {
    technicalSkills: number;
    experienceLevel: number;
    education: number;
    industryKnowledge: number;
    languageProficiency: number;
    certification: number;
    softSkills: number;
    leadershipExperience: number;
  };
  overallScore: number;
}

export default function MatchScoreChart({ scores, overallScore }: MatchScoreChartProps) {
  const { t } = useLanguage();
  
  // Define colors for different score ranges
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-yellow-500';
    if (score >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  // Define the criteria labels
  const criteriaLabels = [
    { key: 'technicalSkills', label: t('matches.technicalSkills'), weight: 0.25 },
    { key: 'experienceLevel', label: t('matches.experienceLevel'), weight: 0.25 },
    { key: 'education', label: t('matches.educationMatch'), weight: 0.15 },
    { key: 'industryKnowledge', label: t('matches.industryKnowledge'), weight: 0.15 },
    { key: 'languageProficiency', label: t('matches.languageProficiency'), weight: 0.05 },
    { key: 'certification', label: t('matches.certificationMatch'), weight: 0.05 },
    { key: 'softSkills', label: t('matches.softSkills'), weight: 0.05 },
    { key: 'leadershipExperience', label: t('matches.leadershipExperience'), weight: 0.05 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">{t('matches.matchScore')}</h3>
        <div className="text-3xl font-bold">
          <span className={`text-${getScoreColor(overallScore).replace('bg-', '')}`}>
            {overallScore}%
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        {criteriaLabels.map(({ key, label, weight }) => {
          const score = scores[key as keyof typeof scores];
          return (
            <div key={key} className="space-y-2">
              <div className="flex justify-between">
                <div className="text-sm font-medium text-gray-500">
                  {label} <span className="text-xs text-gray-400">({Math.round(weight * 100)}%)</span>
                </div>
                <div className="text-sm font-medium text-gray-900">{score}%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${getScoreColor(score)}`} 
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-500">{t('matches.overallScore')}</span>
          <span className="font-medium text-gray-900">{overallScore}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div 
            className={`h-2.5 rounded-full ${getScoreColor(overallScore)}`} 
            style={{ width: `${overallScore}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
