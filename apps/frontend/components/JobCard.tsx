import React from 'react';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  status: string;
  requiredSkills: string[];
  preferredSkills: string[];
  requiredExperience: string;
  requiredEducation: string;
  createdAt: string;
}

export const JobCard: React.FC<{ job: Job }> = ({ job }) => (
  <div className="border rounded-lg p-4 shadow-md bg-white">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold">{job.title}</h2>
        <p className="text-sm text-gray-600">{job.company} &ndash; {job.location}</p>
        <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">{job.jobType}</span>
        <span className={`inline-block ml-2 px-2 py-1 text-xs rounded ${job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>{job.status}</span>
      </div>
      <div className="text-xs text-gray-400">{new Date(job.createdAt).toLocaleDateString()}</div>
    </div>
    <div className="mt-2">
      <strong>Required Skills:</strong> {job.requiredSkills.join(', ')}
    </div>
    {job.preferredSkills.length > 0 && (
      <div className="mt-1">
        <strong>Preferred Skills:</strong> {job.preferredSkills.join(', ')}
      </div>
    )}
    <div className="mt-1 text-sm text-gray-700">
      <strong>Experience:</strong> {job.requiredExperience}
    </div>
    <div className="mt-1 text-sm text-gray-700">
      <strong>Education:</strong> {job.requiredEducation}
    </div>
  </div>
);
