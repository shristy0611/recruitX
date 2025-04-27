import fs from 'fs';
import path from 'path';

export interface EvaluationPair {
  jobId: string;
  candidateId: string;
  label: string;
}

export function loadGroundTruth(filePath: string): EvaluationPair[] {
  const absPath = path.resolve(filePath);
  const raw = fs.readFileSync(absPath, 'utf-8');
  return JSON.parse(raw) as EvaluationPair[];
}

export function normalizeLabel(label: string): string {
  // Lowercase, trim, and standardize label
  return label.trim().toLowerCase();
}

export function parseEvaluationPairs(raw: any[]): EvaluationPair[] {
  return raw.map(item => ({
    jobId: item.jobId,
    candidateId: item.candidateId,
    label: normalizeLabel(item.label),
  }));
}
