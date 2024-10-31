import { createRouter } from '@/lib/create-app';

import * as handlers from './tasks.handlers';
import * as routes from './tasks.routes';

const router = createRouter()
  .openapi(routes.listTasks, handlers.listTasks)
  .openapi(routes.getSingleTask, handlers.getSingleTask);

export default router;
