import { Action } from '@ngrx/store';
import { SubmitDataState } from '../../../model/authoring/authoring.model';
import { ConditionDataState } from './../../../model/authoring/management.model';
import { StageDataState, DiveDataState, PassConditionState } from '../../../model/authoring/management.model';
import { BlockBuildState, ToolBoxState } from '../../../model/authoring/blockly.model';

export const TRY_LOAD_SELECTED_STAGE = 'TRY_LOAD_SELECTED_STAGE';
export const LOAD_SELECTED_STAGE = 'LOAD_SELECTED_STAGE';
export const TRY_ADD_DIVE_DATA = 'TRY_ADD_DIVE_DATA';
export const ADD_DIVE_DATA = 'ADD_DIVE_DATA';
export const SET_DIVE_LOADED_STATE = 'SET_DIVE_LOADED_STATE';
export const SET_CHECKED_STATE = 'SET_CHECKED_STATE';
export const SET_DIVE_ID_STATE = 'SET_DIVE_ID_STATE';
export const ADD_HIERARCHY = 'ADD_HIERARCHY';
export const ADD_BLOCKLY_DATA = 'ADD_BLOCKLY_DATA';
export const DELETE_BLOCKLY_DATA = 'DELETE_BLOCKLY_DATA';
export const ADD_DIAGNOSIS_DATA = 'ADD_DIAGNOSIS_DATA';
export const UPDATE_DIAGNOSIS_DATA = 'UPDATE_DIAGNOSIS_DATA';
export const DELETE_DIAGNOSIS_DATA = 'DELETE_DIAGNOSIS_DATA';
export const ADD_PASS_CONDITION_DATA = 'ADD_PASS_CONDITION_DATA';
export const SUBMIT_ALL_DATA = 'SUBMIT_ALL_DATA';
export const INITAIL_AUTHORING_STAGE_STATE = 'INITAIL_AUTHORING_STAGE_STATE';

export const SET_CODE_FONT_SIZE = 'SET_CODE_FONT_SIZE';
export const SET_BLOCK_CODE_STATE = 'SET_BLOCK_CODE_STATE';

export const ADD_CATEGORY_BLOCK = 'ADD_CATEGORY_BLOCK';
export const ADD_CUSTOM_BLOCK = 'ADD_CUSTOM_BLOCK';
export const DELETE_CUSTOM_BLOCK = 'DELETE_CUSTOM_BLOCK';
export const DELETE_CATEGORY_BLOCK = 'DELETE_CATEGORY_BLOCK';
export const UPDATE_CUSTOM_BLOCK = 'UPDATE_CUSTOM_BLOCK';
export const SET_BLOCK_ENABLE_STATE = 'SET_BLOCK_ENABLE_STATE';


export class SetCodeFontSize implements Action {
  readonly type = SET_CODE_FONT_SIZE;
  constructor(public payload: number) {}
}
export class SetBlockCodeState implements Action {
  readonly type = SET_BLOCK_CODE_STATE;
  constructor(public payload: string) {}
}

export class TryAddDiveData implements Action {
  readonly type = TRY_ADD_DIVE_DATA;
  constructor(public payload: DiveDataState) {}
}

export class AddDiveData implements Action {
  readonly type = ADD_DIVE_DATA;
  constructor(public payload: DiveDataState) {}
}

export class TryLoadSelectedStage implements Action {
  readonly type = TRY_LOAD_SELECTED_STAGE;
  constructor(public payload: StageDataState) {}
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

export class AddCategoryBlock implements Action {
  readonly type = ADD_CATEGORY_BLOCK;
  constructor(public payload: ToolBoxState) {}
}

export class DeleteCategoryBlock implements Action {
  readonly type = DELETE_CATEGORY_BLOCK;
  constructor(public payload: ToolBoxState) {}
}

export class AddCustomBlock implements Action {
  readonly type = ADD_CUSTOM_BLOCK;
}

export class DeleteCustomBlock implements Action {
  readonly type = DELETE_CUSTOM_BLOCK;
  constructor(public payload: string) {}
}

export class UpdateCustomBlock implements Action {
  readonly type = UPDATE_CUSTOM_BLOCK;
  constructor(public payload: BlockBuildState) {}
}

export class SetBlockEnableState implements Action {
  readonly type = SET_BLOCK_ENABLE_STATE;
  constructor(public payload: {checked: boolean, id: string}) {}
}

export type AuthoringStagesActions = TryLoadSelectedStage |
                                     LoadSelectedStage |
                                     SetCodeFontSize |
                                     SetBlockCodeState |
                                     SetDiveLoadedState |
                                     SetCheckedState |
                                     SetDiveIdState |
                                     AddDiveData |
                                     AddHierarchy |
                                     AddDiagnosisData |
                                     UpdateDiagnosisData |
                                     DeleteDiagnosisData |
                                     AddPassConditionData |
                                     SubmitAllData |
                                     InitailAuthoringStageState |
                                     AddCategoryBlock |
                                     DeleteCategoryBlock |
                                     AddCustomBlock |
                                     DeleteCustomBlock |
                                     UpdateCustomBlock |
                                     SetBlockEnableState
                                     ;
