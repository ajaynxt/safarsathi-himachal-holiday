import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from './config/environment';
import { rateLimiter } from './middleware/rateLimiter';
import { AppError } from './utils/errors';

import authRoutes from './routes/authRoutes';
import workspaceRoutes from './routes/workspaceRoutes';
import instagramRoutes from './routes/instagramRoutes';
import connectorRoutes from './routes/connectorRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import reportRoutes from './routes/reportRoutes';
import adminRoutes from './routes/adminRoutes';

export const app = express();

// Security headers with Helmet (strict OWASP compliance)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'https:'],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// Strict CORS Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow internal server-to-server or configured domains
      if (!origin || config.corsOrigins.includes(origin) || config.nodeEnv === 'development') {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS policy'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-workspace-id', 'X-Firebase-AppCheck'],
  })
);

// JSON body parsing with strict payload size limit (prevents DoS via payload flooding)
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Global rate limiting (120 req / minute per IP/tenant bucket)
app.use(rateLimiter(120, 60000, 'global'));

// Health check endpoint (for Cloud Run load balancers)
app.get(['/healthz', '/api/health'], (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    service: 'AJAYNXT Marketing Analytics API',
    region: config.gcpRegion,
    timestamp: new Date().toISOString(),
  });
});

// Mount Modular Routes
app.use('/api/auth', authRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/instagram', instagramRoutes);
app.use('/api/connectors', connectorRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/admin', adminRoutes);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'NOT_FOUND',
    message: `Endpoint ${req.method} ${req.path} does not exist.`,
  });
});

// Centralized Secure Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.errorCode,
      message: err.message,
      details: err.details,
    });
    return;
  }

  // Never leak internal stack traces or database errors in production
  const isDev = config.nodeEnv === 'development';
  res.status(err.status || 500).json({
    error: 'INTERNAL_SERVER_ERROR',
    message: isDev ? err.message : 'An unexpected server error occurred.',
  });
});

export default app;
