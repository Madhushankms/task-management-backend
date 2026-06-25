import dotenv from "dotenv";
dotenv.config();

import app from "./server";
import prisma from "./config/database";

import { ENV } from "./config/env";

const startServer = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
      console.log(`Environment: ${ENV.NODE_ENV}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

startServer();
