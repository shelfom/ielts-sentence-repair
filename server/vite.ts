// ABOUTME: Vite integration for development and production builds
// ABOUTME: Handles HMR in dev mode and serves static files in production

import path from 'path';
import fs from 'fs';
import express from 'express';
import type { ViteDevServer } from 'vite';

let viteServer: ViteDevServer | undefined;

export async function setupVite(app: express.Application): Promise<void> {
  const isDev = process.env.COZE_PROJECT_ENV !== 'PROD';

  if (isDev) {
    // 开发模式：使用 Vite 中间件
    const { createServer: createViteServer } = await import('vite');
    viteServer = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: {
          port: 6000,
          path: '/hot/vite-hmr',
        },
      },
      appType: 'spa',
    });
    app.use(viteServer.middlewares);
  } else {
    // 生产模式：直接设置静态文件服务
    setupStaticServer(app);
  }
}

function setupStaticServer(app: express.Application): void {
  // 尝试多个可能的 dist 路径
  const possiblePaths = [
    path.resolve(__dirname, '..', 'dist'),
    path.resolve(process.cwd(), 'dist'),
    path.resolve(__dirname, 'dist'),
  ];

  let distPath: string | null = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      distPath = p;
      break;
    }
  }

  if (distPath) {
    console.log(`📦 Serving static files from: ${distPath}`);
    app.use(express.static(distPath));
    // SPA fallback - 所有未匹配的路由都返回 index.html
    app.get('*', (req, res, next) => {
      // 跳过 API 路由
      if (req.path.startsWith('/api/')) {
        return next();
      }
      res.sendFile(path.join(distPath!, 'index.html'));
    });
  } else {
    console.log('⚠️ No dist folder found - static files not served');
    console.log(`  Tried: ${possiblePaths.join(', ')}`);
    // 即使没有 dist 文件夹，也设置一个基本的 SPA fallback
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/')) {
        return next();
      }
      res.status(404).send('Build not found. Please run build first.');
    });
  }
}
