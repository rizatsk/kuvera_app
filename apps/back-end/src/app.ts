'use strict';
import 'reflect-metadata';

import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { expressMiddleware } from '@as-integrations/express5';

import { sequelize } from './config/database_pg';
import logger from './config/logger';
import serverGraphql from './graphql';
import loadRoutes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Core Middlewares
app.use(express.json());

// Handle Error JSON Invalid
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && (err as any).status === 400 && "body" in err) {
    return res.status(400).json({
      status: "error",
      message: "Invalid JSON payload",
    });
  }
  next(err);
});

// Static Public Folder
app.use("/public", express.static(path.resolve(__dirname, "../public")));

// 2. Load REST API Routes
loadRoutes(app);

// 3. Inisialisasi Async (GraphQL & DB) untuk Serverless / Vercel
let isInitialized = false;

async function initializeApp() {
  if (isInitialized) return;

  // Start GraphQL Server
  await serverGraphql.start();

  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(serverGraphql, {
      context: async ({ req }) => ({ req }),
    })
  );

  // 404 Route Handler
  app.use((req, res) => {
    res.status(404).json({
      status: 'error',
      message: 'Route Not Found',
    });
  });

  // Database Connection
  try {
    await sequelize.sync({ alter: false, force: false });
    logger.info("Database connected & synced!");
  } catch (err) {
    logger.error({ message: "Database error", error: err });
  }

  isInitialized = true;
}

initializeApp().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server is running locally at PORT: ${PORT}`);
  });
});

// 5. Export Express App untuk Vercel Serverless Function
export default app;