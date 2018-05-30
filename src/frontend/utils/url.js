import queryString from 'querystring';

export default (pathname = '', queryParameters = '', hash = '') => {
  return `${pathname}${getQueryString(queryParameters)}${getHash(hash)}`;
};

function getHash(hash) {
  return hash ? `#${hash}` : '';
}

function getQueryString(queryParameters) {
  if (isString(queryParameters)) {
    return queryParameters.startsWith('?') ? queryParameters : `?${queryParameters}`;
  } else {
    const queryString1 = queryString.stringify(queryParameters);
    return queryString1 ? `?${queryString1}` : '';
  }
}

function isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}
