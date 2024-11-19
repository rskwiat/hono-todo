
import { createRoute } from '@hono/zod-openapi';
import { z } from 'zod';
import { createTasksSchema, insertTasksSchema, patchTasksSchema } from '@/db/schema';
import createErrorSchema from '@/middlewares/open-api/create-error-schema';

import * as HttpStatusCodes from '@/constants/status-codes';

import { notFoundSchema, ListSchema, IdParamsSchema } from '../schemas';

const tags = ['tasks'];

export const listTasks = createRoute({
  tags,
  method: 'get',
  path: '/tasks',
  responses: {
    [HttpStatusCodes.OK]: {
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
    [HttpStatusCodes.OK]: {
      content: {
        'application/json': {
          schema: insertTasksSchema
        }
      },
      description: 'Inserted Task'
    },
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: {
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
    [HttpStatusCodes.OK]: {
      content: {
        'application/json': {
          schema: createTasksSchema
        },
      },
      description: 'The Requested task'
    },
    [HttpStatusCodes.NOT_FOUND]: {
      content: {
        'application/json': {
          schema: notFoundSchema
        },
      },
      description: 'Not Found'
    },
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: {
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
    [HttpStatusCodes.OK]: {
      content: {
        'application/json': {
          schema: createTasksSchema
        }
      },
      description: 'The updated task'
    },
    [HttpStatusCodes.NOT_FOUND]: {
      content: {
        'application/json': {
          schema: notFoundSchema
        }
      },
      description: 'Task not found'
    },
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: {
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
    [HttpStatusCodes.NO_CONTENT]: {
      description: 'Task deleted'
    },
    [HttpStatusCodes.NOT_FOUND]: {
      content: {
        'application/json': {
          schema: notFoundSchema
        }
      },
      description: 'Task not found'
    },
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: {
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
