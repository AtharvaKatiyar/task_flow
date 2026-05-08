import express from "express";
import cors from "cors";
import helmet from "helmet";
import {
  swaggerUi,
  swaggerSpec,
} from "./docs/swagger.js";
import rateLimit from "express-rate-limit";

import routes from "./routes/index.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use("/api/v1", routes);

app.use(errorMiddleware);

export default app;