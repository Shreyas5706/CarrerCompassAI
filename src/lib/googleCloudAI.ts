import axios from 'axios';
import { googleCloudConfig, geminiConfig } from './googleCloudConfig';

// This is a frontend service that communicates with Gemini API
export const chatbotService = {
  // Send message to Gemini API and get response
  sendMessage: async (message: string) => {
    try {
      console.log('Using Gemini API for generating response');

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiConfig.apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `You are a career advisor assistant. Provide helpful career advice for the following query: ${message}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024
          }
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const geminiResponse = response.data.candidates[0].content.parts[0].text;
      return { response: geminiResponse };
    } catch (error: any) {
      console.error("Gemini API Error (full):", JSON.stringify(error.response?.data, null, 2));
      return { response: "Gemini API failed" };
    }


  }
};




export const careerRecommendationService = {
  // Get career recommendations based on user profile
  getRecommendations: async (userId: string) => {
    try {
      // This would call your backend API which would use Google Cloud AI
      const response = await axios.get(`/api/recommendations/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting career recommendations:', error);
      throw error;
    }
  }
};

export const skillAnalysisService = {
  // Analyze user skills from resume or input
  analyzeSkills: async (userId: string, data: any) => {
    try {
      // This would call your backend API which would use Google Cloud Natural Language API
      const response = await axios.post(`/api/skills/analyze/${userId}`, data);
      return response.data;
    } catch (error) {
      console.error('Error analyzing skills:', error);
      throw error;
    }
  }
};