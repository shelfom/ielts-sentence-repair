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
 * 集成 Vite 开发服务器（中间件模式）
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

  // 使用 Vite middleware
  app.use(vite.middlewares);

  console.log('🚀 Vite dev server initialized');
}

/**
 * 设置生产环境静态文件服务
 */
export function setupStaticServer(app: Application) {
  console.log('📦 Setting up static server...');
  console.log('📦 __dirname:', __dirname);
  console.log('📦 process.cwd():', process.cwd());
  
  // Try multiple possible dist paths for FaaS compatibility
  const possiblePaths = [
    path.resolve(__dirname, '..', 'dist'),
    path.resolve(process.cwd(), 'dist'),
    path.resolve(__dirname, 'dist'),
  ];

  let distPath: string | null = null;

  for (const p of possiblePaths) {
    console.log('📦 Checking path:', p, 'exists:', fs.existsSync(p));
    if (fs.existsSync(p)) {
      distPath = p;
      console.log('📦 Found dist folder at:', p);
      break;
    }
  }

  if (!distPath) {
    console.error('❌ dist folder not found. Tried paths:');
    possiblePaths.forEach(p => console.error('   -', p));
    console.error('❌ Current working directory:', process.cwd());
    console.error('❌ __dirname:', __dirname);
    // Don't exit - let the server start anyway and serve API only
    // The FaaS health check might pass if we at least listen on the port
    return;
  }

  serveFromPath(app, distPath);
}

function serveFromPath(app: Application, distPath: string) {
  // 1. 服务静态文件（如果存在对应文件则直接返回）
  app.use(express.static(distPath));

  // 2. SPA fallback - 所有未处理的请求返回 index.html
  // 到达这里的请求说明：
  //   - 不是 API 请求（已被前面注册的路由处理）
  //   - 不是静态文件（express.static 未找到对应文件）
  //   - 需要返回 index.html 让前端路由处理
  app.use((_req: Request, res: Response) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });

  console.log('📦 Serving static files from:', distPath);
}

/**
 * 根据环境设置 Vite
 */
export async function setupVite(app: Application) {
  if (isDev) {
    await setupViteMiddleware(app);
  } else {
    setupStaticServer(app);
  }
}
