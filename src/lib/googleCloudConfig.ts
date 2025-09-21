// Google Cloud configuration with environment variables
export const googleCloudConfig = {
  projectId: (import.meta as any).env.VITE_GOOGLE_CLOUD_PROJECT_ID,
  location: (import.meta as any).env.VITE_GOOGLE_CLOUD_LOCATION,
  clientEmail: (import.meta as any).env.VITE_GOOGLE_CLOUD_CLIENT_EMAIL,
  privateKeyId: (import.meta as any).env.VITE_GOOGLE_CLOUD_PRIVATE_KEY_ID,
  // Note: In a real production app, never expose private keys in frontend code
};

// Gemini API configuration
export const geminiConfig = {
  apiKey: (import.meta as any).env.VITE_GEMINI_API_KEY,
};
  // This is just for demonstration purposes
  // The actual API calls should be made through a secure backend


// Helper function to get credentials for backend API calls
export const getGoogleCloudCredentials = () => {
  return {
    projectId: googleCloudConfig.projectId,
    clientEmail: googleCloudConfig.clientEmail,
  };
};