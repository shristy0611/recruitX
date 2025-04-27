import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// Load all Gemini API keys from .env (GEMINI_API_KEY_1 ... GEMINI_API_KEY_10)
const GEMINI_API_KEYS: string[] = Object.entries(process.env)
  .filter(([key]) => key.startsWith('GEMINI_API_KEY_'))
  .map(([, value]) => value as string)
  .filter(Boolean);

if (!GEMINI_API_KEYS.length) {
  throw new Error('No Gemini API keys found in environment variables.');
}

// Load available models from .env
const GEMINI_MODELS: { [key: string]: string } = {};
Object.entries(process.env).forEach(([key, value]) => {
  if (key.startsWith('Gemini_')) {
    GEMINI_MODELS[key.replace('Gemini_', '').toLowerCase()] = value as string;
  }
});
const DEFAULT_MODEL = GEMINI_MODELS['pro'] || 'gemini-2.0-pro-exp-02-05';

let keyIndex = 0;
function getNextApiKey(): string {
  const key = GEMINI_API_KEYS[keyIndex];
  keyIndex = (keyIndex + 1) % GEMINI_API_KEYS.length;
  return key;
}

function getModel(model?: string): string {
  if (!model) return DEFAULT_MODEL;
  // Accepts 'pro', 'flash', or full model string
  if (GEMINI_MODELS[model.toLowerCase()]) return GEMINI_MODELS[model.toLowerCase()];
  return model;
}

export async function callGemini(prompt: string, opts?: { model?: string }): Promise<any> {
  const model = getModel(opts?.model);
  const apiKey = getNextApiKey();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  try {
    const response = await axios.post(
      url,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data;
  } catch (err: any) {
    // If rate limited, try next key once
    if (err.response && err.response.status === 429 && GEMINI_API_KEYS.length > 1) {
      const fallbackKey = getNextApiKey();
      const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${fallbackKey}`;
      const response = await axios.post(
        fallbackUrl,
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      return response.data;
    }
    throw err;
  }
}

/**
 * Example prompt for entity extraction:
 * """
 * Extract the following entities from the given job description or resume text and return as JSON:
 * - skills (array of strings)
 * - roles (array of strings)
 * - experienceYears (number)
 * - education (string)
 * - industry (string)
 * - certifications (array of strings)
 * - languages (array of strings)
 * - softSkills (array of strings)
 * - leadership (boolean)
 * Input Text: <PASTE_RAW_TEXT_HERE>
 * Output JSON:
 * { ... }
 * """
 */


/**
 * Example prompt for entity extraction:
 * """
 * Extract the following entities from the given job description or resume text and return as JSON:
 * - skills (array of strings)
 * - roles (array of strings)
 * - experienceYears (number)
 * - education (string)
 * - industry (string)
 * - certifications (array of strings)
 * - languages (array of strings)
 * - softSkills (array of strings)
 * - leadership (boolean)
 * Input Text: <PASTE_RAW_TEXT_HERE>
 * Output JSON:
 * { ... }
 * """
 */
