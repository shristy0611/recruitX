import { GoogleGenerativeAI } from '@google/generative-ai';
import { useApiKey } from './api-key-rotation';

// Define the types for the Gemini API responses
type GeminiResponse = {
  text: string;
  error?: string;
};

export class GeminiService {
  private apiKey: string;
  private model: string;
  private genAI: GoogleGenerativeAI;
  private rotateKey: () => void;

  constructor(apiKey: string, rotateKey: () => void, model = 'gemini-2.0-flash-lite') {
    this.apiKey = apiKey;
    this.model = model;
    this.rotateKey = rotateKey;
    this.genAI = new GoogleGenerativeAI(this.apiKey);
  }

  // Parse resume text and extract structured information
  async parseResume(resumeText: string): Promise<GeminiResponse> {
    try {
      const prompt = `
        Parse the following resume and extract structured information in JSON format.
        Include the following fields:
        - name
        - contact (email, phone, location)
        - summary
        - skills (as an array)
        - experience (array of objects with company, title, dates, description)
        - education (array of objects with institution, degree, dates)
        - certifications (as an array)
        - languages (as an array with proficiency levels)

        Resume text:
        ${resumeText}

        Return only the JSON object without any additional text.
      `;

      const result = await this.generateContent(prompt);
      return { text: result };
    } catch (error) {
      console.error('Error parsing resume:', error);
      this.rotateKey(); // Rotate to next API key on error
      return { text: '', error: error instanceof Error ? error.message : String(error) };
    }
  }

  // Parse job description text and extract structured information
  async parseJobDescription(jobText: string): Promise<GeminiResponse> {
    try {
      const prompt = `
        Parse the following job description and extract structured information in JSON format.
        Include the following fields:
        - title
        - company
        - location
        - jobType (full-time, part-time, contract, etc.)
        - summary
        - requiredSkills (as an array)
        - preferredSkills (as an array)
        - requiredExperience
        - requiredEducation
        - responsibilities (as an array)
        - benefits (as an array)

        Job description text:
        ${jobText}

        Return only the JSON object without any additional text.
      `;

      const result = await this.generateContent(prompt);
      return { text: result };
    } catch (error) {
      console.error('Error parsing job description:', error);
      this.rotateKey(); // Rotate to next API key on error
      return { text: '', error: error instanceof Error ? error.message : String(error) };
    }
  }

  // Match resume to job description and provide detailed scoring
  async matchResumeToJob(resumeData: any, jobData: any): Promise<GeminiResponse> {
    try {
      const prompt = `
        Analyze the match between the following resume and job description.
        Provide a detailed scoring based on these criteria:
        - Technical Skills (0-100)
        - Experience Level (0-100)
        - Education (0-100)
        - Industry Knowledge (0-100)
        - Language Proficiency (0-100)
        - Certification (0-100)
        - Soft Skills (0-100)
        - Leadership Experience (0-100)

        Calculate an overall match score as a weighted average:
        - Technical Skills: 25%
        - Experience Level: 25%
        - Education: 15%
        - Industry Knowledge: 15%
        - Language Proficiency: 5%
        - Certification: 5%
        - Soft Skills: 5%
        - Leadership Experience: 5%

        Resume data:
        ${JSON.stringify(resumeData)}

        Job description data:
        ${JSON.stringify(jobData)}

        Return a JSON object with the following structure:
        {
          "overall_match_score": number,
          "match_category": "Strong Match" | "Good Match" | "Potential Match" | "Weak Match" | "No Match",
          "criteria_scores": {
            "technical_skills": number,
            "experience_level": number,
            "education": number,
            "industry_knowledge": number,
            "language_proficiency": number,
            "certification": number,
            "soft_skills": number,
            "leadership_experience": number
          },
          "match_explanation": string
        }

        Return only the JSON object without any additional text.
      `;

      const result = await this.generateContent(prompt);
      return { text: result };
    } catch (error) {
      console.error('Error matching resume to job:', error);
      this.rotateKey(); // Rotate to next API key on error
      return { text: '', error: error instanceof Error ? error.message : String(error) };
    }
  }

  // Generate a detailed report for a specific match
  async generateMatchReport(matchData: any): Promise<GeminiResponse> {
    try {
      const prompt = `
        Generate a detailed recruitment match report based on the following match data.
        The report should include:
        1. Executive summary of the match
        2. Detailed analysis of each matching criteria
        3. Strengths of the candidate for this position
        4. Areas for improvement or potential gaps
        5. Recommendations for interview questions
        6. Overall suitability assessment

        Match data:
        ${JSON.stringify(matchData)}

        Format the report in markdown with clear sections and bullet points where appropriate.
      `;

      const result = await this.generateContent(prompt);
      return { text: result };
    } catch (error) {
      console.error('Error generating match report:', error);
      this.rotateKey(); // Rotate to next API key on error
      return { text: '', error: error instanceof Error ? error.message : String(error) };
    }
  }

  // Helper method to generate content using the Gemini API
  private async generateContent(prompt: string): Promise<string> {
    try {
      const generativeModel = this.genAI.getGenerativeModel({ model: this.model });
      const result = await generativeModel.generateContent(prompt);
      const response = result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating content:', error);
      this.rotateKey(); // Rotate to next API key on error
      throw error;
    }
  }
}

// Hook to use the Gemini service with API key rotation
export const useGeminiService = () => {
  const { currentKey, rotateKey } = useApiKey();
  return new GeminiService(currentKey, rotateKey);
};
