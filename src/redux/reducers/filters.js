import produce from 'immer';

import initialState from '../initialState';
// Actions
const UPDATE_FILTERS = 'filters/UPDATE_FILTERS';

// Reducer
export default function reducer(state = initialState.filters, action = {}) {
  switch (action.type) {
    case UPDATE_FILTERS:
      return produce(state, draft => {
        draft.list = action.payload;
      });
    default:
      return state;
  }
}

// action creator
export function updateFilters(payload) {
  console.log(payload);
  return {
    type: UPDATE_FILTERS,
    payload,
  };
}
