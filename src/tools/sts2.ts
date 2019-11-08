import { InnerToken, ClientConfigs, SecurityToken2, Policy } from 'src/models';
import uuidv4 from 'uuid/v4';
import crypto from 'crypto';
import { getDebugger } from './util';

const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const debug = getDebugger('sts2');

function base64(str: string): string {
  return new Buffer(str).toString('base64');
}

function randStringRunes(n: number): string {
  let arr: string[] = [];
  for (let i = 0; i < n; i++) {
    arr.push(LETTERS[Math.floor(Math.random() * 32)]);
  }
  return arr.join('');
}

function GenerateAccessKeyId(prefix: string): string {
  const uid = uuidv4();
  const uidBase64 = base64(uid.replace(/-/g, '')).replace(/=|\/|\+|-/g, '');
  return prefix + uidBase64;
}

function toBuffer(x: any) {
  if (x instanceof Buffer) return x;
  return Buffer.from(x, 'utf8');
}

/**padding填充0 */
function PKCS5Padding(data, blockSize: number) {
  const padding = blockSize - (data.length % blockSize);
  if (padding === 0) {
    return data;
  }
  const buff = Buffer.alloc(padding);
  const totalLength = data.length + padding;
  return Buffer.concat([data, buff], totalLength);
}

//aes cbc加密的块长度必须是128\192\256
function AesEncryptCBCWithBase64(data, key) {
  if ([16, 24, 32].indexOf(key.length) < 0) {
    throw new Error('aes cbc block size must be 16|24|32 bytes');
  }

  data = toBuffer(data);

  key = toBuffer(key);

  const blocksize = key.length;
  const iv = key;
  const cipher = crypto.createCipheriv(`aes-128-cbc`, key, iv);
  const finaldata = PKCS5Padding(data, blocksize);

  let encrypted = cipher.update(finaldata);
  let final = cipher.final();
  encrypted = Buffer.concat([encrypted, final], encrypted.length + final.length);
  return new Buffer(encrypted).toString('base64');
}

function GenerateSecretKey(): string {
  const randomString = randStringRunes(32);
  return AesEncryptCBCWithBase64(randomString, 'ttcloudbestcloud');
}

function CreateTempAKSK(): { AccessKeyId: string; SecretAccessKey: string } {
  return {
    AccessKeyId: GenerateAccessKeyId('AKTP'),
    SecretAccessKey: GenerateSecretKey(),
  };
}

function hmac(type: string, str: string, secret): string {
  return crypto
    .createHmac(type, secret)
    .update(str)
    .digest('hex');
}

function hash(type, str: string) {
  return crypto
    .createHash(type)
    .update(str)
    .digest();
}

function formatBuffer(buff) {
  if (buff instanceof Buffer) {
    const arr: number[] = [];
    for (const value of buff.values()) {
      arr.push(value);
    }
    return '[' + arr.join(' ') + ']';
  }
  return buff;
}

function CreateInnerToken(
  config: ClientConfigs,
  sts: SecurityToken2,
  inlinePolicy: Policy | undefined,
  t: number,
): InnerToken {
  const key = hash('md5', config.secretkey);

  let SignedSecretAccessKey = AesEncryptCBCWithBase64(sts.SecretAccessKey, key);
  SignedSecretAccessKey = SignedSecretAccessKey.slice(0, -24);
  debug('long term aksk: %o ', {
    ak: config.accesskey,
    sk: config.secretkey,
  });
  debug('temp aksk: %o', {
    ak: sts.AccessKeyId,
    sk: sts.SecretAccessKey,
  });
  debug('SignedSecretAccessKey: %s', SignedSecretAccessKey);
  const signStr = Object.values({
    LTAccessKeyId: config.accesskey,
    AccessKeyId: sts.AccessKeyId,
    ExpiredTime: t,
    SignedSecretAccessKey,
    PolicyString: inlinePolicy ? JSON.stringify(inlinePolicy) : '',
  }).join('|');
  debug('signStr: %s', signStr);

  return {
    LTAccessKeyId: config.accesskey,
    AccessKeyId: sts.AccessKeyId,
    SignedSecretAccessKey,
    ExpiredTime: t,
    PolicyString: inlinePolicy ? JSON.stringify(inlinePolicy) : '',
    Signature: hmac('sha256', signStr, key),
  };
}

export { AesEncryptCBCWithBase64, CreateInnerToken, CreateTempAKSK, base64, PKCS5Padding, hash, formatBuffer };
