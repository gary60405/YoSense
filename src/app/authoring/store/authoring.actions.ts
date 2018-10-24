import { Action } from '@ngrx/store';
import { UserDataState } from '../../model/auth/auth.model';
import { ProjectState, StagesState } from '../../model/authoring/management.model';

export const TRY_LOAD_PROJECTS_DATA = 'TRY_LOAD_PROJECTS_DATA';
export const LOAD_PROJECTS_DATA = 'LOAD_PROJECTS_DATA';
export const TRY_LOAD_STAGES_DATA = 'TRY_LOAD_STAGES_DATA';
export const LOAD_STAGES_DATA = 'LOAD_STAGES_DATA';
export const SET_EDIT_MODE_STATE = 'SET_EDIT_MODE_STATE';
export const SET_PROJECTS_LOADED_STATE = 'SET_PROJECTS_LOADED_STATE';
export const SET_STAGE_LOADED_STATE = 'SET_STAGE_LOADED_STATE';
export const SET_EDIT_PROJECT_INDEX = 'SET_EDIT_PROJECT_INDEX';
export const SET_EDIT_STAGE_INDEX = 'SET_EDIT_STAGE_INDEX';
export const SET_PROJECT_SIDE_INFO = 'SET_PROJECT_SIDE_INFO';
export const SET_STAGE_SIDE_INFO = 'SET_STAGE_SIDE_INFO';
export const INITIAL_STAGE_INFO = 'INITIAL_STAGE_INFO';
export const INITIAL_PROJECT_INFO = 'INITIAL_PROJECT_INFO';
export const TRY_DELETE_PROJECT = 'TRY_DELETE_PROJECT';
export const TRY_DELETE_STAGE = 'TRY_DELETE_STAGE';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const DELETE_STAGE = 'DELETE_STAGE';
export const TRY_ADD_PROJECT = 'TRY_ADD_PROJECT';
export const TRY_ADD_STAGE = 'TRY_ADD_STAGE';
export const ADD_PROJECT = 'ADD_PROJECT';
export const ADD_STAGE = 'ADD_STAGE';
export const TRY_UPDATE_PROJECT = 'TRY_UPDATE_PROJECT';
export const TRY_UPDATE_STAGE = 'TRY_UPDATE_STAGE';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const UPDATE_STAGE = 'UPDATE_STAGE';
export const BUILD_HIERARCHY = 'BUILD_HIERARCHY';

export class TryLoadProjectsData implements Action {
  readonly type = TRY_LOAD_PROJECTS_DATA;
  constructor(public payload: UserDataState) {}
}

export class LoadProjectsData implements Action {
  readonly type = LOAD_PROJECTS_DATA;
  constructor(public payload: ProjectState[]) {}
}

export class TryLoadStagesData implements Action {
  readonly type = TRY_LOAD_STAGES_DATA;
  constructor(public payload: string) {}
}

export class LoadStagesData implements Action {
  readonly type = LOAD_STAGES_DATA;
  constructor(public payload: StagesState[]) {}
}

export class SetEditModeState implements Action {
  readonly type = SET_EDIT_MODE_STATE;
  constructor(public payload: string) {}
}

export class SetProjectsLoadedState implements Action {
  readonly type = SET_PROJECTS_LOADED_STATE;
  constructor(public payload: boolean) {}
}

export class SetStageLoadedState implements Action {
  readonly type = SET_STAGE_LOADED_STATE;
  constructor(public payload: boolean) {}
}

export class SetEditProjectIndex implements Action {
  readonly type = SET_EDIT_PROJECT_INDEX;
  constructor(public payload: number) {}
}

export class SetEditStageIndex implements Action {
  readonly type = SET_EDIT_STAGE_INDEX;
  constructor(public payload: number) {}
}

export class SetProjectSideInfo implements Action {
  readonly type = SET_PROJECT_SIDE_INFO;
  constructor(public payload: {index: number, projects: ProjectState}) {}
}

export class SetStageSideInfo implements Action {
  readonly type = SET_STAGE_SIDE_INFO;
  constructor(public payload: {index: number, stages: StagesState}) {}
}

export class InitailProjectInfo implements Action {
  readonly type = INITIAL_PROJECT_INFO;
}

export class InitailStageInfo implements Action {
  readonly type = INITIAL_STAGE_INFO;
}

export class TryDeleteProject implements Action {
  readonly type = TRY_DELETE_PROJECT;
  constructor(public payload: string) {}
}

export class TryDeleteStage implements Action {
  readonly type = TRY_DELETE_STAGE;
  constructor(public payload: {uid: string, stageName: string, index: number}) {}
}

export class DeleteProject implements Action {
  readonly type = DELETE_PROJECT;
  constructor(public payload: string) {}
}

export class DeleteStage implements Action {
  readonly type = DELETE_STAGE;
  constructor(public payload: {uid: string, stageName: string, index: number}) {}
}

export class TryAddProject implements Action {
  readonly type = TRY_ADD_PROJECT;
  constructor(public payload: {userData: UserDataState, projectData: ProjectState}) {}
}

export class AddProject implements Action {
  readonly type = ADD_PROJECT;
  constructor(public payload: ProjectState) {}
}

export class TryAddStage implements Action {
  readonly type = TRY_ADD_STAGE;
  constructor(public payload: any) {}
}

export class AddStage implements Action {
  readonly type = ADD_STAGE;
  constructor(public payload: any) {}
}

export class TryUpdateProject implements Action {
  readonly type = TRY_UPDATE_PROJECT;
  constructor(public payload: any) {}
}

export class UpdateProject implements Action {
  readonly type = UPDATE_PROJECT;
  constructor(public payload: any) {}
}

export class TryUpdateStage implements Action {
  readonly type = TRY_UPDATE_STAGE;
  constructor(public payload: any) {}
}

export class UpdateStage implements Action {
  readonly type = UPDATE_STAGE;
  constructor(public payload: any) {}
}

export class BuildHierarchy implements Action {
  readonly type = BUILD_HIERARCHY;
  constructor(public payload: {}) {}
}

export type AuthoringActions = TryLoadProjectsData |
                               LoadProjectsData |
                               TryLoadStagesData |
                               LoadStagesData |
                               SetProjectsLoadedState |
                               SetStageLoadedState |
                               SetEditProjectIndex |
                               SetEditStageIndex |
                               SetProjectSideInfo |
                               SetStageSideInfo |
                               InitailProjectInfo |
                               InitailStageInfo |
                               DeleteProject |
                               DeleteStage |
                               TryAddProject |
                               AddProject |
                               TryAddStage |
                               AddStage |
                               TryUpdateProject|
                               UpdateProject |
                               TryUpdateStage |
                               UpdateStage |
                               BuildHierarchy
                               ;

