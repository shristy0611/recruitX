import fs from 'fs/promises';
import path from 'path';
import { callGemini } from './geminiClient';

/**
 * Entity extraction result from text (JD or resume)
 */
export interface EntityExtractionResult {
  skills: string[];
  roles: string[];
  experienceYears: number;
  education: string;
  industry: string;
  certifications: string[];
  languages: string[];
  softSkills: string[];
  leadership: boolean;
}

/**
 * Load raw text from a file in the data directory
 */
export async function loadDataFile(relativePath: string): Promise<string> {
  const root = path.resolve(__dirname, '../../data');
  const fullPath = path.join(root, relativePath);
  return fs.readFile(fullPath, 'utf-8');
}

/**
 * Extract entities from raw text using Gemini LLM
 * @param text Raw JD or CV text
 * @returns EntityExtractionResult
 */
export async function extractEntities(text: string): Promise<EntityExtractionResult> {
  const prompt = `Extract the following entities from the given job description or resume text and return as JSON:\n- skills (array of strings)\n- roles (array of strings)\n- experienceYears (number)\n- education (string)\n- industry (string)\n- certifications (array of strings)\n- languages (array of strings)\n- softSkills (array of strings)\n- leadership (boolean)\nInput Text: ${text}\nOutput JSON:`;
  try {
    const result = await callGemini(prompt);
    // Parse and normalize output
    const textResponse = result.candidates?.[0]?.content?.parts?.[0]?.text || result.choices?.[0]?.message?.content || '';
    const json = parseJsonResponse(textResponse);
    return normalizeEntities(json);
  } catch (e) {
    throw new Error(`Gemini extraction failed: ${e}`);
  }
}

/**
 * Normalize and clean extracted entities
 * - Deduplicate arrays, trim strings, correct language
 */
export function normalizeEntities(raw: any): EntityExtractionResult {
  function normArr(arr: any[]): string[] {
    // SOTA: Requires tsconfig target >= ES2015 for Set iteration
    return Array.isArray(arr) ? Array.from(new Set(arr.map((x) => (typeof x === 'string' ? x.trim() : '')))).filter(Boolean) : [];
  }
  return {
    skills: normArr(raw.skills),
    roles: normArr(raw.roles),
    experienceYears: typeof raw.experienceYears === 'number' ? raw.experienceYears : 0,
    education: typeof raw.education === 'string' ? raw.education.trim() : '',
    industry: typeof raw.industry === 'string' ? raw.industry.trim() : '',
    certifications: normArr(raw.certifications),
    languages: normArr(raw.languages),
    softSkills: normArr(raw.softSkills),
    leadership: Boolean(raw.leadership),
  };
}

/**
 * Generate synthetic JD–CV pairs for class balancing using Gemini LLM
 * @param classDescription Under-represented class description
 * @param n Number of samples to generate
 */
export async function generateSyntheticPairs(classDescription: string, n = 1): Promise<{ jd: string; cv: string }[]> {
  const prompt = `Generate ${n} synthetic job description (JD) and candidate resume (CV) pairs for the following class. Return as a JSON array of objects with 'jd' and 'cv' fields.\nClass Description: ${classDescription}\nOutput JSON:`;
  try {
    const result = await callGemini(prompt);
    const textResponse = result.candidates?.[0]?.content?.parts?.[0]?.text || result.choices?.[0]?.message?.content || '';
    return parseJsonResponse(textResponse) as { jd: string; cv: string }[];
  } catch (e) {
    throw new Error(`Gemini synthetic data generation failed: ${e}`);
  }
}

/**
 * Parse JSON from LLM response, stripping markdown fences and extracting JSON.
 */
function parseJsonResponse(text: string): any {
  const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const objMatch = cleaned.match(/\{[\s\S]*\}/);
    if (objMatch) return JSON.parse(objMatch[0]);
    const arrMatch = cleaned.match(/\[[\s\S]*\]/);
    if (arrMatch) return JSON.parse(arrMatch[0]);
    throw new Error('Cannot parse JSON from LLM response');
  }
}

// --- Sample Prompt Templates ---
// Entity Extraction Prompt:
// """
// Extract the following entities from the given job description or resume text and return as JSON:
// - skills (array of strings)
// - roles (array of strings)
// - experienceYears (number)
// - education (string)
// - industry (string)
// - certifications (array of strings)
// - languages (array of strings)
// - softSkills (array of strings)
// - leadership (boolean)
// Input Text: <PASTE_RAW_TEXT_HERE>
// Output JSON:
// { ... }
// """
// Synthetic Data Generation Prompt:
// """
// Generate N synthetic job description (JD) and candidate resume (CV) pairs for the following class. Return as a JSON array of objects with 'jd' and 'cv' fields.
// Class Description: <CLASS_DESCRIPTION>
// Output JSON:
// [ { "jd": "...", "cv": "..." }, ... ]
// """


/**
 * Parse a job description file (e.g., JSON or markdown) into structured entities
 */
export async function parseJobDescription(filename: string): Promise<EntityExtractionResult> {
  const text = await loadDataFile(path.join('job-descriptions', filename));
  return await extractEntities(text);
}

/**
 * Parse a resume file into structured entities
 */
export async function parseResume(filename: string): Promise<EntityExtractionResult> {
  const text = await loadDataFile(path.join('resumes', filename));
  return await extractEntities(text);
}
