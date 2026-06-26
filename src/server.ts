import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middleware/error.middleware";
import routes from "./routes";
import { swaggerSpec } from "./config/swagger";
import swaggerUi from "swagger-ui-express";

const app: Application = express();

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

app.use(
  cors({
    // origin: process.env.FRONTEND_URL || "http://localhost:5173",
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  }),
);

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", routes);
app.use(errorHandler);

export default app;
