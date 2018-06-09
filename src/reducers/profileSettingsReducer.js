import * as ACTIONS from "../actions/actionTypes"


export default function profileSettingsReducer(state = { isFBLinked: true, isGoogleLinked: true, isFetching: false }, action) {
    switch (action.type) {
      case ACTIONS.LINK_FB:
        return {
          ...state,
          isFBLinked: !state.isFBLinked
        }
      case ACTIONS.LINK_GOOGLE:
        return {
          ...state,
          isGoogleLinked: !state.isGoogleLinked
        }
      default:
        return state;
    }
  }