import { Action } from '@ngrx/store';
import { UserDataState } from './../model/auth/auth.model';
import { ProjectState, StagesState, StagesSideInfoState } from './../model/authoring/management.model';
import { AddProjectState, DeleteStageState, DeleteProjectState, JoinProjectSetState } from '../model/selector/selector.model';
import { ProjectSideInfoState } from '../model/authoring/management.model';

export const TRY_LOAD_PROJECTS_DATA = 'TRY_LOAD_PROJECTS_DATA';
export const LOAD_PROJECTS_DATA = 'LOAD_PROJECTS_DATA';
export const TRY_LOAD_STAGES_DATA = 'TRY_LOAD_STAGES_DATA';
export const LOAD_STAGES_DATA = 'LOAD_STAGES_DATA';
export const SET_EDIT_MODE_STATE = 'SET_EDIT_MODE_STATE';
export const SET_PROJECTS_LOADED_STATE = 'SET_PROJECTS_LOADED_STATE';
export const SET_STAGE_LOADED_STATE = 'SET_STAGE_LOADED_STATE';
export const SET_EDIT_PROJECT_INDEX = 'SET_EDIT_PROJECT_INDEX';
export const SET_EDIT_STAGE_INDEX = 'SET_EDIT_STAGE_INDEX';
export const SET_PROJECT_COVER_IMAGE = 'SET_PROJECT_COVER_IMAGE';
export const SET_STAGE_COVER_IMAGE = 'SET_STAGE_COVER_IMAGE';
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
export const TRY_UPDATE_PROJECT_INFO = 'TRY_UPDATE_PROJECT_INFO';
export const TRY_UPDATE_STAGE_INFO = 'TRY_UPDATE_STAGE_INFO';
export const UPDATE_PROJECT_INFO = 'UPDATE_PROJECT_INFO';
export const UPDATE_STAGE_INFO = 'UPDATE_STAGE_INFO';
export const TRY_DELETE_USER_PROJECT = 'TRY_DELETE_USER_PROJECT';
export const TRY_ADD_USER_PROJECT = 'TRY_ADD_USER_PROJECT';
export const INITAIL_APP_STATE = 'INITAIL_APP_STATE';
export const TRY_INITAIL_PROJECT_STATE = 'TRY_INITAIL_PROJECT_STATE';
export const TRY_INITAIL_STAGE_STATE = 'TRY_INITAIL_STAGE_STATE';
export const TRY_LOGOUT = 'TRY_LOGOUT';

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

export class SetProjectCoverImage implements Action {
  readonly type = SET_PROJECT_COVER_IMAGE;
  constructor(public payload: string) {}
}
export class SetStageCoverImage implements Action {
  readonly type = SET_STAGE_COVER_IMAGE;
  constructor(public payload: string) {}
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
  constructor(public payload: ProjectSideInfoState) {}
}

export class SetStageSideInfo implements Action {
  readonly type = SET_STAGE_SIDE_INFO;
  constructor(public payload: StagesSideInfoState) {}
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
  constructor(public payload: DeleteStageState) {}
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
  constructor(public payload: AddProjectState) {}
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

export class TryUpdateProjectInfo implements Action {
  readonly type = TRY_UPDATE_PROJECT_INFO;
  constructor(public payload: any) {}
}

export class UpdateProjectInfo implements Action {
  readonly type = UPDATE_PROJECT_INFO;
  constructor(public payload: any) {}
}

export class TryUpdateStageInfo implements Action {
  readonly type = TRY_UPDATE_STAGE_INFO;
  constructor(public payload: any) {}
}

export class UpdateStageInfo implements Action {
  readonly type = UPDATE_STAGE_INFO;
  constructor(public payload: any) {}
}

export class TryDeleteUserProject implements Action {
  readonly type = TRY_DELETE_USER_PROJECT;
  constructor(public payload: DeleteProjectState) {}
}

export class TryAddUserProject implements Action {
  readonly type = TRY_ADD_USER_PROJECT;
  constructor(public payload: JoinProjectSetState) {}
}

export class InitialAppState implements Action {
  readonly type = INITAIL_APP_STATE;
}

export class TryInitialProjectState implements Action {
  readonly type = TRY_INITAIL_PROJECT_STATE;
}

export class TryInitialStageState implements Action {
  readonly type = TRY_INITAIL_STAGE_STATE;
}

export class TryLogout implements Action {
  readonly type = TRY_LOGOUT;
}
export type AppActions = TryLoadProjectsData |
                         LoadProjectsData |
                         TryLoadStagesData |
                         LoadStagesData |
                         SetProjectsLoadedState |
                         SetStageLoadedState |
                         SetEditProjectIndex |
                         SetEditStageIndex |
                         SetProjectCoverImage |
                         SetStageCoverImage |
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
                         TryUpdateProjectInfo |
                         UpdateProjectInfo |
                         TryUpdateStageInfo |
                         UpdateStageInfo |
                         TryDeleteUserProject |
                         TryAddUserProject |
                         InitialAppState |
                         TryLogout |
                         TryInitialProjectState |
                         TryInitialStageState
                         ;

