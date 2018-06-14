import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducer as reduxFormReducer } from 'redux-form';
import createReducer from "../reducers/createReducer";
import serviceReducer from "../reducers/serviceReducer";
import actionReducer from "../reducers/actionReducer";
import triggerReducer from "../reducers/triggerReducer";
import activityReducer from "../reducers/activityReducer";
import appletReducer from '../reducers/appletReducer';
import initialState from "./initialState";
import authReducer from '../reducers/authReducer';
import snackbarReducer from '../reducers/snackbarReducer';
import changePasswordReducer from '../reducers/changePasswordReducer';
import profileSettingsReducer from '../reducers/profileSettingsReducer';
import accountDeletionReducer from '../reducers/accountDeletionReducer';

const rootReducer = combineReducers({
  action:actionReducer,
  activity:activityReducer,
  create: createReducer,
  service:serviceReducer,
  trigger: triggerReducer,
  applet:appletReducer,
  auth: authReducer,
  snackbar: snackbarReducer,
  changePassword: changePasswordReducer,
  profileSettings: profileSettingsReducer,
  accountDeletion: accountDeletionReducer,
  form: reduxFormReducer
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
