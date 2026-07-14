// ABOUTME: Express server with Vite integration
// ABOUTME: Handles API routes and serves frontend in dev/prod modes

import { createServer, type Server } from 'http';
import express from 'express';
import router from './routes/index';
import { setupVite } from './vite';

const isDev = process.env.COZE_PROJECT_ENV !== 'PROD';
const port = parseInt(process.env.PORT || '5000', 10);
const hostname = '0.0.0.0';
const app = express();
const server = createServer(app);

// Request logging (dev only)
if (isDev) {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const ms = Date.now() - start;
      console.log(`${req.method} ${req.url} - ${ms}ms`);
    });
    next();
  });
}

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use(router);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', env: isDev ? 'DEV' : 'PROD', timestamp: new Date().toISOString() });
});

// Listen FIRST so FaaS health checks pass immediately
server.listen(port, hostname, () => {
  console.log(`\n✨ Server running at http://${hostname}:${port}`);
  console.log(`📝 Environment: ${isDev ? 'development' : 'production'}\n`);
});

// Set up Vite/static files AFTER listening (non-blocking)
setupVite(app)
  .then(() => {
    console.log('✅ Vite/static setup complete');
  })
  .catch((err) => {
    console.error('❌ Vite/static setup failed:', err);
    // Register a fallback handler if setup fails
    app.use((_req, res) => {
      res.status(503).send('Service temporarily unavailable');
    });
  });

// Error handler - MUST have 4 parameters to be recognized by Express
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Server error:', err);
  const status = 'status' in err ? (err as { status?: number }).status ?? 500 : 500;
  res.status(status).json({
    error: err.message || 'Internal server error',
  });
});

server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});
