import {NextFunction, Request, Response} from 'express';
import {Inject, Service} from 'typedi';
import {Application, Config, Environment} from './index';
import {
  ErrorMiddlewareInterface,
  MiddlewareInterface,
} from './MiddlewareInterface';
import {ApplicationRoutes} from './Router';

async function main() {
  let env = new Environment();
  let config = new Config();
  config.port = 3000;
  let app = new Application(env, config);
  // let routes = new Routes();
  // app.register('/', routes.router);
  let routes = new Routes();
  routes.register(new MyMiddleware());
  app.register(routes.router);

  // app.server.use((req, res, next) => {
  //   const err = new Error('Not Found') as any;
  //   err.status = 404;
  //   next(err);
  // });

  let xx = new NotFound();
  app.server.use(xx.use);

  let notfound = new CustomErrorHandler();
  app.server.use(notfound.error);

  // app.server.use((err, req, res, next) => {
  //   res.status(err.status || 500);
  //   res.json({
  //     errors: {
  //       message: err.message,
  //     },
  //   });
  // });
  await app.start();
}

export class MyMiddleware implements MiddlewareInterface {
  // interface implementation is optional

  use(request: any, response: any, next?: (err?: any) => any): any {
    console.log('do something...');
    next();
  }
}

export class NotFound implements MiddlewareInterface {
  // interface implementation is optional

  use(request: any, response: any, next?: (err?: any) => any): any {
    const err = new Error('Not Found') as any;
    err.status = 404;
    next(err);
  }
}

export class CustomErrorHandler implements ErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err: any) => any) {
    console.log('error something...');
    response.status(error.status || 500);
    response.json({
      errors: {
        message: error.message,
      },
    });
  }
}

// async function configure(config: Config, environment: Environment) {
//   let router = Router();
//   await routes(router);
// }

// async function routes(router: Router) {
//   // router.get('/', async (req: Request, res: Response) => {
//   //   return res
//   //     .send('hello')
//   //     .status(200)
//   //     .end();
//   // });

//   let controller = new HelloController();
//   let api = Router();
//   router.use('/api', api);

//   api.get('/', controller.get);
// }

// @Service()
class HelloController {
  async index(req: Request, res: Response, next: NextFunction) {
    console.log('ress...');
    return res
      .send('hello')
      .status(200)
      .end();
  }
}

@Service()
class AuthRoutes extends ApplicationRoutes {
  @Inject() protected helloController: HelloController;

  async configure() {
    this.router.get('/', new HelloController().index);
  }
}

@Service()
class Routes extends ApplicationRoutes {
  @Inject() protected helloController: HelloController;

  @Inject() protected authRoutes: AuthRoutes;

  async configure() {
    this.router.get('/', new HelloController().index);
    // this.router.use(this.authRoutes.router);
  }
}

// @Service()
// class Routes {
//   // @Inject() protected application: Application;
//   @Inject() protected helloController: HelloController;
//   router: Router = Router();

//   constructor() {
//     // this.application.router.use('/api', this.router);
//     this.configure();
//   }

//   async configure() {
//     this.router.get('/', this.helloController.get);
//   }
// }

// @Service('Routes')
// class Routes implements IRoutes {
//   router: Router;
//   constructor(prefix: string, router: Router) {
//     this.router = Router();
//     router.use(prefix, router);

//     router.get('/', async (req: Request, res: Response) => {
//       return res.status(200).end();
//     });
//   }
// }

// @Service()
// class Routes extends RouterExtended {
//   // router.get('/', async (req: Request, res: Response) => {
//   //   return res.status(200).end();
//   // });
// }

main();
