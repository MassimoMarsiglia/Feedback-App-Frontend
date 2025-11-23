import { apiClient } from "@/config/apiClient";

// Topic types
export interface Topic {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface CreateTopicRequest {
  name: string;
  description?: string;
}

// Feedback types
export interface Feedback {
  id: string;
  topicId: string;
  rating: number;
  feedback: string;
  name?: string;
  email?: string;
  createdAt: string;
}

export interface SubmitFeedbackRequest {
  topicId: string;
  rating: number;
  feedback: string;
  name?: string;
  email?: string;
}

// Topic API
export const topicApi = {
  // Get all topics
  getAll: async () => {
    const response = await apiClient.get<Topic[]>("/topic");
    return response.data;
  },

  // Get single topic by ID
  getById: async (id: string) => {
    const response = await apiClient.get<Topic>(`/topic/${id}`);
    return response.data;
  },

  // Create new topic
  create: async (data: CreateTopicRequest) => {
    const response = await apiClient.post<Topic>("/topic", data);
    return response.data;
  },

  // Delete topic
  delete: async (id: string) => {
    await apiClient.delete(`/topic/${id}`);
  },
};

// Feedback API
export const feedbackApi = {
  // Get all feedback for a topic
  getByTopic: async (topicId: string) => {
    const response = await apiClient.get<Feedback[]>(
      `/topic/${topicId}/feedback`
    );
    return response.data;
  },

  // Submit feedback
  submit: async (data: SubmitFeedbackRequest) => {
    const response = await apiClient.post<Feedback>("/feedback", data);
    return response.data;
  },

  // Get feedback analysis
  getAnalysis: async (topicId: string) => {
    const response = await apiClient.get(`/topic/${topicId}/analysis`);
    return response.data;
  },
};
