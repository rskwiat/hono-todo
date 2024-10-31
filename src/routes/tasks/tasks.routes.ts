
import { createRoute } from '@hono/zod-openapi';
import { z } from 'zod';
import { NOT_FOUND, OK, UNPROCESSABLE_ENTITY } from '@/constants/status-codes';
import { createTasksSchema } from '@/db/schema';
import createErrorSchema from '@/middlewares/open-api/create-error-schema';

const tags = ['tasks'];

const ListSchema = z.object({
  name: z.string().openapi({
    example: 'task name',
  }),
  completed: z.boolean().openapi({
    example: false,
  }),
});

const IdParamsSchema = z.object({
  id: z.coerce.number().openapi({
    param: {
      name: "id",
      in: "path",
    },
    required: ["id"],
    example: 42,
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
          schema: z.array(ListSchema),
        },
      },
      description: 'List all tasks',
    },
  },
});

export const getSingleTask = createRoute({
  tags,
  method: 'get',
  path: '/tasks/:id',
  request: {
    params: IdParamsSchema
  },
  responses: {
    [OK]: {
      content: {
        'application/json': {
          schema: createTasksSchema
        },
      },
      description: 'The Requested task'
    },
    [NOT_FOUND]: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string()
          }).openapi({
            example: {
              message: 'Not Found'
            }
          })
        },
      },
      description: 'Not Found'
    },
    [UNPROCESSABLE_ENTITY]: {
      content: {
        'application/json': {
          schema: createErrorSchema(IdParamsSchema),
        }
      },
      description: 'Invalid Id Error'
    }
  }
});


export type ListTasksRoute = typeof listTasks;
export type GetSingleTaskRoute = typeof getSingleTask;
