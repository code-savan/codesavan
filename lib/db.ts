/**
 * Mock database connection
 * This is a temporary replacement to allow builds without MongoDB configuration
 */

// Mock database connection function
export default async function connectDB() {
  console.info('Using mock database connection');
  return {};
}
