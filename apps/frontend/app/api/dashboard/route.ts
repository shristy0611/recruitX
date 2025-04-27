import { NextResponse } from 'next/server';

const dashboardStats = [
  { title: 'Open Positions', value: 24, change: { value: '8%', positive: true } },
  { title: 'Pending Matches', value: 156, change: { value: '12%', positive: true } },
  { title: 'Candidates in Pool', value: 342, change: { value: '5%', positive: true } },
  { title: 'Average Match Score', value: '68%', change: { value: '3%', positive: true } },
];

const recentMatches = [
  {
    jobId: 'job-1',
    jobTitle: 'Senior Software Engineer',
    company: 'TechCorp',
    candidateId: 'candidate-1',
    candidateName: 'Alex Johnson',
    overallMatchScore: 87,
    matchCategory: 'Strong Match',
    criteriaScores: {
      technicalSkills: 92,
      experienceLevel: 85,
      education: 80,
      industryKnowledge: 88,
      languageProficiency: 95,
      certification: 75,
      softSkills: 82,
      leadershipExperience: 78,
    },
    matchExplanation: 'Strong technical skills match with extensive experience in required technologies. Education background aligns well with job requirements.',
  },
  {
    jobId: 'job-2',
    jobTitle: 'Product Manager',
    company: 'InnovateCo',
    candidateId: 'candidate-2',
    candidateName: 'Sarah Chen',
    overallMatchScore: 76,
    matchCategory: 'Good Match',
    criteriaScores: {
      technicalSkills: 70,
      experienceLevel: 82,
      education: 85,
      industryKnowledge: 78,
      languageProficiency: 90,
      certification: 65,
      softSkills: 88,
      leadershipExperience: 80,
    },
    matchExplanation: 'Good overall match with strong soft skills and leadership experience. Some technical skills could be improved.',
  },
];

const recentJobs = [
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
];

const recentCandidates = [
  {
    id: 'candidate-1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    skills: ['JavaScript', 'React', 'Node.js', 'AWS', 'TypeScript', 'GraphQL'],
    experience: [
      { company: 'WebTech Inc.', title: 'Senior Frontend Developer', dates: '2022 - Present', description: 'Led development of React-based web applications.' },
      { company: 'CodeCorp', title: 'Frontend Developer', dates: '2019 - 2022', description: 'Developed and maintained JavaScript applications.' },
    ],
    education: [
      { institution: 'University of California, Berkeley', degree: 'B.S. Computer Science', dates: '2015 - 2019' },
    ],
    certifications: ['AWS Certified Developer', 'React Certification'],
    languages: [
      { language: 'English', proficiency: 'Native' },
      { language: 'Spanish', proficiency: 'Intermediate' },
    ],
  },
];

export async function GET() {
  return NextResponse.json({ dashboardStats, recentMatches, recentJobs, recentCandidates });
}
