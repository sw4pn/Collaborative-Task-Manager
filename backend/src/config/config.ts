import dotenv from "dotenv";

dotenv.config();

const config = {
  URL: process.env.URL || "http://localhost",
  PORT: process.env.PORT || 8000,
  isProduction: process.env.NODE_ENV === "production",
  DB_URI: process.env.DB_URI || "",
};

export default config;
