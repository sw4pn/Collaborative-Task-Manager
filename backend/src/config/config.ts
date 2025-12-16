import dotenv from "dotenv";

dotenv.config();

const config = {
  URL: process.env.URL || "http://localhost",
  PORT: process.env.PORT || 8000,
  isProduction: process.env.NODE_ENV === "production",
  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET || "default_access_secret",
};

export default config;
