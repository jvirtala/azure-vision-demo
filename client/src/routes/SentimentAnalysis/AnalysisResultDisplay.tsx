import React from "react";

export type AnalysisResult = {
  sentiment: string;
  confidenceScores: {
    positive: number;
    neutral: number;
    negative: number;
  };
};

type AnalysisResultDisplayProps = {
  data: AnalysisResult;
};

const AnalysisResultDisplay: React.FC<AnalysisResultDisplayProps> = ({
  data,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Analysis Result</h2>
      <p className="mb-4">
        <strong>Sentiment:</strong> {data.sentiment}
      </p>
      <h3 className="text-xl font-semibold mb-2">Detected sentiment:</h3>
      <div className="space-y-2">
        <p className={"bg-green-400"}>
          Positive: {(data.confidenceScores.positive * 100).toFixed(2)}%
        </p>
        <p className={"bg-yellow-400"}>
          Neutral: {(data.confidenceScores.neutral * 100).toFixed(2)}%
        </p>
        <p className={"bg-red-400"}>
          Negative: {(data.confidenceScores.negative * 100).toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default AnalysisResultDisplay;
