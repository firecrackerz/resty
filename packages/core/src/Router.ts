import * as express from 'express';
import {MiddlewareInterface} from './MiddlewareInterface';

export interface IRoutes {
  router: express.Router;
  configure();
}

export class ApplicationRoutes implements IRoutes {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.configure();
  }
  configure() {
    throw new Error('Method not implemented.');
  }

  register(...middlewares: MiddlewareInterface[]) {
    middlewares.forEach(middleware => {
      this.router.use(middleware.use);
    });
  }

  //   register(routes: ApplicationRoutes) {
  //     this.router.use(routes.router);
  //   }
}
