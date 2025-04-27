import React from 'react';
import { MatchScoreChart } from './MatchScoreChart';

export interface Match {
  jobId: string;
  jobTitle: string;
  company: string;
  candidateId: string;
  candidateName: string;
  overallMatchScore: number;
  matchCategory: string;
  criteriaScores: Record<string, number>;
  matchExplanation: string;
}

export const MatchCard: React.FC<{ match: Match }> = ({ match }) => (
  <div className="border rounded-lg p-4 shadow-md bg-white">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold">{match.jobTitle} @ {match.company}</h2>
        <p className="text-sm text-gray-600">{match.candidateName}</p>
      </div>
      <div className="flex items-center space-x-2">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
          {match.overallMatchScore}%
        </span>
        <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
          {match.matchCategory}
        </span>
      </div>
    </div>
    <div className="mt-2 text-sm text-gray-700">
      {match.matchExplanation}
    </div>
    <div className="mt-4">
      <MatchScoreChart scores={match.criteriaScores} />
    </div>
  </div>
);
