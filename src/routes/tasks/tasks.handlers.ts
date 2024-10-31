
import type { AppRouteHandler } from '@/lib/types'
import type { ListTasksRoute, GetSingleTaskRoute } from './tasks.routes';
import { OK, NOT_FOUND, } from '@/constants/status-codes';
import db from '@/db';

export const listTasks: AppRouteHandler<ListTasksRoute> = async (c) => {
  const tasks = await db.query.tasks.findMany();
  return c.json(tasks, OK);
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
        message: 'Task not found',
      },
      NOT_FOUND,
    );
  }

  return c.json(task, OK);
}
