import { eq } from 'drizzle-orm';

import type { AppRouteHandler } from '@/lib/types'

import * as HttpStatusCodes from '@/constants/status-codes';
import * as HttpStatusMessage from '@/constants/status-messages';

import db from '@/db';
import { tasks } from "@/db/schema";

import type {
  ListTasksRoute,
  GetSingleTaskRoute,
  CreateTaskRoute,
  PatchSingleTaskRoute,
  RemoveTaskRoute
} from './tasks.routes';

import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from '@/constants/constants';

export const listTasks: AppRouteHandler<ListTasksRoute> = async (c) => {
  const tasks = await db.query.tasks.findMany();
  return c.json(tasks, HttpStatusCodes.OK);
};

export const getSingleTask: AppRouteHandler<GetSingleTaskRoute> = async (c) => {
  const { id } = c.req.valid('param');
  const task = await db.query.tasks.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });

  if (!task) {
    return c.json(
      {
        message: HttpStatusMessage.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  return c.json(task, HttpStatusCodes.OK);
}

export const createSingleTask: AppRouteHandler<CreateTaskRoute> = async (c) => {
  const task = c.req.valid('json');

  const [inserted] = await db.insert(tasks).values(task).returning();
  return c.json(inserted, HttpStatusCodes.OK);
};

export const updateTask: AppRouteHandler<PatchSingleTaskRoute> = async (c) => {
  const { id } = c.req.valid('param');
  const updates = c.req.valid('json');

  if (Object.keys(updates).length === 0) {
    return c.json({
      success: false,
      error: {
        issues: [
          {
            code: ZOD_ERROR_CODES.INVALID_UPDATES,
            path: [],
            message: ZOD_ERROR_MESSAGES.NO_UPDATES,
          },
        ],
        name: 'Zod Error'
      },
    }, HttpStatusCodes.UNPROCESSABLE_ENTITY)
  }

  const [task] = await db.update(tasks)
    .set(updates)
    .where(eq(tasks.id, id))
    .returning();

  if (!task) {
    return c.json({
      message: HttpStatusMessage.NOT_FOUND
    }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(task, HttpStatusCodes.OK);
}

export const removeTask: AppRouteHandler<RemoveTaskRoute> = async (c) => {
  const { id } = c.req.valid('param');
  const result = await db.delete(tasks).where(eq(tasks.id, id));
  if (result.rowsAffected === 0) {
    return c.json({
      message: HttpStatusMessage.NOT_FOUND
    }, HttpStatusCodes.NOT_FOUND)
  }
  return c.body(null, HttpStatusCodes.NO_CONTENT)
}
