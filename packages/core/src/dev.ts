import {Application, Environment} from './index';

async function main() {
  let env = new Environment();
  let app = new Application(env);
}

main();
