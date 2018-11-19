import { AuthoringStageState } from '../../../model/authoring/authoring.model';
import * as AuthoringStage from './authoringStage.actions';

const initialState: AuthoringStageState = {
  toggleState: {
    isDiveLoaded: true,
    isChecked: false,
  },
  editState: {
    diveId: -1,
    diveData: {inValue: [], outValue: []},
    hierarchyData: [],
    blocklyData: [],
    bindingData: [],
    conditionData: [],
    passConditionData: [],
    operators: ['=', '!=', '>', '>=', '<', '<=']
  },
};

export function authoringStageReducer(state = initialState, action) {
  switch (action.type) {
    case AuthoringStage.ADD_HIERARCHY:
      return {
          ...state,
          editState: {
            ...state.editState,
            hierarchyData: [...action.payload.objects]
          }
        };
    case AuthoringStage.LOAD_SELECTED_STAGE:
      return {
        ...state,
        editState: {
          ...state.editState,
          ...action.payload
        }
      };
    case AuthoringStage.SET_DIVE_LOADED_STATE:
      return {
        ...state,
        toggleState: {
          ...state.toggleState,
          isDiveLoaded: action.payload
        }
      };
    case AuthoringStage.SET_DIVE_ID_STATE:
      return {
        ...state,
        diveId: action.payload
      };
    case AuthoringStage.SET_CHECKED_STATE:
      return {
        ...state,
        toggleState: {
          ...state.toggleState,
          isChecked: action.payload
        }
      };
    case AuthoringStage.ADD_DIVE_DATA:
      return {
        ...state,
        editState: {
          ...state.editState,
          diveData: {
            ...state.editState.diveData,
            ...action.payload
          }
        }
      };
    case AuthoringStage.ADD_BLOCKLY_DATA:
      return {
        ...state,
        editState: {
          ...state.editState,
          blocklyData: [
            ...state.editState.blocklyData,
            action.payload
          ]
        }
      };
    case AuthoringStage.DELETE_BLOCKLY_DATA:
      const blocklyData = [...state.editState.blocklyData];
      blocklyData.splice(action.payload, 1);
      return {
        ...state,
        editState: {
          ...state.editState,
          blocklyData: [
            ...blocklyData
          ]
        }
      };
    case AuthoringStage.ADD_BINDING_DATA:
      return {
        ...state,
        editState: {
          ...state.editState,
          bindingData: [...action.payload]
        }
      };

    case AuthoringStage.ADD_DIAGNOSIS_DATA:
      return {
        ...state,
        editState: {
          ...state.editState,
          conditionData: [
            ...state.editState.conditionData,
            action.payload
          ]
        }
      };

    case AuthoringStage.UPDATE_DIAGNOSIS_DATA:
      return {
        ...state,
        editState: {
          ...state.editState,
          conditionData: [...action.payload]
        }
      };

    case AuthoringStage.DELETE_DIAGNOSIS_DATA:
      const conditionData = [...state.editState.conditionData];
      conditionData.splice(action.payload, 1);
      return {
        ...state,
        editState: {
          ...state.editState,
          conditionData: [...conditionData]
        }
      };

    case AuthoringStage.ADD_PASS_CONDITION_DATA:
      return {
        ...state,
        editState: {
          ...state.editState,
          passConditionData: [
            ...action.payload
          ]
        }
      };

    case AuthoringStage.INITAIL_AUTHORING_STAGE_STATE:
      return {
        ...initialState
      };
    default:
      return state;
  }
}

