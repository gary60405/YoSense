import { Action } from '@ngrx/store';
import { StagesState } from '../../model/authoring/management.model';


export const INITAIL_MANIPULATION_STATE = 'INITAIL_MANIPULATION_STATE';
export const TRY_LOAD_DIVE = 'TRY_LOAD_DIVE';
export const TRY_INITIAL_WORKSPACE = 'TRY_INITIAL_WORKSPACE';
export const SET_STUDENT_DIVE_LOADED_STATE = 'SET_STUDENT_DIVE_LOADED_STATE';
export const SET_SNACKBAR_OPEN_STATE = 'SET_SNACKBAR_OPEN_STATE';
export const SET_SNACKBAR_CONTENT = 'SET_SNACKBAR_CONTENT';
export const SET_DIVE_STATE = 'SET_DIVE_STATE';
export const SET_WORKSPACE_STATE = 'SET_WORKSPACE_STATE';

export class InitialManipulationState implements Action {
  readonly type = INITAIL_MANIPULATION_STATE;
}

export class TryLoadDive implements Action {
  readonly type = TRY_LOAD_DIVE;
}

export class SetStudentDiveLoadedState implements Action {
  readonly type = SET_STUDENT_DIVE_LOADED_STATE;
  constructor(public payload: boolean) {}
}

export class SetSnackbarOpenState implements Action {
  readonly type = SET_SNACKBAR_OPEN_STATE;
  constructor(public payload: boolean) {}
}

export class SetSnackbarContent implements Action {
  readonly type = SET_SNACKBAR_CONTENT;
  constructor(public payload: string) {}
}

export class TryInitialWorkspace implements Action {
  readonly type = TRY_INITIAL_WORKSPACE;
}

export class SetDiveState implements Action {
  readonly type = SET_DIVE_STATE;
  constructor(public payload: string) {}
}

export class SetWorkspaceState implements Action {
  readonly type = SET_WORKSPACE_STATE;
  constructor(public payload: string) {}
}

export type ManipulationActions = InitialManipulationState |
                                  TryLoadDive |
                                  SetStudentDiveLoadedState |
                                  SetSnackbarOpenState |
                                  SetSnackbarContent |
                                  TryInitialWorkspace |
                                  SetDiveState |
                                  SetWorkspaceState
                                  ;

