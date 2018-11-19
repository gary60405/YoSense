import { HeaderState } from './../../model/header/header.model';
import * as HeaderActions from './header.actions';

const initialState: HeaderState = {
  stepDisplayState: {
    diveDisplayState: 'CLOSE',
    hierarchyDisplayState: 'CLOSE',
    blocklyDisplayState: 'CLOSE',
    bindingDisplayState: 'CLOSE',
    diagnosisDisplayState: 'CLOSE',
    passDisplayState: 'CLOSE'
  }
};

export function headerReducer(state = initialState, action: HeaderActions.HeaderActions) {
  switch (action.type) {
    case HeaderActions.INITAIL_STEP_DISPLAY_STATE:
      return {
        ...state,
        stepDisplayState: {
          ...initialState.stepDisplayState
        }
      };
    case HeaderActions.SET_STEP_DISPLAY_STATE:
      let modifiedState = {};
      switch (action.payload) {
        case 'DIVE_DISPLAY':
          modifiedState = {diveDisplayState: 'OPEN'};
          break;
        case 'HIERARCHY_DISPLAY':
          modifiedState = {hierarchyDisplayState: 'OPEN'};
          break;
        case 'BLOCKLY_DISPLAY':
          modifiedState = {blocklyDisplayState: 'OPEN'};
          break;
        case 'BINDING_DISPLAY':
          modifiedState = {bindingDisplayState: 'OPEN'};
          break;
        case 'DIAGNOSIS_DISPLAY':
          modifiedState = {diagnosisDisplayState: 'OPEN'};
          break;
        case 'PASS_DISPLAY':
          modifiedState = {passDisplayState: 'OPEN'};
          break;
        case 'ALL_DISPLAY':
          modifiedState = {
            diveDisplayState: 'OPEN',
            hierarchyDisplayState: 'OPEN',
            blocklyDisplayState: 'OPEN',
            bindingDisplayState: 'OPEN',
            diagnosisDisplayState: 'OPEN',
            passDisplayState: 'OPEN'
          };
          break;
        }
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
