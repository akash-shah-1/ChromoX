import axios from "axios";

// const Base_URL = 'http://localhost:8080'; // local link
const Base_URL = 'https://chromo-x-test.vercel.app' // Live link
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWMxZTcyYmYzZTliY2U0ZDgzMmExYWQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MDkwMzM0MTAsImV4cCI6MTcwOTAzNzAxMH0.buXZjgnMGIB85pcNoW8iExtcOG6KHvqV1cdzCVowj3Y'

// Function to create an axios instance with a base URL
function createAxiosInstance(baseURL, headers = {}) {
  return axios.create({
    baseURL,
    headers,
  });
}

// Public requests instance (no token required)
export const publicRequest = createAxiosInstance(Base_URL);

// User requests instance (requires token)
export const userRequest = createAxiosInstance(Base_URL, {
  Authorization: `Bearer ${token}`, // Replace with your token management logic
});

// Example usage:
publicRequest.get('/product') // Public resource (no authentication)
// userRequest.get('/profile')    // User-specific resource (requires authentication)
