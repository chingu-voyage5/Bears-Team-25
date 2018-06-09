import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createReducer from "../reducers/createReducer";
import serviceReducer from "../reducers/serviceReducer";
import actionReducer from "../reducers/actionReducer";
import triggerReducer from "../reducers/triggerReducer";
import activityReducer from "../reducers/activityReducer";
import initialState from "./initialState";

const rootReducer = combineReducers({
  action:actionReducer,
  activity:activityReducer,
  create: createReducer,
  service:serviceReducer,
  trigger: triggerReducer
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
