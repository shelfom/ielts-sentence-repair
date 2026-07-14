// ABOUTME: Vite integration for Express server
// ABOUTME: Handles dev middleware and production static file serving

import type { Application, Request, Response, NextFunction } from 'express';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import viteConfig from '../vite.config';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.COZE_PROJECT_ENV !== 'PROD';

/**
 * Set up Vite dev middleware
 */
export async function setupViteMiddleware(app: Application) {
  const vite = await createViteServer({
    ...viteConfig,
    server: {
      ...viteConfig.server,
      middlewareMode: true,
    },
    appType: 'spa',
  });

  app.use(vite.middlewares);
  console.log('🚀 Vite dev server initialized');
}

/**
 * Set up production static file server
 * Build output is configured to go to server/public (see vite.config.ts)
 */
export function setupStaticServer(app: Application): boolean {
  // The build output goes to server/public (configured in vite.config.ts)
  // Use __dirname to resolve relative to this file's location (server/)
  const publicPath = path.resolve(__dirname, 'public');

  if (!fs.existsSync(publicPath)) {
    console.error(`❌ Static build folder not found at ${publicPath}`);
    console.error('   Run "pnpm vite build" to create the build output');
    return false;
  }

  // Verify index.html exists
  const indexPath = path.join(publicPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error(`❌ index.html not found at ${indexPath}`);
    return false;
  }

  console.log(`📦 Serving static files from ${publicPath}`);

  // Serve static files
  app.use(express.static(publicPath));

  // SPA fallback - return index.html for all non-API requests
  app.use((_req: Request, res: Response) => {
    res.sendFile(indexPath);
  });

  return true;
}

/**
 * Set up Vite based on environment
 */
export async function setupVite(app: Application): Promise<boolean> {
  if (isDev) {
    await setupViteMiddleware(app);
    return true;
  } else {
    return setupStaticServer(app);
  }
}
