import axios from "axios";

const API_URL = `http://localhost:5001/api`;

interface SummarizeResponse {
  summary: string;
}

export const summarizeArticle = async (
  text: string,
  sentenceCount: number
): Promise<SummarizeResponse> => {
  try {
    const response = await axios.post(`${API_URL}/summarize`, {
      text,
      sentenceCount,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Failed to generate summary"
      );
    }
    throw new Error(
      "Network error. Please check your connection and try again."
    );
  }
};

export const checkServerHealth = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_URL}/health`);
    return response.data.status === "ok";
  } catch (error) {
    console.error("Health check failed:", error);
    return false;
  }
};
