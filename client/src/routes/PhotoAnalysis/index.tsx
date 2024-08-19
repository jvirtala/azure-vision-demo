import axios from "axios";
import React, { useState } from "react";
import AnalysisResultDisplay from "./AnalysisResultDisplay";
import type { AnalysisResult } from "./AnalysisResultDisplay";

const PhotoAnalysis: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post<AnalysisResult>(
        "/api/photoanalysis",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Error uploading file. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-4">
      <h1 className="text-2xl font-bold">Photo Analysis</h1>
      <form
        className="pt-8 flex flex-col items-start gap-4"
        onSubmit={handleSubmit}
      >
        <input
          className="flex-auto"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
        />
        <button
          type="submit"
          className="flex-auto bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Upload and Analyze
        </button>
      </form>
      {result && <AnalysisResultDisplay result={result} />}
      {error && <div>{error}</div>}
    </div>
  );
};
export default PhotoAnalysis;
