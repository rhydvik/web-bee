import produce from 'immer';

import initialState from '../initialState';

// Actions
const ADD_INVENTORY = 'inventory/ADD-INVENTORY';

// Reducer
export default function reducer(state = initialState.inventory, action = {}) {
  switch (action.type) {
    case ADD_INVENTORY:
      return produce(state, draft => {
        draft.push(action.payload);
      });
    default:
      return state;
  }
}

// action creator
export function addInventoryItem(payload) {
  return {
    type: ADD_INVENTORY,
    payload,
  };
}

export function updateInventory(index, data) {
  console.log(index, data);
}
