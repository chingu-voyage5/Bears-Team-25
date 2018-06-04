import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import createReducer from "../reducers/createReducer";
import changeReducer from "../reducers/changeReducer";
import initialState from "./initialState";

const rootReducer = combineReducers({
  create: createReducer,
  change: changeReducer
});

const store = createStore(
  rootReducer,
  initialState
);

export default store;
