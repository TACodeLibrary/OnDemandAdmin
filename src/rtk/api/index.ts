import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Custom base query with header preparation
const baseQueryWithReAuth = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_BASE_URL, // Replace with your actual base URL
  prepareHeaders: (headers: Headers) => {
    // Retrieve token and client secret from storage/environment
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const clientSecret = import.meta.env.VITE_APP_CLIENT_SECRET;

    // Debugging environment variables and tokens
    if (import.meta.env.MODE === 'development') {
      console.log('Client Secret:', clientSecret);
      console.log('Auth Token:', token);
    }

    // Set headers conditionally
    if (clientSecret) {
      headers.set('client-secret', clientSecret);
    }
    if (token) {
      headers.set('Authorization', `${token}`);
    }

    return headers;
  },
});

// Create an API instance with the custom base query
export const adminAPI = createApi({
  reducerPath: 'adminAPI',
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}), // Define endpoints in your API
});

export default adminAPI;
