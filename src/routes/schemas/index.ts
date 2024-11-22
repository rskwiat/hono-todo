import { z } from 'zod';
import * as HttpStatusMessage from '@/constants/status-messages';

export const healthcheckSchema = z.object({
  message: z.string().openapi({
    example: 'API is up and running'
  })
});

export const notFoundSchema = z.object({
  message: z.string()
}).openapi({
  example: {
    message: HttpStatusMessage.NOT_FOUND
  }
});

export const ListSchema = z.object({
  name: z.string().openapi({
    example: 'Task Name',
  }),
  completed: z.boolean().openapi({
    example: false,
  }),
});

export const IdParamsSchema = z.object({
  id: z.coerce.number().openapi({
    param: {
      name: 'id',
      in: 'path',
    },
    required: ['id'],
    example: 42,
  }),
});
