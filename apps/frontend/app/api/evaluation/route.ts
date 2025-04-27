import { NextResponse } from 'next/server';
import path from 'path';
import { loadGroundTruth, parseEvaluationPairs } from '@recruitpro/lib/evaluation-utils';

export async function POST(request: Request) {
  try {
    const { predictions, positiveLabel } = await request.json();
    const parsedPredictions = parseEvaluationPairs(predictions);

    // Ground truth file path
    const groundTruthPath = path.join(
      process.cwd(),
      '..',
      '..',
      'data',
      'evaluations',
      'recruitment_ground_truth.json'
    );
    const gtPairs = loadGroundTruth(groundTruthPath);
    const gtMap = new Map(
      gtPairs.map((p) => [`${p.jobId}:${p.candidateId}`, p.label])
    );

    const yTrue: string[] = [];
    const yPred: string[] = [];
    for (const pred of parsedPredictions) {
      const key = `${pred.jobId}:${pred.candidateId}`;
      yTrue.push(gtMap.get(key) ?? 'unknown');
      yPred.push(pred.label);
    }

    const label = positiveLabel ?? 'strong match';
    const tp = yTrue.reduce(
      (acc, val, idx) =>
        val === label && yPred[idx] === label ? acc + 1 : acc,
      0
    );
    const tn = yTrue.reduce(
      (acc, val, idx) =>
        val !== label && yPred[idx] !== label ? acc + 1 : acc,
      0
    );
    const fp = yTrue.reduce(
      (acc, val, idx) =>
        val !== label && yPred[idx] === label ? acc + 1 : acc,
      0
    );
    const fn = yTrue.reduce(
      (acc, val, idx) =>
        val === label && yPred[idx] !== label ? acc + 1 : acc,
      0
    );
    const total = tp + tn + fp + fn;
    const accuracy = total > 0 ? (tp + tn) / total : 0;
    const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
    const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
    const f1 = precision + recall > 0 ? 2 * (precision * recall) / (precision + recall) : 0;

    return NextResponse.json({ accuracy, precision, recall, f1, support: yTrue.length, tp, tn, fp, fn });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
