import {
  TextAnalyticsClient,
  AzureKeyCredential,
} from "@azure/ai-text-analytics";

const createClient = (): TextAnalyticsClient => {
  const key = process.env.AZURE_COMPUTER_VISION_KEY;
  const endpoint = process.env.AZURE_COMPUTER_VISION_ENDPOINT;

  if (!key || !endpoint) {
    throw new Error(
      "Azure Text Analytics credentials are not set in environment variables."
    );
  }

  return new TextAnalyticsClient(endpoint, new AzureKeyCredential(key));
};

export const analyzeSentiment = async (
  text: string
): Promise<SentimentResult> => {
  const client = createClient();

  try {
    const results = await client.analyzeSentiment([text]);

    if (results[0].error) {
      throw new Error(`Error analyzing sentiment: ${results[0].error}`);
    }
    if (!results[0].sentiment) {
      throw new Error("No sentiment result returned");
    }

    return {
      sentiment: results[0].sentiment,
      confidenceScores: results[0].confidenceScores,
    };
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    throw new Error("Failed to analyze sentiment");
  }
};

export interface SentimentResult {
  sentiment: string;
  confidenceScores: {
    positive: number;
    neutral: number;
    negative: number;
  };
}
