import { Action } from '@ngrx/store';
import { StagesState } from '../../model/authoring/management.model';


export const INITAIL_MANIPULATION_STATE = 'INITAIL_MANIPULATION_STATE';
export const TRY_LOAD_DIVE = 'TRY_LOAD_DIVE';
export const SET_STUDENT_DIVE_LOADED_STATE = 'SET_STUDENT_DIVE_LOADED_STATE';
export const SET_SNACKBAR_OPEN_STATE = 'SET_SNACKBAR_OPEN_STATE';
export const SET_SNACKBAR_CONTENT = 'SET_SNACKBAR_CONTENT';
export const BUILD_BLOCKLY_WORKSPACE = 'BUILD_BLOCKLY_WORKSPACE';
export const SET_BLOCKLY_TRANSFORMED_STATE = 'SET_BLOCKLY_TRANSFORMED_STATE';

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

export class BuildBlocklyWorkSpace implements Action {
  readonly type = BUILD_BLOCKLY_WORKSPACE;
  constructor(public payload: StagesState) {}
}

export class SetBlocklyTransformedState implements Action {
  readonly type = SET_BLOCKLY_TRANSFORMED_STATE;
  constructor(public payload: string) {}
}
export type ManipulationActions = InitialManipulationState |
                                  TryLoadDive |
                                  SetStudentDiveLoadedState |
                                  SetSnackbarOpenState |
                                  SetSnackbarContent |
                                  BuildBlocklyWorkSpace |
                                  SetBlocklyTransformedState
                                  ;

