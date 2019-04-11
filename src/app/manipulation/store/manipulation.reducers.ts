import { ManipulationState } from './../../model/manipulation/manipulation.model';
import * as ManipulationActions from './manipulation.actions';

export const initailState: ManipulationState = {
  isDiveLoaded: false,
  snackBarState: {
    isOpen: false,
    content: '',
  },
  diveState: ''
};

export function manipulationRuducer(state = initailState, action) {
  switch (action.type) {
    case ManipulationActions.INITAIL_MANIPULATION_STATE:
      return {
        ...initailState,
        snackBarState: {
          ...initailState.snackBarState
        }
      };
    case ManipulationActions.SET_STUDENT_DIVE_LOADED_STATE:
      return {
        ...state,
        isDiveLoaded: action.payload
      };
    case ManipulationActions.SET_SNACKBAR_OPEN_STATE:
      return {
        ...state,
        snackBarState: {
          ...state.snackBarState,
          isOpen: action.payload
        }
      };
      case ManipulationActions.SET_SNACKBAR_CONTENT:
        return {
          ...state,
          snackBarState: {
            ...state.snackBarState,
            content: action.payload
          }
        };
      case ManipulationActions.SET_DIVE_STATE:
        return {
          ...state,
          diveState: action.payload
        };
    default:
      return state;
  }
}
