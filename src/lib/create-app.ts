import { OpenAPIHono } from '@hono/zod-openapi';

import type { AppBindings } from './types';
import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNPROCESSABLE_ENTITY
} from '@/constants/status-codes';
import { Logger } from '@/middlewares/logger';

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook: (result, c) => {
      if (!result.success) {
        return c.json({
          succeess: result.success,
          error: result.error
        }, UNPROCESSABLE_ENTITY)
      }
    },
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(Logger());

  app.notFound((c) => {
    return c.json({
      message: `Not found - ${c.req.path}`
    }, NOT_FOUND);
  });

  app.onError((err, c) => {
    return c.json({
      message: err.message
    }, INTERNAL_SERVER_ERROR);
  });

  return app;
}
