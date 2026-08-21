'use strict';
import 'reflect-metadata';

import dotenv from 'dotenv';
import { sequelize } from './config/database_pg';
import logger from './config/logger';
import serverGraphql from './graphql';
import cors from 'cors';
import { expressMiddleware } from '@as-integrations/express5';

// Muat variabel lingkungan dari file .env
dotenv.config();

const PORT = process.env.PORT || 3000;

import express, { NextFunction, Request, Response } from 'express';
import loadRoutes from './routes';
import path from 'path';

const app = express();

// Middleware untuk mengurai body JSON dari request
app.use(express.json());
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && (err as any).status === 400 && "body" in err) {
    return res.status(400).json({
      status: "error",
      message: "Invalid JSON payload",
    });
  }
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});
app.use("/public", express.static(path.resolve(__dirname, "../public")));

loadRoutes(app);

// Mulai server
app.listen(PORT, async () => {
  // Run Graphql
  await serverGraphql.start();
  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(serverGraphql, {
      context: async ({ req }) => ({ req }),
    }),
  );

  app.use((req, res) => {
    res.status(404).json({
      status: 'error',
      message: `Route Not Found`,
    });
  });

  // connect db
  sequelize.sync({ alter: false,  force: false })
    .then(() => logger.info("Database connected & synced!"))
    .catch((err) => logger.error({ message: "Database error", error: err }));

  logger.info(`Server is running at PORT: ${PORT}`);
});

export default app;
