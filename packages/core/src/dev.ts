import {Application, Config, Environment} from './index';

async function main() {
  let env = new Environment();
  let config = new Config();
  config.port = 3000;
  let app = new Application(env, config);
  await app.start();
}

main();
