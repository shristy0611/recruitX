import { NextResponse } from 'next/server';

const jobs = [
  {
    id: 'job-1',
    title: 'Senior Software Engineer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    jobType: 'Full-time',
    status: 'active',
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'AWS', 'TypeScript'],
    preferredSkills: ['GraphQL', 'Docker', 'Kubernetes'],
    requiredExperience: '5+ years',
    requiredEducation: "Bachelor's degree in Computer Science or related field",
    createdAt: '2025-04-15T00:00:00Z',
  },
  {
    id: 'job-2',
    title: 'Product Manager',
    company: 'InnovateCo',
    location: 'Remote',
    jobType: 'Contract',
    status: 'open',
    requiredSkills: ['Product Management', 'Agile', 'JIRA'],
    preferredSkills: ['UX/UI', 'A/B Testing'],
    requiredExperience: '3+ years',
    requiredEducation: "Bachelor's degree in Business or related field",
    createdAt: '2025-04-20T00:00:00Z',
  },
];

export async function GET() {
  return NextResponse.json({ jobs });
}
