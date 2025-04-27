var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'fs/promises';
import path from 'path';
import { callGemini } from './geminiClient';
/**
 * Load raw text from a file in the data directory
 */
export function loadDataFile(relativePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const root = path.resolve(__dirname, '../../data');
        const fullPath = path.join(root, relativePath);
        return fs.readFile(fullPath, 'utf-8');
    });
}
/**
 * Extract entities from raw text using Gemini LLM
 * @param text Raw JD or CV text
 * @returns EntityExtractionResult
 */
export function extractEntities(text) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const prompt = `Extract the following entities from the given job description or resume text and return as JSON:\n- skills (array of strings)\n- roles (array of strings)\n- experienceYears (number)\n- education (string)\n- industry (string)\n- certifications (array of strings)\n- languages (array of strings)\n- softSkills (array of strings)\n- leadership (boolean)\nInput Text: ${text}\nOutput JSON:`;
        try {
            const result = yield callGemini(prompt);
            // Parse and normalize output
            const textResponse = ((_e = (_d = (_c = (_b = (_a = result.candidates) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.text) || ((_h = (_g = (_f = result.choices) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g.message) === null || _h === void 0 ? void 0 : _h.content) || '';
            const json = JSON.parse(textResponse);
            return normalizeEntities(json);
        }
        catch (e) {
            throw new Error(`Gemini extraction failed: ${e}`);
        }
    });
}
/**
 * Normalize and clean extracted entities
 * - Deduplicate arrays, trim strings, correct language
 */
export function normalizeEntities(raw) {
    function normArr(arr) {
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
export function generateSyntheticPairs(classDescription_1) {
    return __awaiter(this, arguments, void 0, function* (classDescription, n = 1) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const prompt = `Generate ${n} synthetic job description (JD) and candidate resume (CV) pairs for the following class. Return as a JSON array of objects with 'jd' and 'cv' fields.\nClass Description: ${classDescription}\nOutput JSON:`;
        try {
            const result = yield callGemini(prompt);
            const textResponse = ((_e = (_d = (_c = (_b = (_a = result.candidates) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.text) || ((_h = (_g = (_f = result.choices) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g.message) === null || _h === void 0 ? void 0 : _h.content) || '';
            return JSON.parse(textResponse);
        }
        catch (e) {
            throw new Error(`Gemini synthetic data generation failed: ${e}`);
        }
    });
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
export function parseJobDescription(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        const text = yield loadDataFile(path.join('job-descriptions', filename));
        return yield extractEntities(text);
    });
}
/**
 * Parse a resume file into structured entities
 */
export function parseResume(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        const text = yield loadDataFile(path.join('resumes', filename));
        return yield extractEntities(text);
    });
}
