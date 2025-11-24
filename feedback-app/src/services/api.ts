import { apiClient } from "@/config/apiClient";

// Topic types
export interface Topic {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface CreateTopicResponse {
  id: string;
  name: string;
  description: string;
  message: string;
}

export interface CreateTopicRequest {
  name: string;
  description?: string;
}

// Feedback types
export interface Feedback {
  id: string;
  topic_id: string;
  created_at: string;
  sentiment_score: number;
  sentiment: string;
  analyzed_at: string;
  comments?: string;
}

export interface GetFeedbackResponse {
  feedback: Feedback[];
  count: number;
  topic_id: string;
}

export interface SentimentDistribution {
  POSITIVE: number;
  NEUTRAL: number;
  NEGATIVE: number;
  MIXED: number;
}

export interface GetSentimentResponse {
  topic_id: string;
  feedback_count: string;
  average_sentiment_score: number;
  sentiment_distribution: SentimentDistribution;
  feedback_history: Feedback[];
}

export interface GetFeedbackResponse {
  feedback: Feedback[];
  count: number;
  topic_id: string;
}

export interface CreateFeedbackRequest {
  topic_id: string;
  comments: string;
}

// Topic API
export const topicApi = {
  // Get all topics
  getAll: async () => {
    const response = await apiClient.get<Topic[]>("/topics/");
    return response.data;
  },

  // Get single topic by ID
  getById: async (id: string) => {
    const response = await apiClient.get<Topic>(`/topics/${id}`);
    return response.data;
  },

  // Create new topic
  create: async (data: CreateTopicRequest) => {
    const response = await apiClient.post<CreateTopicResponse>(
      "/topics/",
      data
    );
    return response.data;
  },

  // Delete topic
  delete: async (id: string) => {
    await apiClient.delete(`/topics/${id}`);
  },
};

// Feedback API
export const feedbackApi = {
  // Get all feedback for a topic
  getByTopic: async (topicId: string) => {
    const response = await apiClient.get<GetFeedbackResponse>(
      `/topics/${topicId}/feedback`
    );
    return response.data;
  },

  // Submit feedback
  create: async (data: CreateFeedbackRequest) => {
    const response = await apiClient.post<Feedback>("/feedback", data);
    return response.data;
  },

  // Get feedback analysis
  getSentiment: async (topicId: string) => {
    const response = await apiClient.get<GetSentimentResponse>(
      `/topics/${topicId}/sentiment`
    );
    return response.data;
  },
};
