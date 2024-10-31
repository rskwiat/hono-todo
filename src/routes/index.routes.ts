
import { createRoute } from '@hono/zod-openapi';
import { z } from 'zod';
import { OK } from '@/constants/status-codes';

const tags = ['index'];

const healthcheckSchema = z.object({
  message: z.string().openapi({
    example: 'API is up and running'
  })
});

export const healthcheck = createRoute({
  tags,
  method: 'get',
  path: '/healthcheck',
  responses: {
    [OK]: {
      content: {
        'application/json': {
          schema: healthcheckSchema,
        },
      },
      description: 'Healthcheck -- app is running',
    },
  },
});

export type HealthCheckRoute = typeof healthcheck;
