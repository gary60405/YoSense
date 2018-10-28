import { AuthoringState } from './../../model/authoring/authoring.model';
import * as AuthoringActions from './authoring.actions';
import { ProjectState } from '../../model/authoring/management.model';
const initialState: AuthoringState = {
  managementState: {
    projectDataState: [],
    deleteIndex: -1,
    editProjectIndex: -1,
    editStageIndex: -1,
  },
  editState: {
    diveId: -1,
    diveData: {
      inValue: [
          {id: 1511104362549, name: '移動步數'},
          {id: 1511104719544, name: '要旋轉角度'},
          {id: 1516696065727, name: '拿取'}
      ],
      outValue: [
          {id: 1511104362549, name: '移動步數'},
          {id: 1511104719544, name: '要旋轉角度'},
          {id: 1516696065727, name: '拿取'},
          {id: 1516714543463, name: '火柴數量'}
      ]
    },
    // diveData: {inValue: [], outValue: []},
    hierarchyData: {},
    blocklyData: [],
    bindingData: [],
    conditionData: [],
    passConditionData: [],
    operators: ['=', '!=', '>', '>=', '<', '<=']
  },
  editMode: 'PROJECT_MODE',
  projectSideInfo: {
    author: '',
    createDate: new Date(0),
    description: '',
    lastModify: new Date(0),
    name: '',
    uid: '',
    stages: []
  },
  stageSideInfo: {
    createDate: new Date(0),
    description: '',
    lastModify: new Date(0),
    name: '',
    order: '',
    stageData: {
      bindingData: [],
      blocklyData: [],
      conditionData: [],
      diveData: [],
      diveId: '',
      passcondition: [],
      hierarchyData: {}
    }
  },
  isProjectLoaded: false,
  isStageLoaded: false
};

export function authoringRuducer(state = initialState, action) {
  switch (action.type) {
    case AuthoringActions.LOAD_PROJECTS_DATA:
      return {
        ...state,
        managementState: {
          ...state.managementState,
          projectDataState: action.payload
        }
      };
    case AuthoringActions.LOAD_STAGES_DATA:
      let i = 0;
      const index = state.managementState.editProjectIndex;
      return {
        ...state,
        managementState: {
          ...state.managementState,
          projectDataState: [
            ...state.managementState.projectDataState.map((project: ProjectState) => {
              if (i === index) {
                return {
                  ...project,
                  stages: [...action.payload]
                };
              }
              i++;
              return project;
            })
          ]
        }
      };
    case AuthoringActions.SET_PROJECTS_LOADED_STATE:
      return {
        ...state,
        isProjectLoaded: action.payload,
      };
    case AuthoringActions.SET_STAGE_LOADED_STATE:
      return {
        ...state,
        isStageLoaded: action.payload,
      };
    case AuthoringActions.SET_EDIT_PROJECT_INDEX:
      return {
        ...state,
        managementState: {
          ...state.managementState,
          editProjectIndex: action.payload
        }
      };
    case AuthoringActions.SET_EDIT_STAGE_INDEX:
      return {
        ...state,
        managementState: {
          ...state.managementState,
          editStageIndex: action.payload
        }
      };
    case AuthoringActions.SET_PROJECT_SIDE_INFO:
      return {
        ...state,
        projectSideInfo: action.payload.projects
      };
    case AuthoringActions.SET_STAGE_SIDE_INFO:
      return {
        ...state,
        stageSideInfo: action.payload.stages
      };
    case AuthoringActions.SET_EDIT_MODE_STATE:
      return {
        ...state,
        editMode: action.payload
      };
    case AuthoringActions.INITIAL_PROJECT_INFO:
      return {
        ...state,
        projectSideInfo: {...initialState.projectSideInfo}
      };
    case AuthoringActions.INITIAL_STAGE_INFO:
      return {
        ...state,
        stageSideInfo: {...initialState.stageSideInfo}
      };
    case AuthoringActions.DELETE_PROJECT:
      return {
        ...state,
        managementState: {
          ...state.managementState,
          projectDataState: state.managementState.projectDataState.filter(projectData => projectData.uid !== action.payload)
        }
      };
    case AuthoringActions.DELETE_STAGE:
      const editProjectIndex = state.managementState.editProjectIndex;
      const projects = [...state.managementState.projectDataState];
      projects[editProjectIndex].stages.splice(action.payload.index, 1);
      return {
        ...state,
        managementState: {
          ...state.managementState,
          projectDataState: [...projects]
        }
      };
    case AuthoringActions.ADD_PROJECT:
      return {
        ...state,
        managementState: {
          ...state.managementState,
          projectDataState: [...state.managementState.projectDataState, action.payload]
        }
      };
    case AuthoringActions.BUILD_HIERARCHY:
      return {
          ...state,
          editState: {
            ...state.editState,
            hierarchyData: {
              ...state.editState.hierarchyData,
              ...action.payload
            }
          }
        };
    default:
      return state;
  }
}
