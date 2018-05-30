import {RECEIVE_ENTRIES, RECEIVE_SEARCH, REQUEST_SEARCH} from '../constants/ActionTypes';

const initialState = {
  entries: [],
  totalCount: 0,
};

export default function entries(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ENTRIES:
      return {
        ...state,
        totalCount: action.payload.totalCount,
        entries: action.payload.entries,
      };
    default:
      return state;
  }
}
