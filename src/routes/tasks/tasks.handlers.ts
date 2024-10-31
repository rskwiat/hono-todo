
import type { AppRouteHandler } from '@/lib/types'
import type { ListTasksRoute } from './tasks.routes';
import { OK } from '@/constants/status-codes';

export const listTasks: AppRouteHandler<ListTasksRoute> = async (c) => {
  return c.json([
    {
      name: 'example tasks',
      completed: false,
    }
  ], OK);
};
