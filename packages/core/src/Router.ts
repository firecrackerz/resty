import * as express from 'express';

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

  //   register(routes: ApplicationRoutes) {
  //     this.router.use(routes.router);
  //   }
}
