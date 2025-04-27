'use client';

import { useLanguage } from '@recruitpro/lib/translation/language-context';
import { useState } from 'react';

interface ReportCardProps {
  id: string;
  title: string;
  type: 'match_report' | 'candidate_comparison' | 'hiring_progress' | 'talent_pool' | 'skill_gap';
  createdAt: string;
  createdBy: string;
  previewImage?: string;
  onView?: () => void;
  onExport?: () => void;
  onDelete?: () => void;
}

export default function ReportCard({
  id,
  title,
  type,
  createdAt,
  createdBy,
  previewImage,
  onView,
  onExport,
  onDelete,
}: ReportCardProps) {
  const { t } = useLanguage();
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  // Get report type label
  const getReportTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      match_report: t('reports.matchingAnalytics'),
      candidate_comparison: t('reports.candidateComparison'),
      hiring_progress: t('reports.hiringProgress'),
      talent_pool: t('reports.talentPoolAnalytics'),
      skill_gap: t('reports.skillGapAnalysis'),
    };
    
    return typeMap[type] || type;
  };
  
  // Get report type color
  const getReportTypeColor = (type: string) => {
    const colorMap: Record<string, string> = {
      match_report: 'bg-indigo-100 text-indigo-800',
      candidate_comparison: 'bg-blue-100 text-blue-800',
      hiring_progress: 'bg-green-100 text-green-800',
      talent_pool: 'bg-purple-100 text-purple-800',
      skill_gap: 'bg-orange-100 text-orange-800',
    };
    
    return colorMap[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {/* Card header */}
      <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {formatDate(createdAt)} • {createdBy}
          </p>
        </div>
        <div>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getReportTypeColor(
              type
            )}`}
          >
            {getReportTypeLabel(type)}
          </span>
        </div>
      </div>

      {/* Card content */}
      <div className="border-t border-gray-200">
        {previewImage ? (
          <div className="p-4 flex justify-center">
            <img
              src={previewImage}
              alt={title}
              className="max-h-40 object-contain"
            />
          </div>
        ) : (
          <div className="p-4 flex justify-center items-center h-40 bg-gray-50">
            <span className="text-gray-400">{t('reports.noPreview')}</span>
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="border-t border-gray-200 px-4 py-4 sm:px-6 flex justify-between">
        <div>
          {onView && (
            <button
              type="button"
              onClick={onView}
              className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t('actions.view')}
            </button>
          )}
        </div>
        <div>
          {onExport && (
            <button
              type="button"
              onClick={onExport}
              className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t('reports.exportReport')}
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t('actions.delete')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
