import { getData } from "../api/rentalHome";
import { combineReducers } from "@reduxjs/toolkit";

const FETCH_RENTAL_HOMES_INIT = "FETCH_RENTAL_HOMES_INIT";
const FETCH_RENTAL_HOMES_SUCCESS = "FETCH_RENTAL_HOMES_SUCCESS";
const FETCH_RENTAL_HOMES_ERROR = "FETCH_RENTAL_HOMES_ERROR";
const BOOK_RENTAL_HOME = "BOOK_RENTAL_HOME";

export const getRentalHomesData = () => {
  return async (dispatch, getState) => {
    const rentalHomeFetched = getState().rentals.list.length > 0;

    if (rentalHomeFetched || getState().rentals.isLoading) return;

    dispatch({
      type: FETCH_RENTAL_HOMES_INIT,
    });

    try {
      const result = await getData();
      const newResult = result.houses.map((i, index) => {
        return {
          ...i,
          canBook: i.available_from.length > 0,
        };
      });

      dispatch({
        type: FETCH_RENTAL_HOMES_SUCCESS,
        payload: newResult,
      });
    } catch (error) {
      dispatch({
        type: FETCH_RENTAL_HOMES_ERROR,
        payload: {
          error,
        },
      });
    }
  };
};

export const bookHome = (id) => {
  return async (dispatch, getState) => {
    const newList = getState().rentals.list.map((i, index) => {
      if (i.id === id) {
        return {
          ...i,
          canBook: false,
          available_from: "",
        };
      } else
        return {
          ...i,
        };
    });

    dispatch({
      type: BOOK_RENTAL_HOME,
      payload: newList,
    });
  };
};

const initialState = {
  isLoading: false,
  list: [],
  loadError: null,
};

const rentalHomesReducer = function (state = initialState, action) {
  switch (action.type) {
    case FETCH_RENTAL_HOMES_INIT:
      return {
        ...state,
        isLoading: true,
        loadError: null,
      };
    case FETCH_RENTAL_HOMES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        loadError: null,
        list: [...action.payload],
      };
    }
    case FETCH_RENTAL_HOMES_ERROR:
      return {
        ...state,
        list: [],
        loadError: action.payload.error,
        isLoading: false,
      };
    case BOOK_RENTAL_HOME:
      return {
        ...state,
        list: [...action.payload],
      };
    default:
      return { ...state };
  }
};

const rootReducer = combineReducers({
  rentals: rentalHomesReducer,
});

export default rootReducer;
