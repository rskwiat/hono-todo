import { pinoLogger } from 'hono-pino';
import env from '@/env';

export function Logger() {
  return pinoLogger({
    pino: {
      level: env?.LOG_LEVEL || 'info',
      transport: {
        target: 'pino-pretty'
      }
    },
    http: {
      reqId: () => crypto.randomUUID(),
    }
  });
}
