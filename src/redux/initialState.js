const initialState = {
  filters: {
    list: ['1'],
    availableFilters: ['All'],
    currentFilter: 'All',
  },
  types: [],
  inventory: [],
};

export default initialState;
export type InitialState = typeof initialState;
