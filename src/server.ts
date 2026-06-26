import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { ENV } from "./config/env";
import { errorHandler } from "./middleware/error.middleware";
import { swaggerSpec } from "./config/swagger";
import routes from "./routes";

const app: Application = express();

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: false,
  }),
);

app.use(morgan(ENV.NODE_ENV === "production" ? "combined" : "dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", routes);

app.use(errorHandler);

export default app;
