import React from 'react';

export interface ConfusionMatrixProps {
  tp: number;
  tn: number;
  fp: number;
  fn: number;
}

export const ConfusionMatrixCard: React.FC<{ stats: ConfusionMatrixProps }> = ({ stats }) => (
  <div className="border rounded-lg p-4 bg-white shadow-md">
    <h2 className="text-lg font-semibold mb-2">Confusion Matrix</h2>
    <div className="grid grid-cols-3 gap-2 text-center">
      <div></div>
      <div className="font-medium">Predicted Positive</div>
      <div className="font-medium">Predicted Negative</div>
      <div className="font-medium">Actual Positive</div>
      <div>{stats.tp}</div>
      <div>{stats.fn}</div>
      <div className="font-medium">Actual Negative</div>
      <div>{stats.fp}</div>
      <div>{stats.tn}</div>
    </div>
  </div>
);
