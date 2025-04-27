var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
// Load all Gemini API keys from .env (GEMINI_API_KEY_1 ... GEMINI_API_KEY_10)
const GEMINI_API_KEYS = Object.entries(process.env)
    .filter(([key]) => key.startsWith('GEMINI_API_KEY_'))
    .map(([, value]) => value)
    .filter(Boolean);
if (!GEMINI_API_KEYS.length) {
    throw new Error('No Gemini API keys found in environment variables.');
}
// Load available models from .env
const GEMINI_MODELS = {};
Object.entries(process.env).forEach(([key, value]) => {
    if (key.startsWith('Gemini_')) {
        GEMINI_MODELS[key.replace('Gemini_', '').toLowerCase()] = value;
    }
});
const DEFAULT_MODEL = GEMINI_MODELS['pro'] || 'gemini-2.0-pro-exp-02-05';
let keyIndex = 0;
function getNextApiKey() {
    const key = GEMINI_API_KEYS[keyIndex];
    keyIndex = (keyIndex + 1) % GEMINI_API_KEYS.length;
    return key;
}
function getModel(model) {
    if (!model)
        return DEFAULT_MODEL;
    // Accepts 'pro', 'flash', or full model string
    if (GEMINI_MODELS[model.toLowerCase()])
        return GEMINI_MODELS[model.toLowerCase()];
    return model;
}
export function callGemini(prompt, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = getModel(opts === null || opts === void 0 ? void 0 : opts.model);
        const apiKey = getNextApiKey();
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        try {
            const response = yield axios.post(url, {
                contents: [{ parts: [{ text: prompt }] }],
            }, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        }
        catch (err) {
            // If rate limited, try next key once
            if (err.response && err.response.status === 429 && GEMINI_API_KEYS.length > 1) {
                const fallbackKey = getNextApiKey();
                const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${fallbackKey}`;
                const response = yield axios.post(fallbackUrl, {
                    contents: [{ parts: [{ text: prompt }] }],
                }, {
                    headers: { 'Content-Type': 'application/json' },
                });
                return response.data;
            }
            throw err;
        }
    });
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
