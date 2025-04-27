import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import wandb from '@wandb/client';

const EXPERIMENTS_FILE = path.join(
  process.cwd(),
  '..',
  '..',
  'data',
  'experiments.json'
);

interface ExperimentRecord {
  id: number;
  timestamp: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  support: number;
  tp: number;
  tn: number;
  fp: number;
  fn: number;
  positiveLabel: string;
}

export async function GET() {
  try {
    if (!fs.existsSync(EXPERIMENTS_FILE)) {
      return NextResponse.json([]);
    }
    const raw = fs.readFileSync(EXPERIMENTS_FILE, 'utf-8');
    const experiments: ExperimentRecord[] = JSON.parse(raw);
    return NextResponse.json(experiments);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Initialize W&B run if API key is set
    let run: any;
    if (process.env.WAND_API_KEY) {
      run = await wandb.init({ project: 'recruitpro-ai' });
    }
    const data = await request.json();
    const now = Date.now();
    const record: ExperimentRecord = {
      id: now,
      timestamp: new Date(now).toISOString(),
      accuracy: data.accuracy,
      precision: data.precision,
      recall: data.recall,
      f1: data.f1,
      support: data.support,
      tp: data.tp,
      tn: data.tn,
      fp: data.fp,
      fn: data.fn,
      positiveLabel: data.positiveLabel || 'strong match',
    };
    let experiments: ExperimentRecord[] = [];
    if (fs.existsSync(EXPERIMENTS_FILE)) {
      const raw = fs.readFileSync(EXPERIMENTS_FILE, 'utf-8');
      experiments = JSON.parse(raw) as ExperimentRecord[];
    }
    experiments.unshift(record);
    fs.writeFileSync(EXPERIMENTS_FILE, JSON.stringify(experiments, null, 2));
    // Log to W&B and finish run
    if (run) {
      run.log({
        accuracy: record.accuracy,
        precision: record.precision,
        recall: record.recall,
        f1: record.f1,
        support: record.support,
        tp: record.tp,
        tn: record.tn,
        fp: record.fp,
        fn: record.fn
      });
      run.finish();
    }
    return NextResponse.json(record, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
