import { applyMiddleware, createStore } from "@reduxjs/toolkit";

import rootReducer from "./celeb";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
