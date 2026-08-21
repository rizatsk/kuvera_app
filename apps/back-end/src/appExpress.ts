import express, { NextFunction, Request, Response } from 'express';
import loadRoutes from './routes';
import path from 'path';

const appExpress = express();

// Middleware untuk mengurai body JSON dari request
appExpress.use(express.json());
appExpress.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
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
appExpress.use("/public", express.static(path.resolve(__dirname, "../public")));

loadRoutes(appExpress);

export default appExpress;