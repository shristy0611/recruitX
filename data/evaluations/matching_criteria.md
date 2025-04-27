# Matching Criteria for Recruitment AI Ground Truth

This document defines the criteria used to evaluate matches between job descriptions and resumes for the ground truth dataset.

## Primary Matching Criteria

### 1. Technical Skills Match
- **Definition**: Alignment between technical skills required in the job description and demonstrated in the resume
- **Weight**: High
- **Evaluation**: 
  - 0-20: Few or no relevant technical skills
  - 21-40: Some relevant technical skills but missing key requirements
  - 41-60: Most required technical skills present but may lack depth
  - 61-80: Strong match on technical skills with appropriate depth
  - 81-100: Excellent match with all required technical skills and additional relevant ones

### 2. Experience Level Match
- **Definition**: Alignment between years and type of experience required and demonstrated
- **Weight**: High
- **Evaluation**:
  - 0-20: Significantly less experience than required
  - 21-40: Some relevant experience but below required years
  - 41-60: Meets minimum experience requirements
  - 61-80: Exceeds minimum experience with relevant background
  - 81-100: Significantly exceeds experience requirements in relevant areas

### 3. Education Match
- **Definition**: Alignment between educational requirements and candidate's qualifications
- **Weight**: Medium
- **Evaluation**:
  - 0-20: Education significantly below requirements
  - 21-40: Education somewhat below requirements
  - 41-60: Meets minimum educational requirements
  - 61-80: Education exceeds requirements (higher degree or more relevant field)
  - 81-100: Education significantly exceeds requirements with highly relevant specialization

### 4. Industry Knowledge Match
- **Definition**: Familiarity with the specific industry or domain mentioned in the job description
- **Weight**: Medium
- **Evaluation**:
  - 0-20: No relevant industry experience
  - 21-40: Limited exposure to the industry
  - 41-60: Some experience in the industry
  - 61-80: Significant experience in the industry
  - 81-100: Expert in the industry with comprehensive knowledge

## Secondary Matching Criteria

### 5. Language Proficiency Match
- **Definition**: Alignment between language requirements and candidate's proficiency
- **Weight**: Medium-Low (varies by position)
- **Evaluation**:
  - 0-20: Does not meet minimum language requirements
  - 21-40: Below required proficiency levels
  - 41-60: Meets minimum language requirements
  - 61-80: Exceeds language requirements
  - 81-100: Native or near-native in all required languages

### 6. Certification Match
- **Definition**: Possession of required or preferred certifications
- **Weight**: Medium-Low (varies by position)
- **Evaluation**:
  - 0-20: No relevant certifications
  - 21-40: Some certifications but not those specified
  - 41-60: Has some of the preferred certifications
  - 61-80: Has most or all required certifications
  - 81-100: Has all required plus additional relevant certifications

### 7. Soft Skills/Cultural Fit
- **Definition**: Alignment between soft skills/values mentioned in job description and resume
- **Weight**: Medium
- **Evaluation**:
  - 0-20: Few indicators of relevant soft skills
  - 21-40: Some relevant soft skills mentioned
  - 41-60: Good alignment of soft skills
  - 61-80: Strong alignment with most desired soft skills
  - 81-100: Excellent alignment with all desired soft skills and values

### 8. Leadership Experience Match
- **Definition**: Alignment between leadership requirements and demonstrated experience
- **Weight**: Medium-High (for management positions)
- **Evaluation**:
  - 0-20: No leadership experience when required
  - 21-40: Limited leadership experience
  - 41-60: Some leadership experience matching requirements
  - 61-80: Significant leadership experience matching requirements
  - 81-100: Extensive leadership experience exceeding requirements

## Overall Match Score Calculation

The overall match score will be calculated as a weighted average of the individual criteria scores:

```
Overall Score = (Technical Skills Score × 0.25) + 
                (Experience Level Score × 0.25) + 
                (Education Score × 0.15) + 
                (Industry Knowledge Score × 0.15) + 
                (Language Proficiency Score × 0.05) + 
                (Certification Score × 0.05) + 
                (Soft Skills Score × 0.05) + 
                (Leadership Experience Score × 0.05)
```

## Match Categories

Based on the overall score, matches will be categorized as:

- **Strong Match (80-100)**: Candidate meets or exceeds all key requirements
- **Good Match (60-79)**: Candidate meets most key requirements
- **Potential Match (40-59)**: Candidate meets some requirements but has gaps
- **Weak Match (20-39)**: Candidate meets few requirements
- **No Match (0-19)**: Candidate does not meet the basic requirements

## JSON Structure for Ground Truth

Each match evaluation will be stored in the following format:

```json
{
  "job_id": "job_X",
  "resume_id": "resume_Y",
  "overall_match_score": 75,
  "match_category": "Good Match",
  "criteria_scores": {
    "technical_skills": 80,
    "experience_level": 70,
    "education": 90,
    "industry_knowledge": 65,
    "language_proficiency": 85,
    "certification": 60,
    "soft_skills": 75,
    "leadership_experience": 70
  },
  "match_explanation": "The candidate has strong technical skills in [specific skills] which align well with the job requirements. Their experience exceeds the minimum requirements, and they have relevant industry knowledge. Their educational background is excellent for this role. Areas for improvement include [specific areas]."
}
```
