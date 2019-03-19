import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducers';
import * as fromAuthoringManagement from '../authoring/management/store/management.reducers';
import * as fromAuthoringStage from '../authoring/edit/store/authoringStage.reducers';
import * as fromManipulation from '../manipulation/store/manipulation.reducers';
import * as fromBlockly from './../authoring/edit/blockly/store/blockly.reducers';
import * as fromHeader from '../header/store/header.reducers';
import * as AppActions from './app.actions';
import * as fromRouter from '@ngrx/router-store';

import { ProjectState } from '../model/authoring/management.model';
import { AppState, GlobalState } from '../model/app/app.model';

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  authoringManagement: fromAuthoringManagement.authoringManagementRuducer,
  authoringStage: fromAuthoringStage.authoringStageReducer,
  blockly: fromBlockly.BlocklyRuducer,
  gloabalData: globalDataRuducer,
  manipulation: fromManipulation.manipulationRuducer,
  header: fromHeader.headerReducer,
  routerReducer: fromRouter.routerReducer
};

const initialState: GlobalState = {
  projectData: [],
  editProjectIndex: -1,
  editStageIndex: -1,
  editMode: 'PROJECT_MODE',
  isProjectLoaded: false,
  isStageLoaded: false,
  projectSideInfo: {
    author: '',
    createDate: new Date(0),
    description: '',
    lastModify: new Date(0),
    name: '',
    uid: ''
  },
  stageSideInfo: {
    uid: '',
    createDate: new Date(0),
    description: '',
    lastModify: new Date(0),
    name: '',
    order: -1
  }
};

export function globalDataRuducer(state = initialState, action) {
  switch (action.type) {
    case AppActions.LOAD_PROJECTS_DATA:
      return {
        ...state,
        projectData: action.payload
      };
    case AppActions.LOAD_STAGES_DATA:
      let i = 0;
      const index = state.editProjectIndex;
      return {
        ...state,
        projectData: [
          ...state.projectData.map((project: ProjectState) => {
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
      };
    case AppActions.SET_PROJECTS_LOADED_STATE:
      return {
        ...state,
        isProjectLoaded: action.payload,
      };
    case AppActions.SET_STAGE_LOADED_STATE:
      return {
        ...state,
        isStageLoaded: action.payload,
      };
    case AppActions.SET_EDIT_PROJECT_INDEX:
      return {
        ...state,
        editProjectIndex: action.payload
      };
    case AppActions.SET_EDIT_STAGE_INDEX:
      return {
        ...state,
        editStageIndex: action.payload
      };
    case AppActions.SET_PROJECT_SIDE_INFO:
      delete action.payload.stages;
      return {
        ...state,
        projectSideInfo: action.payload
      };
    case AppActions.SET_STAGE_SIDE_INFO:
      delete action.payload.stageData;
      return {
        ...state,
        stageSideInfo: action.payload
      };
    case AppActions.SET_EDIT_MODE_STATE:
      return {
        ...state,
        editMode: action.payload
      };
    case AppActions.INITIAL_PROJECT_INFO:
      return {
        ...state,
        projectSideInfo: {...initialState.projectSideInfo}
      };
    case AppActions.INITIAL_STAGE_INFO:
      return {
        ...state,
        stageSideInfo: {...initialState.stageSideInfo}
      };
    case AppActions.DELETE_PROJECT:
      return {
        ...state,
        projectData: state.projectData.filter(projectData => projectData.uid !== action.payload)
      };
    case AppActions.DELETE_STAGE:
      const editProjectIndex = state.editProjectIndex;
      const projects = [...state.projectData];
      projects[editProjectIndex].stages.splice(action.payload.index, 1);
      return {
        ...state,
        projectData: [...projects]
      };
    case AppActions.ADD_PROJECT:
      return {
        ...state,
        projectData: [...state.projectData, action.payload]
      };
    case AppActions.ADD_STAGE:
      const projectsData = [...state.projectData];
      projectsData[state.editProjectIndex].stages.push(action.payload);
      return {
        ...state,
        projectData: [...projectsData]
      };
    case AppActions.INITAIL_APP_STATE:
      return {
        ...initialState,
        projectSideInfo: {
          ...initialState.projectSideInfo
        },
        stageSideInfo: {
          ...initialState.stageSideInfo
        }
      };
    default:
      return state;
  }
}




