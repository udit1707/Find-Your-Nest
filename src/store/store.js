import { applyMiddleware, createStore } from "@reduxjs/toolkit";

import rootReducer from "./rentalHome";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
