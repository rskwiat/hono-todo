import { pinoLogger } from 'hono-pino';
import env from '@/env';

export function Logger() {
  if (env.NODE_ENV === 'production') {
    return pinoLogger({
      pino: {
        level: 'debug'
      },
      http: {
        reqId: () => crypto.randomUUID(),
      }
    })
  }

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
