import React from "react";
import ObjectResult from "./ObjectResult";

export interface AnalysisObject {
  object: string;
  confidence: number;
}

export interface AnalysisResult {
  message: string;
  size: number;
  objects: Array<AnalysisObject>;
}

export interface AnalysisResultDisplayProps {
  result: AnalysisResult;
}

const bytesToHumanReadable = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} bytes`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
};

const AnalysisResultDisplay: React.FC<AnalysisResultDisplayProps> = ({
  result,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Analysis Result</h2>
      <p className="mb-4">
        <strong>Size:</strong> {bytesToHumanReadable(result.size)}
      </p>
      <h3 className="text-xl font-semibold mb-2 from-1">Detected Objects:</h3>
      <ul className="space-y-2">
        {result.objects.map((obj, index) => (
          <ObjectResult obj={obj} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default AnalysisResultDisplay;
