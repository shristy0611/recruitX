import { NextResponse } from 'next/server';

const reports = [
  {
    id: 'report-1',
    title: 'Monthly Hiring Report',
    date: '2025-04-01',
    type: 'PDF',
    url: '/reports/monthly-hiring-report.pdf',
  },
  {
    id: 'report-2',
    title: 'Candidate Pipeline Overview',
    date: '2025-04-15',
    type: 'Excel',
    url: '/reports/candidate-pipeline.xlsx',
  },
];

export async function GET() {
  return NextResponse.json({ reports });
}
