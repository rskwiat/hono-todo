
import { createRoute } from '@hono/zod-openapi';
import { z } from 'zod';
import { NOT_FOUND, OK, UNPROCESSABLE_ENTITY, NO_CONTENT } from '@/constants/status-codes';
import { createTasksSchema, insertTasksSchema, patchTasksSchema } from '@/db/schema';
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

const notFoundSchema = z.object({
  message: z.string()
}).openapi({
  example: {
    message: 'Not Found'
  }
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

export const createTask = createRoute({
  tags,
  method: 'post',
  path: '/tasks',
  request: {
    body: {
      content: {
        "application/json": {
          schema: ListSchema
        },
      },
      required: true,
    },
  },
  responses: {
    [OK]: {
      content: {
        'application/json': {
          schema: insertTasksSchema
        }
      },
      description: 'Inserted Task'
    },
    [UNPROCESSABLE_ENTITY]: {
      content: {
        'application/json': {
          schema: createErrorSchema(insertTasksSchema),
        }
      },
      description: 'Validation Issues'
    }
  },
})

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
          schema: notFoundSchema
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

export const updateTask = createRoute({
  tags,
  method: 'patch',
  path: '/tasks/:id',
  request: {
    params: IdParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: patchTasksSchema
        }
      }
    }
  },
  responses: {
    [OK]: {
      content: {
        'application/json': {
          schema: createTasksSchema
        }
      },
      description: 'The updated task'
    },
    [NOT_FOUND]: {
      content: {
        'application/json': {
          schema: notFoundSchema
        }
      },
      description: 'Task not found'
    },
    [UNPROCESSABLE_ENTITY]: {
      content: {
        "application/json": {
          schema: createErrorSchema(patchTasksSchema)
            .or(createErrorSchema(IdParamsSchema))
        },
      },
      description: 'Validation Errors'
    }
  }
});

export const removeTask = createRoute({
  tags,
  method: 'delete',
  path: 'tasks/:id',
  request: {
    params: IdParamsSchema
  },
  responses: {
    [NO_CONTENT]: {
      description: 'Task deleted'
    },
    [NOT_FOUND]: {
      content: {
        'application/json': {
          schema: notFoundSchema
        }
      },
      description: 'Task not found'
    },
    [UNPROCESSABLE_ENTITY]: {
      content: {
        "application/json": {
          schema: createErrorSchema(IdParamsSchema)
        },
      },
      description: 'Validation Errors'
    }
  }
})


export type ListTasksRoute = typeof listTasks;
export type GetSingleTaskRoute = typeof getSingleTask;
export type PatchSingleTaskRoute = typeof updateTask;
export type CreateTaskRoute = typeof createTask;
export type RemoveTaskRoute = typeof removeTask;
