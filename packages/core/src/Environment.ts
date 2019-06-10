import * as dotenv from 'dotenv';
import {Service} from 'typedi';

@Service()
export class Environment {
  env: dotenv.DotenvConfigOutput;
  name: string = process.env.NODE_ENV || 'development';

  constructor(path?: string) {
    this.env = dotenv.config({path: path});
    if (this.env.error) {
      // This error should crash whole process
      // throw envFound.error;
      throw new Error("Couldn't find .env file ");
    }
    process.env.NODE_ENV = this.name;
    console.log('Environment.constructor');
  }

  async detect() {}
}
