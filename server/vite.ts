// ABOUTME: Vite integration for Express server
// ABOUTME: Handles dev middleware and production static file serving

import type { Application, Request, Response } from 'express';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import viteConfig from '../vite.config';

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
 */
export function setupStaticServer(app: Application) {
  // Try multiple possible dist paths for FaaS compatibility
  const possiblePaths = [
    path.resolve(process.cwd(), 'dist'),
    path.resolve(__dirname, '..', 'dist'),
    path.resolve(__dirname, 'dist'),
  ];

  let distPath: string | null = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      distPath = p;
      break;
    }
  }

  if (!distPath) {
    console.warn('⚠️ dist folder not found at any of:', possiblePaths);
    console.warn('⚠️ Static files will not be served, but API endpoints will work');
    return;
  }

  console.log(`📦 Serving static files from ${distPath}`);

  // Serve static files
  app.use(express.static(distPath));

  // SPA fallback - return index.html for all non-API requests
  app.use((_req: Request, res: Response) => {
    res.sendFile(path.join(distPath!, 'index.html'));
  });
}

/**
 * Set up Vite based on environment
 */
export async function setupVite(app: Application) {
  if (isDev) {
    await setupViteMiddleware(app);
  } else {
    setupStaticServer(app);
  }
}
