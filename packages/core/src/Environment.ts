import * as dotenv from 'dotenv';
import {Service} from 'typedi';

@Service()
export class Environment {
  env: dotenv.DotenvConfigOutput;

  constructor() {
    this.env = dotenv.config();
    if (this.env.error) {
      // This error should crash whole process
      // throw envFound.error;
      // throw new Error("Couldn't find .env file ");
    }
    // console.log(this.env);
    console.log('Environment.constructor');
  }

  async detect() {}
}
