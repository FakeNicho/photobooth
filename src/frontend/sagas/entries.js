import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import * as EntryActions from '../actions/EntryActions';
import fetch from '../utils/fetch';

function* entries() {
  yield takeLatest(types.OPEN_ENTRY_PAGE, getEntries);
}

export default entries;

function* getEntries({payload: {page}}) {
  yield put(EntryActions.requestEntries());
  try {
    const {entries, totalCount} = yield call(fetchEntries, page);
    yield put(EntryActions.receiveEntries(entries, totalCount));
  } catch (e) {
    // Dispatch an error here
  }
}

function fetchEntries(page) {
  const uri = `/${page}`;
  return fetch(uri);
}
