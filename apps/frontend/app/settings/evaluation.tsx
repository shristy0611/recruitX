"use client";

import { useState, useEffect } from "react";
import { EvaluationMetricsCard, Metrics } from "../../components/EvaluationMetricsCard";
import { ConfusionMatrixCard, ConfusionMatrixProps } from "../../components/ConfusionMatrixCard";

// Type for experiment records
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

export default function EvaluationSettingsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [positiveLabel, setPositiveLabel] = useState("strong match");
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [confusionStats, setConfusionStats] = useState<ConfusionMatrixProps | null>(null);
  const [experiments, setExperiments] = useState<ExperimentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExperiments() {
      try {
        const res = await fetch("/api/experiments");
        if (!res.ok) throw new Error("Failed to fetch experiments");
        const data: ExperimentRecord[] = await res.json();
        setExperiments(data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchExperiments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const text = await file.text();
      const predictions = JSON.parse(text);
      const evalRes = await fetch("/api/evaluation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ predictions, positiveLabel }),
      });
      const data = await evalRes.json();
      if (!evalRes.ok) throw new Error(data.error || "Evaluation failed");
      const { accuracy, precision, recall, f1, support, tp, tn, fp, fn } = data;
      setMetrics({ accuracy, precision, recall, f1, support });
      setConfusionStats({ tp, tn, fp, fn });

      const recordRes = await fetch("/api/experiments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accuracy, precision, recall, f1, support, tp, tn, fp, fn, positiveLabel }),
      });
      if (recordRes.ok) {
        const newRecord: ExperimentRecord = await recordRes.json();
        setExperiments((prev) => [newRecord, ...prev]);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold">Evaluation & Benchmarking</h1>
      <p className="text-gray-600 mb-4">
        Track the accuracy and performance of your matching algorithms on ground truth data. Upload predictions, compare results, and iterate on SOTA models.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Predictions JSON:</label>
          <input type="file" accept=".json" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </div>
        <div>
          <label className="block font-medium">Positive Label:</label>
          <input
            type="text"
            value={positiveLabel}
            onChange={(e) => setPositiveLabel(e.target.value)}
            className="border p-1"
          />
        </div>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
          {loading ? "Running..." : "Run Evaluation"}
        </button>
      </form>
      {error && <div className="text-red-500">{error}</div>}
      {metrics && <EvaluationMetricsCard metrics={metrics} />}
      {confusionStats && <ConfusionMatrixCard stats={confusionStats} />}
      <div>
        <h2 className="text-xl font-semibold mt-8">Experiment History</h2>
        <ul>
          {experiments.map((exp) => (
            <li key={exp.id} className="border p-2 mb-2">
              <div>
                <strong>{new Date(exp.timestamp).toLocaleString()}</strong> Label: {exp.positiveLabel}
              </div>
              <div>
                Accuracy: {exp.accuracy.toFixed(3)}, Precision: {exp.precision.toFixed(3)}, Recall: {exp.recall.toFixed(3)}, F1: {exp.f1.toFixed(3)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
