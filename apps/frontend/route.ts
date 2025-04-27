import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext, apiResponse, apiError } from '@/lib/api-utils';

// GET /api/jobs - Get all jobs
export async function GET(req: NextRequest) {
  try {
    const cf = getCloudflareContext(req);
    if (!cf) {
      return apiError('Cloudflare context not available', 500);
    }

    // Get query parameters for filtering
    const url = new URL(req.url);
    const status = url.searchParams.get('status');
    const jobType = url.searchParams.get('jobType');
    const location = url.searchParams.get('location');
    const search = url.searchParams.get('search');

    // Build the SQL query with filters
    let query = 'SELECT * FROM jobs WHERE 1=1';
    const params: any[] = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (jobType) {
      query += ' AND job_type = ?';
      params.push(jobType);
    }

    if (location) {
      query += ' AND location LIKE ?';
      params.push(`%${location}%`);
    }

    if (search) {
      query += ' AND (title LIKE ? OR company LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY created_at DESC';

    // Execute the query
    const stmt = cf.env.DB.prepare(query);
    params.forEach((param, index) => {
      stmt.bind(index + 1, param);
    });

    const jobs = await stmt.all();

    // Process the results
    const processedJobs = jobs.results?.map((job: any) => {
      return {
        ...job,
        requiredSkills: JSON.parse(job.required_skills || '[]'),
        preferredSkills: JSON.parse(job.preferred_skills || '[]'),
        responsibilities: JSON.parse(job.responsibilities || '[]'),
        benefits: JSON.parse(job.benefits || '[]'),
      };
    });

    return apiResponse({ jobs: processedJobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return apiError('Failed to fetch jobs', 500);
  }
}

// POST /api/jobs - Create a new job
export async function POST(req: NextRequest) {
  try {
    const cf = getCloudflareContext(req);
    if (!cf) {
      return apiError('Cloudflare context not available', 500);
    }

    // Parse the request body
    const body = await req.json();
    const {
      title,
      company,
      location,
      jobType,
      description,
      requiredSkills,
      preferredSkills,
      requiredExperience,
      requiredEducation,
      responsibilities,
      benefits,
      status,
      createdBy,
    } = body;

    // Validate required fields
    if (!title || !company || !location || !jobType || !description || !requiredSkills || !createdBy) {
      return apiError('Missing required fields', 400);
    }

    // Insert the job into the database
    const stmt = cf.env.DB.prepare(`
      INSERT INTO jobs (
        title, company, location, job_type, description, 
        required_skills, preferred_skills, required_experience, 
        required_education, responsibilities, benefits, 
        status, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = await stmt.bind(
      title,
      company,
      location,
      jobType,
      description,
      JSON.stringify(requiredSkills),
      JSON.stringify(preferredSkills || []),
      requiredExperience || '',
      requiredEducation || '',
      JSON.stringify(responsibilities || []),
      JSON.stringify(benefits || []),
      status || 'active',
      createdBy
    ).run();

    if (!result.success) {
      return apiError('Failed to create job', 500);
    }

    // Get the newly created job
    const newJob = await cf.env.DB.prepare('SELECT * FROM jobs WHERE id = ?')
      .bind(result.meta?.last_row_id)
      .first();

    return apiResponse({ job: newJob }, 201);
  } catch (error) {
    console.error('Error creating job:', error);
    return apiError('Failed to create job', 500);
  }
}
