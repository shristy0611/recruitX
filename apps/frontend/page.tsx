import { useLanguage } from '@/lib/i18n-config';
import { useState } from 'react';
import Layout from '@/components/layout';
import DashboardCard from '@/components/dashboard-card';
import MatchCard from '@/components/match-card';
import JobCard from '@/components/job-card';
import CandidateCard from '@/components/candidate-card';

export default function Dashboard() {
  const { t } = useLanguage();
  
  // Mock data for dashboard
  const dashboardStats = [
    {
      title: t('dashboard.openPositions'),
      value: 24,
      change: { value: '8%', positive: true },
    },
    {
      title: t('dashboard.pendingMatches'),
      value: 156,
      change: { value: '12%', positive: true },
    },
    {
      title: t('dashboard.candidatesInPool'),
      value: 342,
      change: { value: '5%', positive: true },
    },
    {
      title: t('dashboard.averageMatchScore'),
      value: '68%',
      change: { value: '3%', positive: true },
    },
  ];

  // Mock data for recent matches
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

  // Mock data for recent jobs
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

  // Mock data for recent candidates
  const recentCandidates = [
    {
      id: 'candidate-1',
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      skills: ['JavaScript', 'React', 'Node.js', 'AWS', 'TypeScript', 'GraphQL'],
      experience: [
        {
          company: 'WebTech Inc.',
          title: 'Senior Frontend Developer',
          dates: '2022 - Present',
          description: 'Led development of React-based web applications.',
        },
        {
          company: 'CodeCorp',
          title: 'Frontend Developer',
          dates: '2019 - 2022',
          description: 'Developed and maintained JavaScript applications.',
        },
      ],
      education: [
        {
          institution: 'University of California, Berkeley',
          degree: 'B.S. Computer Science',
          dates: '2015 - 2019',
        },
      ],
      certifications: ['AWS Certified Developer', 'React Certification'],
      languages: [
        { language: 'English', proficiency: 'Native' },
        { language: 'Spanish', proficiency: 'Intermediate' },
      ],
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.title')}</h1>
        
        {/* Dashboard stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((stat, index) => (
            <DashboardCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
            />
          ))}
        </div>
        
        {/* Recent activity section */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">{t('dashboard.recentActivity')}</h2>
          
          {/* Recent matches */}
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-700 mb-3">{t('dashboard.recentMatches')}</h3>
            <div className="space-y-4">
              {recentMatches.map((match, index) => (
                <MatchCard
                  key={index}
                  jobId={match.jobId}
                  jobTitle={match.jobTitle}
                  company={match.company}
                  candidateId={match.candidateId}
                  candidateName={match.candidateName}
                  overallMatchScore={match.overallMatchScore}
                  matchCategory={match.matchCategory as any}
                  criteriaScores={match.criteriaScores}
                  matchExplanation={match.matchExplanation}
                  onViewDetails={() => console.log('View match details', match.jobId, match.candidateId)}
                />
              ))}
            </div>
          </div>
          
          {/* Recent jobs */}
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-700 mb-3">{t('dashboard.recentJobs')}</h3>
            <div className="space-y-4">
              {recentJobs.map((job, index) => (
                <JobCard
                  key={index}
                  id={job.id}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  jobType={job.jobType}
                  status={job.status as any}
                  requiredSkills={job.requiredSkills}
                  preferredSkills={job.preferredSkills}
                  requiredExperience={job.requiredExperience}
                  requiredEducation={job.requiredEducation}
                  createdAt={job.createdAt}
                  onView={() => console.log('View job', job.id)}
                  onEdit={() => console.log('Edit job', job.id)}
                  onFindMatches={() => console.log('Find matches for job', job.id)}
                />
              ))}
            </div>
          </div>
          
          {/* Recent candidates */}
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-3">{t('dashboard.recentCandidates')}</h3>
            <div className="space-y-4">
              {recentCandidates.map((candidate, index) => (
                <CandidateCard
                  key={index}
                  id={candidate.id}
                  name={candidate.name}
                  email={candidate.email}
                  phone={candidate.phone}
                  location={candidate.location}
                  skills={candidate.skills}
                  experience={candidate.experience}
                  education={candidate.education}
                  certifications={candidate.certifications}
                  languages={candidate.languages}
                  onView={() => console.log('View candidate', candidate.id)}
                  onEdit={() => console.log('Edit candidate', candidate.id)}
                  onFindMatches={() => console.log('Find matches for candidate', candidate.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
