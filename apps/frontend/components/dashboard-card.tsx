'use client';

import { useLanguage } from '@recruitpro/lib/translation/language-context';
import { useState } from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    positive: boolean;
  };
  icon?: React.ReactNode;
  onClick?: () => void;
}

export default function DashboardCard({
  title,
  value,
  change,
  icon,
  onClick,
}: DashboardCardProps) {
  const { t } = useLanguage();
  
  return (
    <div 
      className={`bg-white overflow-hidden shadow rounded-lg ${onClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex items-center">
          {icon && (
            <div className="flex-shrink-0 mr-3">
              {icon}
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-500 truncate">
              {title}
            </p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              {value}
            </p>
          </div>
        </div>
        {change && (
          <div className="mt-4">
            <div className={`text-sm ${change.positive ? 'text-green-600' : 'text-red-600'}`}>
              <span className="font-medium">
                {change.positive ? '↑' : '↓'} {change.value}
              </span>
              <span className="ml-1">
                {t('dashboard.fromPreviousPeriod')}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
