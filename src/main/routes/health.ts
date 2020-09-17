import { Application, Request } from 'express';
import config from 'config';
const os = require('os');

const healthcheck = require('@hmcts/nodejs-healthcheck');

export default function(app: Application): void {
  const healthOptions = (): {} => {
    return {
      callback: (err: Error, res: Request): Promise<void> => {
        if (err) {
          console.log('Health check failed on fact-api:');
        }
        return res.body.status == 'good' ? healthcheck.up() : healthcheck.down();
      },
      timeout: config.get('health.timeout'),
      deadline: config.get('health.deadline'),
    };
  };

  const healthCheckConfig = {
    checks: {
      'fact-api': healthcheck.web(`${config.get('services.api.url')}/health`, healthOptions),
    },
    buildInfo: {
      name: config.get('services.frontend.name'),
      host: os.hostname(),
      uptime: process.uptime(),
    },
  };

  healthcheck.addTo(app, healthCheckConfig);
}
