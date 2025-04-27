import { EvaluationPair, loadGroundTruth } from '../lib/evaluation-utils/index';

export interface Metrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  support: number;
}

export function computeMetrics(
  yTrue: string[],
  yPred: string[],
  positiveLabel: string = 'strong match'
): Metrics {
  let tp = 0, fp = 0, fn = 0, tn = 0;
  for (let i = 0; i < yTrue.length; i++) {
    if (yTrue[i] === positiveLabel) {
      if (yPred[i] === positiveLabel) tp++;
      else fn++;
    } else {
      if (yPred[i] === positiveLabel) fp++;
      else tn++;
    }
  }
  const accuracy = (tp + tn) / (tp + tn + fp + fn);
  const precision = tp / (tp + fp || 1);
  const recall = tp / (tp + fn || 1);
  const f1 = 2 * (precision * recall) / (precision + recall || 1);
  return { accuracy, precision, recall, f1, support: yTrue.length };
}

export function evaluate(
  groundTruthPath: string,
  predictions: EvaluationPair[],
  positiveLabel: string = 'strong match'
) {
  const gtPairs = loadGroundTruth(groundTruthPath);
  const gtMap = new Map(gtPairs.map(p => [`${p.jobId}:${p.candidateId}`, p.label]));
  const yTrue: string[] = [];
  const yPred: string[] = [];
  for (const pred of predictions) {
    const key = `${pred.jobId}:${pred.candidateId}`;
    yTrue.push(gtMap.get(key) ?? 'unknown');
    yPred.push(pred.label);
  }
  return computeMetrics(yTrue, yPred, positiveLabel);
}
