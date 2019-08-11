import AWS from 'aws-sdk/global';

const uriEscape = (str: string) => {
  try {
    return encodeURIComponent(str)
      .replace(/[^A-Za-z0-9_.~\-%]+/g, escape)
      .replace(
        /[*]/g,
        ch =>
          `%${ch
            .charCodeAt(0)
            .toString(16)
            .toUpperCase()}`,
      );
  } catch (e) {
    return '';
  }
};

const queryParamsToString = (params: { [key: string]: any }) =>
  Object.keys(params)
    .sort()
    .map(key => {
      const val = params[key];
      if (typeof val === 'undefined' || val === null) return;

      const escapedKey = uriEscape(key);
      if (!escapedKey) return;

      if (Array.isArray(val)) {
        return `${escapedKey}=${val
          .map(uriEscape)
          .sort()
          .join(`&${escapedKey}=`)}`;
      }

      return `${escapedKey}=${uriEscape(val)}`;
    })
    .filter(v => v)
    .join('&');

const AWSSignersV4 = (AWS as any).Signers.V4;

export { queryParamsToString, AWSSignersV4 };
