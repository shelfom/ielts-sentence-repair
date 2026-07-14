// ABOUTME: Express server with Vite integration
// ABOUTME: Handles API routes and serves frontend in dev/prod modes

import { createServer } from 'http';
import express from 'express';
import router from './routes/index';
import { setupVite } from './vite';

const isDev = process.env.COZE_PROJECT_ENV !== 'PROD';
const port = parseInt(process.env.PORT || '5000', 10);
const hostname = '0.0.0.0';

console.log(`[server] Starting in ${isDev ? 'development' : 'production'} mode`);
console.log(`[server] Port: ${port}, Hostname: ${hostname}`);

const app = express();
const server = createServer(app);

// 请求日志（仅开发环境）
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

// 添加请求体解析
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 注册 API 路由
app.use(router);

// 全局错误处理
app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error('Server error:', err);
  const status = 'status' in err ? (err as { status?: number }).status ?? 500 : 500;
  res.status(status).json({
    error: err.message || 'Internal server error',
  });
});

server.once('error', err => {
  console.error('Server error:', err);
  process.exit(1);
});

// 先启动服务器监听，再异步设置静态文件服务
server.listen(port, hostname, () => {
  console.log(`\n✨ Server running at http://${hostname}:${port}`);
  console.log(`📝 Environment: ${isDev ? 'development' : 'production'}\n`);
  
  // 异步设置 Vite/静态文件服务（不阻塞服务器启动）
  setupVite(app).then(() => {
    console.log('✅ Vite/static server setup complete');
  }).catch(err => {
    console.error('❌ Failed to setup Vite/static server:', err);
  });
});
