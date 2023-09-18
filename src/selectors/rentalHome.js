import { createSelector } from "reselect";

const baseState = (state) => state.rentals;

export const rentalsLoaderSelector = createSelector(baseState, (state) => ({
  isLoading: state.isLoading,
  loadError: state.loadError,
}));

export const rentalsDataSelector = createSelector(baseState, (state) => ({
  list: state.list,
}));

export const rentalHomeDetailsSelector = (id) =>
  createSelector(baseState, (state) => {
    const rentalHome = state.list.find((i) => i.id === id);
    return rentalHome;
  });
