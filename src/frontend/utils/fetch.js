import fetch from 'isomorphic-fetch';
import history from '../utils/history';
import createUrl from '../utils/url';

export default (url, options = {}) => {
  options.credentials = options.credentials || 'same-origin';
  options.headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  return fetch(url, options).then(response => {
    const contentType = response.headers.get('content-type') || '';
    return (contentType.includes('application/json') ? response.json() : response.text()).then(data => {
      if (response.ok) {
        return data;
      } else {
        if (!url.startsWith('/login') && response.status === 401) {
          const {pathname, search, hash} = window.location;
          history.push(createUrl('/login', {error: 'notLoggedIn', back: pathname + search + hash}));
        } else {
          return Promise.reject(
            Error({
              body: data,
              status: response.status,
              statusText: response.statusText,
            })
          );
        }
      }
    });
  });
};
