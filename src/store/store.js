import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createReducer from "../reducers/createReducer";
import changeReducer from "../reducers/changeReducer";
import initialReducer from "../reducers/initialReducer";
import initialState from "./initialState";

const rootReducer = combineReducers({
  initial:initialReducer,
  create: createReducer,
  change: changeReducer
});

const middlewares = applyMiddleware(thunk);

// Just For Redux Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(middlewares)
);

export default store;
