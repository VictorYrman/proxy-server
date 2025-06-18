import express, { json } from "express";
import dotenv from "dotenv";
import * as Sentry from "@sentry/node";
import { setupMeteorsRoutes } from "./delivery/routes/meteors.js";

dotenv.config();

const start = () => {
  const server = express();
  Sentry.init({
    dsn: `${process.env.SENTRY_URL}`,
    sendDefaultPii: true,
  });
  const PORT = process.env.PORT || 4000;

  server.use(json());

  setupMeteorsRoutes(server);

  Sentry.setupExpressErrorHandler(server);

  try {
    server.listen(PORT, (error) => {
      if (error) console.error(error);
      console.info(`Сервер запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
