import { expect } from 'chai';
import readline from 'readline';

import Messen from '../../src/messen';
import config from '../../config/test.json';

function promptCode(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => {
    console.log('Enter code > ');
    return rl.on('line', line => {
      resolve(line);
      rl.close();
    });
  });
}

describe('Messen', function() {
  let messen: Messen;
  beforeEach(() => {
    messen = new Messen();
    messen.getMfaCode = () => {
      return promptCode();
    };
  });

  it('should be able to log in to a real Facebook account', function() {
    this.timeout(60 * 1000); // 60s timeout
    return messen.login(config.credentials, false).then(() => {
      expect(messen.state.authenticated).to.be.true;
    });
  });
});