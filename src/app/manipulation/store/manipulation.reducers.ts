import { ManipulationState } from './../../model/manipulation/manipulation.model';
import * as ManipulationActions from './manipulation.actions';

export const initailState: ManipulationState = {
  isDiveLoaded: false,
  snackBarState: {
    isOpen: false,
    content: '',
  },
  blocklyData: ''
};

export function manipulationRuducer(state = initailState, action) {
  switch (action.type) {
    case ManipulationActions.INITAIL_MANIPULATION_STATE:
      return {
        ...initailState
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
      case ManipulationActions.SET_BLOCKLY_TRANSFORMED_STATE:
        return {
          ...state,
          blocklyData: action.payload
        };
    default:
      return state;
  }
}
