// API Configuration
// This file centralizes API URL configuration for different environments

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Export API base URL
export const getApiUrl = () => {
    return API_BASE_URL;
};

// Helper function to construct full API URLs
export const getFullApiUrl = (endpoint) => {
    // Remove leading slash if present to avoid double slashes
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    
    // In development, proxy handles the /api prefix
    // In production, use the full backend URL
    if (import.meta.env.DEV) {
        return `/${cleanEndpoint}`;
    }
    
    return `${API_BASE_URL}/${cleanEndpoint}`;
};

export default {
    getApiUrl,
    getFullApiUrl
};
