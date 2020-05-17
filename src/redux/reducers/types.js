// import produce from 'immer';

import initialState from '../initialState';

// Actions
const UPDATE_TYPES = 'types/UPDATE-TYPES';

// Reducer
export default function reducer(state = initialState.types, action = {}) {
  switch (action.type) {
    case UPDATE_TYPES:
      return action.payload;
    default:
      return state;
  }
}

// action creator
export function updateType(payload) {
  return {
    type: UPDATE_TYPES,
    payload,
  };
}
