import { createSelector } from "reselect";

const baseState = (state) => state.rentals;

export const rentalsLoaderSelector = createSelector(baseState, (state) => ({
  isLoading: state.isLoading,
  loadError: state.loadError,
}));

export const rentalsDataSelector = createSelector(baseState, (state) => {
  console.log("state",state);
  console.log(state.list);
  return { list: state.list };
});
