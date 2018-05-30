import * as types from '../constants/ActionTypes';

export const requestEntries = () => ({
  type: types.REQUEST_ENTRIES,
});

export const receiveEntries = (entries, totalCount) => ({
  type: types.RECEIVE_ENTRIES,
  payload: {
    entries,
    totalCount,
  },
});
