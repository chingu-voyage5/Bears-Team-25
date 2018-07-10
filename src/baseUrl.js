// Dynamically set base url depending on "Development" vs "Production"
 const baseURL =
  process.env.NODE_ENV.trim() === "development"
    ? "http://localhost:3001/api/"
    : "/api/";

export default baseURL;