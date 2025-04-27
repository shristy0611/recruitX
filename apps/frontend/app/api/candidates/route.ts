import { NextResponse } from 'next/server';

const candidates = [
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
    cvUrl: '/cv/alex-johnson.pdf',
  },
  {
    id: 'candidate-2',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    skills: ['Product Management', 'Agile', 'JIRA', 'UX/UI', 'A/B Testing'],
    experience: [
      { company: 'InnovateCo', title: 'Product Manager', dates: '2023 - Present', description: 'Managed product lifecycle.' },
      { company: 'StartUpX', title: 'Associate Product Manager', dates: '2020 - 2023', description: 'Assisted in product planning.' },
    ],
    education: [
      { institution: 'Stanford University', degree: 'M.S. Management Science', dates: '2018 - 2020' },
      { institution: 'University of California, Los Angeles', degree: 'B.S. Economics', dates: '2014 - 2018' },
    ],
    certifications: ['PMP Certification', 'Scrum Master'],
    languages: [
      { language: 'English', proficiency: 'Native' },
      { language: 'Chinese', proficiency: 'Native' },
    ],
    cvUrl: '/cv/sarah-chen.pdf',
  },
];

export async function GET() {
  return NextResponse.json({ candidates });
}
