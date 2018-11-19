import { Action } from '@ngrx/store';
import { SubmitDataState } from '../../../model/authoring/authoring.model';
import { ConditionDataState } from './../../../model/authoring/management.model';
import { StageDataState, DiveDataState, BlocklyDataState, BindingDataState, PassConditionState } from '../../../model/authoring/management.model';

export const LOAD_SELECTED_STAGE = 'LOAD_SELECTED_STAGE';
export const TRY_ADD_DIVE_DATA = 'TRY_ADD_DIVE_DATA';
export const ADD_DIVE_DATA = 'ADD_DIVE_DATA';
export const SET_DIVE_LOADED_STATE = 'SET_DIVE_LOADED_STATE';
export const SET_CHECKED_STATE = 'SET_CHECKED_STATE';
export const SET_DIVE_ID_STATE = 'SET_DIVE_ID_STATE';
export const ADD_HIERARCHY = 'ADD_HIERARCHY';
export const ADD_BLOCKLY_DATA = 'ADD_BLOCKLY_DATA';
export const DELETE_BLOCKLY_DATA = 'DELETE_BLOCKLY_DATA';
export const ADD_BINDING_DATA = 'ADD_BINDING_DATA';
export const ADD_DIAGNOSIS_DATA = 'ADD_DIAGNOSIS_DATA';
export const UPDATE_DIAGNOSIS_DATA = 'UPDATE_DIAGNOSIS_DATA';
export const DELETE_DIAGNOSIS_DATA = 'DELETE_DIAGNOSIS_DATA';
export const ADD_PASS_CONDITION_DATA = 'ADD_PASS_CONDITION_DATA';
export const SUBMIT_ALL_DATA = 'SUBMIT_ALL_DATA';
export const INITAIL_AUTHORING_STAGE_STATE = 'INITAIL_AUTHORING_STAGE_STATE';

export class TryAddDiveData implements Action {
  readonly type = TRY_ADD_DIVE_DATA;
  constructor(public payload: DiveDataState) {}
}

export class AddDiveData implements Action {
  readonly type = ADD_DIVE_DATA;
  constructor(public payload: DiveDataState) {}
}

export class LoadSelectedStage implements Action {
  readonly type = LOAD_SELECTED_STAGE;
  constructor(public payload: StageDataState) {}
}

export class SetDiveLoadedState implements Action {
  readonly type = SET_DIVE_LOADED_STATE;
  constructor(public payload: boolean) {}
}

export class SetDiveIdState implements Action {
  readonly type = SET_DIVE_ID_STATE;
  constructor(public payload: number) {}
}

export class SetCheckedState implements Action {
  readonly type = SET_CHECKED_STATE;
  constructor(public payload: boolean) {}
}

export class AddHierarchy implements Action {
  readonly type = ADD_HIERARCHY;
  constructor(public payload: number) {}
}

export class AddBlocklyDataState implements Action {
  readonly type = ADD_BLOCKLY_DATA;
  constructor(public payload: BlocklyDataState) {}
}

export class DeleteBlocklyDataState implements Action {
  readonly type = DELETE_BLOCKLY_DATA;
  constructor(public payload: BlocklyDataState) {}
}

export class AddBindingData implements Action {
  readonly type = ADD_BINDING_DATA;
  constructor(public payload: BindingDataState) {}
}

export class AddDiagnosisData implements Action {
  readonly type = ADD_DIAGNOSIS_DATA;
  constructor(public payload: ConditionDataState) {}
}

export class UpdateDiagnosisData implements Action {
  readonly type = UPDATE_DIAGNOSIS_DATA;
  constructor(public payload: ConditionDataState[]) {}
}

export class DeleteDiagnosisData implements Action {
  readonly type = DELETE_DIAGNOSIS_DATA;
  constructor(public payload: number) {}
}

export class AddPassConditionData implements Action {
  readonly type = ADD_PASS_CONDITION_DATA;
  constructor(public payload: PassConditionState[]) {}
}

export class SubmitAllData implements Action {
  readonly type = SUBMIT_ALL_DATA;
  constructor(public payload: SubmitDataState) {}
}

export class InitailAuthoringStageState implements Action {
  readonly type = INITAIL_AUTHORING_STAGE_STATE;
}

export type AuthoringStagesActions = LoadSelectedStage |
                                     SetDiveLoadedState |
                                     SetCheckedState |
                                     SetDiveIdState |
                                     AddDiveData |
                                     AddHierarchy |
                                     AddBlocklyDataState |
                                     DeleteBlocklyDataState |
                                     AddDiagnosisData |
                                     UpdateDiagnosisData |
                                     DeleteDiagnosisData |
                                     AddPassConditionData |
                                     SubmitAllData |
                                     InitailAuthoringStageState
                                     ;
