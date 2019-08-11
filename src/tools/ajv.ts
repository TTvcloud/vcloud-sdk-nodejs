import Ajv from 'ajv';

let instance: Ajv.Ajv;
export default (options?: Ajv.Options) => {
  if (!instance) {
    instance = new Ajv(options || { allErrors: true });
  }
  return instance;
};
