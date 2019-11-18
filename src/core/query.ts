import * as util from '../tools/util';

class Query extends Error {
  private chain;

  constructor(chain) {
    super();
    this.chain = chain;
    Error.captureStackTrace(this, this.constructor);
  }

  exec() {
    return util.excuteWaterful(this.chain).catch(e => {
      const message = e.stack.split('\n')[0];
      if (this.stack) {
        const stack = this.stack
          .split('\n')
          .slice(2)
          .join('\n');
        e.stack = message + '\n' + stack;
      }
      throw e;
    });
  }
}

export default Query;
