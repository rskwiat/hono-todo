
import { createRoute } from '@hono/zod-openapi';
import { z } from 'zod';
import { OK } from '@/constants/status-codes';

const tags = ['tasks'];

const listSchema = z.object({
  name: z.string().openapi({
    example: 'task name',
  }),
  completed: z.boolean().openapi({
    example: false,
  }),
});

export const listTasks = createRoute({
  tags,
  method: 'get',
  path: '/tasks',
  responses: {
    [OK]: {
      content: {
        'application/json': {
          schema: z.array(listSchema),
        },
      },
      description: 'List all taks',
    },
  },
});

export type ListTasksRoute = typeof listTasks;
