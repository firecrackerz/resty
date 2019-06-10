import {Service} from 'typedi';

@Service()
export class Config {
  port: number = 8080;
}
