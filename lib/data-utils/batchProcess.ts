import fs from 'fs/promises';
import path from 'path';
// NOTE: Use './index' (no extension) for ts-node/TypeScript; use './index.js' for compiled ESM JS.
import { extractEntities, generateSyntheticPairs, normalizeEntities } from './index';

const RAW_DATA_DIR = path.resolve(__dirname, '../../data');
const PROCESSED_DIR = path.resolve(__dirname, '../../data/processed');

async function ensureDir(dir: string) {
  try { await fs.mkdir(dir, { recursive: true }); } catch {}
}

async function processFiles(subdir: string, outFile: string) {
  const dir = path.join(RAW_DATA_DIR, subdir);
  const files = await fs.readdir(dir);
  type EntityRecord = { filename: string } & ReturnType<typeof normalizeEntities>;
  const results: EntityRecord[] = [];
  for (const file of files) {
    const text = await fs.readFile(path.join(dir, file), 'utf-8');
    try {
      const entities = await extractEntities(text);
      results.push({ filename: file, ...entities });
      console.log(`[OK] Processed ${subdir}/${file}`);
    } catch (e) {
      console.error(`[ERR] ${subdir}/${file}:`, e);
    }
  }
  await fs.writeFile(path.join(PROCESSED_DIR, outFile), results.map(r => JSON.stringify(r)).join('\n'));
}

async function synthesizeData(classDesc: string, n: number, outFile: string) {
  try {
    const pairs = await generateSyntheticPairs(classDesc, n);
    await fs.writeFile(path.join(PROCESSED_DIR, outFile), pairs.map(r => JSON.stringify(r)).join('\n'));
    console.log(`[OK] Synthesized ${n} pairs for class: ${classDesc}`);
  } catch (e) {
    console.error(`[ERR] Synthesis:`, e);
  }
}

async function main() {
  await ensureDir(PROCESSED_DIR);
  // 1. Process job descriptions
  await processFiles('job-descriptions', 'job_descriptions.jsonl');
  // 2. Process resumes
  await processFiles('resumes', 'resumes.jsonl');
  // 3. Process evaluation notes (if present)
  try { await processFiles('evaluation-notes', 'evaluation_notes.jsonl'); } catch {}
  // 4. Synthesize data for class balancing (example usage)
  // await synthesizeData('Data Scientist, entry-level', 10, 'synthetic_ds_entry.jsonl');
}

if (require.main === module) {
  main();
}
