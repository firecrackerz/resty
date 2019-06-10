import {Request, Response, Router} from 'express';
import {Inject, Service} from 'typedi';
import {Application, Config, Environment} from './index';

async function main() {
  let env = new Environment();
  let config = new Config();
  config.port = 3000;
  let app = new Application(env, config);

  // let router = Router();
  // await routes(router);

  // app.register('/api', router);

  // router.get('/', async (req: Request, res: Response) => {
  //   return res.status(200).end();
  // });

  // let routes = new Routes('d');

  let routes = new Routes();
  routes.application.router.get('/', async (req: Request, res: Response) => {
    return res.status(200).end();
  });
  await app.start();
}

// async function configure(config: Config, environment: Environment) {
//   let router = Router();
//   await routes(router);
// }

// async function routes(router: Router) {}

@Service()
class Routes {
  @Inject()
  application: Application;

  // @Inject('Router')
  // router: Router
  // router.get('/', async (req: Request, res: Response) => {
  //   return res.status(200).end();
  // });
}

interface IRoutes {
  router: Router;
}

class RouterExtended implements IRoutes {
  router: Router;
  constructor(prefix: string, router: Router = Router()) {
    this.router = Router();
    router.use(prefix, router);
  }
}

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
