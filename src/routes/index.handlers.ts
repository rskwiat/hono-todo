
import type { AppRouteHandler } from '@/lib/types'
import type { HealthCheckRoute } from './index.routes';
import { OK } from '@/constants/status-codes';

export const healthcheck: AppRouteHandler<HealthCheckRoute> = async (c) => {
  return c.json({
    message: 'App is running',
  }, OK);
};
