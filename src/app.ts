import configureOpenAPI from '@/lib/configure-open-api';
import createApp from '@/lib/create-app';
import index from '@/routes/index';
import tasks from '@/routes/tasks/tasks.index';

const app = createApp();
configureOpenAPI(app);

const routes = [
  index,
  tasks,
];

routes.forEach((route) => {
  app.route("/", route);
});

export default app;
