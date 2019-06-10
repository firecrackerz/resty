import * as express from 'express';
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
    console.log('Application.constructor');
  }

  async start() {
    await this.server.listen(this.config.port);
  }
}
