import React from 'react';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  experience: Array<{ company: string; title: string; dates: string; description: string }>;
  education: Array<{ institution: string; degree: string; dates: string }>;
  certifications: string[];
  languages: Array<{ language: string; proficiency: string }>;
  cvUrl: string;
}

interface CandidateCardProps {
  candidate: Candidate;
  onPreview: (url: string) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onPreview }) => (
  <div className="border rounded-lg p-4 shadow-md bg-white">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold">{candidate.name}</h2>
        <p className="text-sm text-gray-600">{candidate.location}</p>
      </div>
      <button
        className="text-sm text-blue-600 hover:underline"
        onClick={() => onPreview(candidate.cvUrl)}
      >
        Preview CV
      </button>
    </div>
    <div className="mt-2 text-sm">
      <strong>Skills:</strong> {candidate.skills.join(', ')}
    </div>
  </div>
);
