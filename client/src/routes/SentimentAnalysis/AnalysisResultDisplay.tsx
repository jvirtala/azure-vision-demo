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

const createStyle = (confidence: number) => {
  return {
    width: `${(confidence * 100).toFixed(0)}%`,
  };
};

const AnalysisResultDisplay: React.FC<AnalysisResultDisplayProps> = ({
  data,
}) => {
  const neutralStyle = {
    width: `${createStyle(data.confidenceScores.neutral)}%`,
  };

  const positiveStyle = {
    width: `${createStyle(data.confidenceScores.positive)}%`,
  };

  const negativeStyle = {
    width: `${createStyle(data.confidenceScores.negative)}%`,
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Analysis Result</h2>
      <p className="mb-4">
        <strong>Sentiment:</strong> {data.sentiment}
      </p>
      <h3 className="text-xl font-semibold mb-2">Detected sentiment:</h3>
      <div className="space-y-2">
        <p className="mb-4">Positive</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-green-400 h-2.5 rounded-full"
            style={positiveStyle}
          ></div>
        </div>
        <p className="mb-4">Neutral</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-yellow-400 h-2.5 rounded-full"
            style={neutralStyle}
          ></div>
        </div>
        <p className="mb-4">Negative</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-red-400 h-2.5 rounded-full"
            style={negativeStyle}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultDisplay;
