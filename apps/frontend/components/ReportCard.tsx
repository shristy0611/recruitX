import React from 'react';

export interface Report {
  id: string;
  title: string;
  date: string;
  type: string;
  url: string;
}

export const ReportCard: React.FC<{ report: Report }> = ({ report }) => (
  <div className="border rounded-lg p-4 shadow-md bg-white flex justify-between items-center">
    <div>
      <h2 className="text-lg font-semibold">{report.title}</h2>
      <p className="text-sm text-gray-600">{new Date(report.date).toLocaleDateString()}</p>
    </div>
    <div className="space-x-2">
      <a
        href={report.url}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1 bg-blue-600 text-white rounded"
      >
        {report.type}
      </a>
      <button
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={() => alert('Delete action placeholder')}
      >
        Delete
      </button>
    </div>
  </div>
);
