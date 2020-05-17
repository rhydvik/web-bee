import produce from 'immer';

import initialState from '../initialState';

// Actions
const UPDATE_TYPES = 'types/UPDATE-TYPES';
const ADD_TYPE = 'types/ADD-TYPES';

// Reducer
export default function reducer(state = initialState.types, action = {}) {
  switch (action.type) {
    case UPDATE_TYPES:
      return produce(state, draft => {
        draft[action.index] = action.payload;
      });
    case ADD_TYPE:
      return produce(state, draft => {
        draft.push({ name: '' });
      });
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

export function addType() {
  return {
    type: ADD_TYPE,
  };
}
