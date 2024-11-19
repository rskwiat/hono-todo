import { OpenAPIHono } from '@hono/zod-openapi';

import type { AppBindings, AppOpenAPI } from './types';

import * as HttpStatusCodes from '@/constants/status-codes';
import * as HttpStatusMessages from '@/constants/status-messages';

import { Logger } from '@/middlewares/logger';

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook: (result, c) => {
      if (!result.success) {
        return c.json({
          succeess: result.success,
          error: result.error
        }, HttpStatusCodes.UNPROCESSABLE_ENTITY)
      }
    },
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(Logger());

  app.notFound((c) => {
    return c.json({
      message: `${HttpStatusMessages.NOT_FOUND} - ${c.req.path}`
    }, HttpStatusCodes.NOT_FOUND);
  });

  app.onError((err, c) => {
    return c.json({
      message: err.message
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  });

  return app;
}

export function createTestApp<R extends AppOpenAPI>(router: R) {
  return createApp().route('/', router);
};
