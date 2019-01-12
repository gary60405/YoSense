import { HeaderState } from './../../model/header/header.model';
import * as HeaderActions from './header.actions';

const initialState: HeaderState = {
  stepDisplayState: {
    diveDisplayState: 'CLOSE',
    hierarchyDisplayState: 'CLOSE',
    blocklyDisplayState: 'CLOSE',
    diagnosisDisplayState: 'CLOSE',
    passDisplayState: 'CLOSE'
  }
};

export function headerReducer(state = initialState, action: HeaderActions.HeaderActions) {
  switch (action.type) {
    case HeaderActions.INITAIL_STEP_DISPLAY_STATE:
      return {
        ...initialState,
        stepDisplayState: {
          ...initialState.stepDisplayState
        }
      };
    case HeaderActions.SET_STEP_DISPLAY_STATE:
      const modifiedState = action.payload === 'DIVE_DISPLAY' ? {diveDisplayState: 'OPEN'}
        : action.payload === 'HIERARCHY_DISPLAY' ? {hierarchyDisplayState: 'OPEN'}
        : action.payload === 'BLOCKLY_DISPLAY' ? {blocklyDisplayState: 'OPEN'}
        : action.payload === 'DIAGNOSIS_DISPLAY' ? {diagnosisDisplayState: 'OPEN'}
        : action.payload === 'PASS_DISPLAY' ? {passDisplayState: 'OPEN'}
        : action.payload === 'ALL_DISPLAY' ? { diveDisplayState: 'OPEN', hierarchyDisplayState: 'OPEN', blocklyDisplayState: 'OPEN', diagnosisDisplayState: 'OPEN', passDisplayState: 'OPEN' }
        : {};
        return {
          ...state,
          stepDisplayState: {
            ...state.stepDisplayState,
            ...modifiedState
          }
        };
      default:
        return state;
  }
}
