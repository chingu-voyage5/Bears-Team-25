const baseURL =
  process.env.NODE_ENV.trim() === "development" ? "http://localhost:3000/" : process.env.baseURL;

module.exports = baseURL;
