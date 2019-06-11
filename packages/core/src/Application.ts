import * as express from 'express';
import {Service} from 'typedi';
// import {Express, RequestHandler} from 'express';
import {Config} from './Config';
import {Environment} from './Environment';

@Service()
export class Application {
  protected environment: Environment;
  protected config: Config;

  public server: express.Express;
  // public router: express.Router;

  constructor(environment?: Environment, config?: Config) {
    this.environment = environment || new Environment();
    this.config = config || new Config();

    this.server = express();
    // this.router = express.Router();

    // this.server.use(this.router);

    // let router = Container.get<express.RequestHandler[]>('Router');
    // this.server.use(router);
  }

  // public use(...handlers: express.RequestHandler[]) {
  //   this.server.use(handlers);
  // }

  // public use(path: PathParams, ...handlers: express.RequestHandler[]) {
  //   this.server.use(path, handlers);
  //   // this.application.getServer().use(path, handlers);
  // }

  // public register(router: express.Router, prefix?: string) {
  //   this.server.use(prefix, router);
  // }

  public register(router: express.Router, prefix?: string): void {
    if (prefix) {
      this.server.use(prefix, router);
    } else {
      this.server.use(router);
    }
  }

  // public routes(routes: ApplicationRoutes): express.Express {
  //   return this.server.use(routes.router);
  // }

  // public use(
  //   ...handlers: express.RequestHandler[] | ErrorMiddlewareInterface[]
  // ) {
  //   if handlers
  //   this.server.use(handlers | middlewares.map(middleware => middleware.error));
  // }

  // public myMethod(...middlewares: ErrorMiddlewareInterface[]) {
  //   return this.server.use(middlewares.map(middleware => middleware.error));
  // }

  // public register(prefix: string, router: express.Router) {
  //   this.server.use(router);
  // }

  async start() {
    await this.server.listen(this.config.port);
  }
}

// interface ServicesInterface {
//   register();
//   register(path: PathParams, ...handlers: express.RequestHandler[]);
// }

// @Service()
// export class Services {

//   protected

//   // @Inject()
//   // application: Application;
//   public register() {}

//   public register(path: PathParams, ...handlers: express.RequestHandler[]) {
//     // this.application.getServer().use(path, handlers);
//   }
// }
