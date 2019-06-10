import * as express from 'express';
import {Environment} from './Environment';

// @Service()
export class Application {
  protected environment: Environment;
  protected app: express.Application;

  constructor(environment: Environment) {
    this.environment = environment;
    console.log('Application.constructor');
  }
}
