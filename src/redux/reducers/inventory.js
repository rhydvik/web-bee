import produce from 'immer';

import initialState from '../initialState';

// Actions
const ADD_INVENTORY = 'inventory/ADD-INVENTORY';
const DELETE_INVENTORY = 'inventory/DELETE-INVENTORY';
const UPDATE_INVENTORY = 'inventory/UPDATE_INVENTORY';

// Reducer
export default function reducer(state = initialState.inventory, action = {}) {
  switch (action.type) {
    case ADD_INVENTORY:
      return produce(state, draft => {
        draft.push(action.payload);
      });
    case DELETE_INVENTORY:
      return produce(state, draft => {
        draft.splice(action.payload, 1);
      });
    case UPDATE_INVENTORY:
      return produce(state, draft => {
        draft[action.payload.index] = action.payload.item;
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

export function deleteInventory(index) {
  return {
    type: DELETE_INVENTORY,
    payload: index,
  };
}

export function updateInventory(index, item) {
  return {
    type: UPDATE_INVENTORY,
    payload: {
      index,
      item,
    },
  };
}
