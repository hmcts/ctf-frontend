import { Application } from 'express';
import config from 'config';
import { createProxyMiddleware } from 'http-proxy-middleware';

export class ProxyMiddleware {

  enableFor(app: Application): void {
    app.use('*.json', createProxyMiddleware({ changeOrigin: true, target: config.get('services.api.url') }));
  }

}
