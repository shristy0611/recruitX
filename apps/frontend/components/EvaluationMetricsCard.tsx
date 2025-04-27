import React from 'react';

export interface Metrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  support: number;
}

export const EvaluationMetricsCard: React.FC<{ metrics: Metrics }> = ({ metrics }) => (
  <div className="border rounded-lg p-4 bg-white shadow-md">
    <h2 className="text-lg font-semibold mb-2">Evaluation Metrics</h2>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <span className="font-medium">Accuracy:</span> {metrics.accuracy.toFixed(3)}
      </div>
      <div>
        <span className="font-medium">Precision:</span> {metrics.precision.toFixed(3)}
      </div>
      <div>
        <span className="font-medium">Recall:</span> {metrics.recall.toFixed(3)}
      </div>
      <div>
        <span className="font-medium">F1 Score:</span> {metrics.f1.toFixed(3)}
      </div>
      <div>
        <span className="font-medium">Support:</span> {metrics.support}
      </div>
    </div>
  </div>
);
