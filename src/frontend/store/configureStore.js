import {connectRouter, routerMiddleware} from 'connected-react-router';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import entries from '../sagas/entries';
import routes from '../sagas/routes';
import errorLoggingMiddleware from '../utils/errorLoggingMiddleware';

const sagaMiddleware = createSagaMiddleware();

export default (initialState, history) => {
  const middleware = [sagaMiddleware, routerMiddleware(history), errorLoggingMiddleware];
  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  sagaMiddleware.run(entries);
  sagaMiddleware.run(routes);
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(connectRouter(history)(rootReducer));
    });
  }

  return store;
};
