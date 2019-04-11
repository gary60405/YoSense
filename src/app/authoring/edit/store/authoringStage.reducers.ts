import { AuthoringStageState } from '../../../model/authoring/authoring.model';
import * as AuthoringStage from './authoringStage.actions';

const initialState: AuthoringStageState = {
  toggleState: {
    isDiveLoaded: true,
    isChecked: false,
  },
  editState: {
    diveReadTime: 3,
    diveId: -1,
    diveData: {
      inValue: [],
      outValue: []
    },
    blocklyData: {
      toolBoxState: [],
      customBlocksState: [],
    },
    hierarchyData: [],
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
        editState: {
          ...state.editState,
          diveId: action.payload
        }
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
        ...initialState,
        toggleState: {
          ...initialState.toggleState
        },
        editState: {
          ...initialState.editState,
          diveId: -1,
          diveData: {
            ...initialState.editState.diveData
          },
          blocklyData: {
            ...initialState.editState.blocklyData
          },
        }
      };
    case AuthoringStage.ADD_CATEGORY_BLOCK:
    return {
      ...state,
      editState: {
        ...state.editState,
        blocklyData: {
          ...state.editState.blocklyData,
          toolBoxState: [
            ...state.editState.blocklyData.toolBoxState,
            {
              category: action.payload.category,
              data: action.payload.data
            }
          ]
        }
      }
    };
    case AuthoringStage.DELETE_CATEGORY_BLOCK:
      return {
        ...state,
        editState: {
          ...state.editState,
          blocklyData: {
            ...state.editState.blocklyData,
            toolBoxState: [...state.editState.blocklyData.toolBoxState.filter((block) => block.data !== action.payload.data)]
          }
        }
      };
    case AuthoringStage.ADD_CUSTOM_BLOCK:
    return {
      ...state,
      editState: {
        ...state.editState,
        blocklyData: {
          ...state.editState.blocklyData,
          customBlocksState: [
            ...state.editState.blocklyData.customBlocksState,
            action.payload
          ]
        }
      }
    };
    case AuthoringStage.UPDATE_CUSTOM_BLOCK:
      return {
        ...state,
        editState: {
          ...state.editState,
          blocklyData: {
            ...state.editState.blocklyData,
            customBlocksState: [
              ...state.editState.blocklyData.customBlocksState.map(block => block.blockId !== action.payload.blockId ? block : action.payload),
            ]
          }
        }
      };
    case AuthoringStage.DELETE_CUSTOM_BLOCK:
      return {
        ...state,
        editState: {
          ...state.editState,
          blocklyData: {
            ...state.editState.blocklyData,
            customBlocksState: [
              ...state.editState.blocklyData.customBlocksState.filter(block => block.blockId !== action.payload),
            ]
          }
        }
      };
    case AuthoringStage.SET_BLOCK_ENABLE_STATE:
      state.editState.blocklyData.customBlocksState.find(block => block.blockId === action.payload.id).isEnable = action.payload.checked;
      return {
        ...state,
        editState: {
          ...state.editState,
          blocklyData: {
            ...state.editState.blocklyData,
            customBlocksState: [
              ...state.editState.blocklyData.customBlocksState
            ]
          }
        }
      };
    default:
      return state;
  }
}

