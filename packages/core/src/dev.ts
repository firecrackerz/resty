import {NextFunction, Request, Response} from 'express';
import {Inject, Service} from 'typedi';
import {Application, Config, Environment} from './index';
import {ApplicationRoutes} from './Router';

async function main() {
  let env = new Environment();
  let config = new Config();
  config.port = 3000;
  let app = new Application(env, config);
  // let routes = new Routes();
  // app.register('/', routes.router);
  let routes = new Routes();
  app.register(routes.router);
  await app.start();
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

@Service()
class HelloController {
  async get(req: Request, res: Response, next: NextFunction) {
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
    this.router.get('/', new HelloController().get);
  }
}

@Service()
class Routes extends ApplicationRoutes {
  @Inject() protected helloController: HelloController;

  @Inject() protected authRoutes: AuthRoutes;

  async configure() {
    this.router.get('/', new HelloController().get);
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
