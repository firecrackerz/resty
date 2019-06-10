import * as express from 'express';
// import {Express, RequestHandler} from 'express';
import {Config} from './Config';
import {Environment} from './Environment';

// @Service()
export class Application {
  protected environment: Environment;
  protected config: Config;
  protected server: express.Express;

  constructor(environment: Environment, config: Config) {
    this.environment = environment;
    this.config = config;
    this.server = express();
    this.server.use();
    console.log('Application.constructor');
  }

  public use(...handlers: express.RequestHandler[]) {
    this.server.use(handlers);
  }

  async start() {
    await this.server.listen(this.config.port);
  }
}
