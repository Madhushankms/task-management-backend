import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
  PORT: string;
  NODE_ENV: "development" | "production" | "test";
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  FRONTEND_URL: string;
}

const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const getNodeEnv = (): "development" | "production" | "test" => {
  const env = process.env.NODE_ENV;
  if (env === "production" || env === "test") {
    return env;
  }
  return "development";
};

const getEnvVariables = (): EnvConfig => {
  return {
    PORT: process.env.PORT || "5000",
    NODE_ENV: getNodeEnv(),
    DATABASE_URL: getEnvVariable("DATABASE_URL"),
    JWT_SECRET: getEnvVariable("JWT_SECRET"),
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
  };
};

export const ENV = getEnvVariables();
