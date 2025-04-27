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
// NOTE: Use './index' (no extension) for ts-node/TypeScript; use './index.js' for compiled ESM JS.
import { extractEntities, generateSyntheticPairs } from './index';
const RAW_DATA_DIR = path.resolve(__dirname, '../../data');
const PROCESSED_DIR = path.resolve(__dirname, '../../data/processed');
function ensureDir(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs.mkdir(dir, { recursive: true });
        }
        catch (_a) { }
    });
}
function processFiles(subdir, outFile) {
    return __awaiter(this, void 0, void 0, function* () {
        const dir = path.join(RAW_DATA_DIR, subdir);
        const files = yield fs.readdir(dir);
        const results = [];
        for (const file of files) {
            const text = yield fs.readFile(path.join(dir, file), 'utf-8');
            try {
                const entities = yield extractEntities(text);
                results.push(Object.assign({ filename: file }, entities));
                console.log(`[OK] Processed ${subdir}/${file}`);
            }
            catch (e) {
                console.error(`[ERR] ${subdir}/${file}:`, e);
            }
        }
        yield fs.writeFile(path.join(PROCESSED_DIR, outFile), results.map(r => JSON.stringify(r)).join('\n'));
    });
}
function synthesizeData(classDesc, n, outFile) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pairs = yield generateSyntheticPairs(classDesc, n);
            yield fs.writeFile(path.join(PROCESSED_DIR, outFile), pairs.map(r => JSON.stringify(r)).join('\n'));
            console.log(`[OK] Synthesized ${n} pairs for class: ${classDesc}`);
        }
        catch (e) {
            console.error(`[ERR] Synthesis:`, e);
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield ensureDir(PROCESSED_DIR);
        // 1. Process job descriptions
        yield processFiles('job-descriptions', 'job_descriptions.jsonl');
        // 2. Process resumes
        yield processFiles('resumes', 'resumes.jsonl');
        // 3. Process evaluation notes (if present)
        try {
            yield processFiles('evaluation-notes', 'evaluation_notes.jsonl');
        }
        catch (_a) { }
        // 4. Synthesize data for class balancing (example usage)
        // await synthesizeData('Data Scientist, entry-level', 10, 'synthetic_ds_entry.jsonl');
    });
}
if (require.main === module) {
    main();
}
