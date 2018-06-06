import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import createReducer from "../reducers/createReducer";
import changeReducer from "../reducers/changeReducer";
import initialReducer from "../reducers/initialReducer";
import initialState from "./initialState";

const rootReducer = combineReducers({
  initial:initialReducer,
  create: createReducer,
  change: changeReducer
});

const store = createStore(
  rootReducer,
  initialState
);

export default store;
