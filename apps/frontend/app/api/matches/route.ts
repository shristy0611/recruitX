import { NextResponse } from 'next/server';

const matches = [
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

export async function GET() {
  return NextResponse.json({ matches });
}
