import { createRouter } from '@/lib/create-app';

import * as handlers from './tasks.handlers';
import * as routes from './tasks.routes';

const router = createRouter()
  .openapi(routes.listTasks, handlers.listTasks)
  .openapi(routes.createTask, handlers.createSingleTask)
  .openapi(routes.updateTask, handlers.updateTask)
  .openapi(routes.getSingleTask, handlers.getSingleTask)
  .openapi(routes.removeTask, handlers.removeTask);

export default router;
