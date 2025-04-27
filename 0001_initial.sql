-- Create database tables for the recruitment matching application

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'recruiter', 'hiring_manager')),
  preferred_language TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  job_type TEXT NOT NULL,
  description TEXT NOT NULL,
  required_skills TEXT NOT NULL, -- JSON array
  preferred_skills TEXT, -- JSON array
  required_experience TEXT,
  required_education TEXT,
  responsibilities TEXT, -- JSON array
  benefits TEXT, -- JSON array
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed', 'draft')),
  created_by INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Candidates table
CREATE TABLE IF NOT EXISTS candidates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  location TEXT,
  summary TEXT,
  skills TEXT NOT NULL, -- JSON array
  experience TEXT NOT NULL, -- JSON array of work history
  education TEXT NOT NULL, -- JSON array
  certifications TEXT, -- JSON array
  languages TEXT, -- JSON array with proficiency
  resume_text TEXT NOT NULL, -- Original resume text
  resume_file_path TEXT, -- Path to uploaded resume file
  created_by INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Matches table
CREATE TABLE IF NOT EXISTS matches (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id INTEGER NOT NULL,
  candidate_id INTEGER NOT NULL,
  overall_match_score INTEGER NOT NULL,
  match_category TEXT NOT NULL CHECK (match_category IN ('Strong Match', 'Good Match', 'Potential Match', 'Weak Match', 'No Match')),
  criteria_scores TEXT NOT NULL, -- JSON object with individual scores
  match_explanation TEXT NOT NULL,
  created_by INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id),
  FOREIGN KEY (candidate_id) REFERENCES candidates(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Reports table
CREATE TABLE IF NOT EXISTS reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('match_report', 'candidate_comparison', 'hiring_progress', 'talent_pool', 'skill_gap')),
  content TEXT NOT NULL, -- JSON or Markdown content
  parameters TEXT, -- JSON parameters used to generate the report
  created_by INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- API Keys table
CREATE TABLE IF NOT EXISTS api_keys (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT NOT NULL,
  provider TEXT NOT NULL DEFAULT 'gemini',
  is_active BOOLEAN NOT NULL DEFAULT 1,
  last_used TIMESTAMP,
  rate_limited_until TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activity Log table
CREATE TABLE IF NOT EXISTS activity_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  action_type TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id INTEGER,
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert default admin user
INSERT INTO users (email, password_hash, name, role, preferred_language)
VALUES ('admin@recruitpro.com', '$2a$12$1234567890123456789012', 'Admin User', 'admin', 'en');

-- Insert sample API keys (these would be replaced with real keys)
INSERT INTO api_keys (key, provider) VALUES ('GEMINI_API_KEY_1', 'gemini');
INSERT INTO api_keys (key, provider) VALUES ('GEMINI_API_KEY_2', 'gemini');
INSERT INTO api_keys (key, provider) VALUES ('GEMINI_API_KEY_3', 'gemini');
INSERT INTO api_keys (key, provider) VALUES ('GEMINI_API_KEY_4', 'gemini');
INSERT INTO api_keys (key, provider) VALUES ('GEMINI_API_KEY_5', 'gemini');
INSERT INTO api_keys (key, provider) VALUES ('GEMINI_API_KEY_6', 'gemini');
INSERT INTO api_keys (key, provider) VALUES ('GEMINI_API_KEY_7', 'gemini');
INSERT INTO api_keys (key, provider) VALUES ('GEMINI_API_KEY_8', 'gemini');
INSERT INTO api_keys (key, provider) VALUES ('GEMINI_API_KEY_9', 'gemini');
INSERT INTO api_keys (key, provider) VALUES ('GEMINI_API_KEY_10', 'gemini');
