import { getData } from "../api/rentalHome";
import { combineReducers } from "@reduxjs/toolkit";

const FETCH_RENTAL_HOMES_INIT = "FETCH_RENTAL_HOMES_INIT";
const FETCH_RENTAL_HOMES_SUCCESS = "FETCH_RENTAL_HOMES_SUCCESS";
const FETCH_RENTAL_HOMES_ERROR = "FETCH_RENTAL_HOMES_ERROR";

export const getRentalHomesData = () => {
  console.log("Hitting,1");
  return async (dispatch, getState) => {
    const rentalHomeFetched = getState().rentals.list.length > 0;

    if (rentalHomeFetched || getState().rentals.isLoading) return;

    console.log("Hitting,2");

    dispatch({
      type: FETCH_RENTAL_HOMES_INIT,
    });

    try {
      console.log("Hitting,3");

      const result = await getData();
      console.log("result",result);

      dispatch({
        type: FETCH_RENTAL_HOMES_SUCCESS,
        payload: result.houses,
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
        console.log("PAYLOAD", action.payload);
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
    default:
      return { ...state };
  }
};

const rootReducer = combineReducers({
  rentals: rentalHomesReducer,
});

export default rootReducer;
