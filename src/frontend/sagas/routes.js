import {put, takeLatest} from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import {matchPath} from 'react-router-dom';
import {LOCATION_CHANGE} from 'connected-react-router';

function* routes() {
  yield takeLatest(types.INIT, routeParse);
  yield takeLatest(LOCATION_CHANGE, routeParse);
}

function* routeParse({
  payload: {
    location: {pathname},
  },
}) {
  const pageMatch = matchPath(pathname, {
    path: '/page/:pageId',
    exact: true,
    strict: false,
  });

  if (pageMatch) {
    yield put({
      type: types.OPEN_ENTRY_PAGE,
      payload: {
        page: pageMatch.params.pageId,
      },
    });
  }
}

export default routes;
