import { Action } from '@ngrx/store';

export const SET_TOAST_DISPLAY_STATE = 'SET_TOAST_DISPLAY_STATE';
export const SET_UPLOAD_PROGRESS = 'SET_UPLOAD_PROGRESS';

export const TRY_PROJECT_UPLOAD_IMAGE = 'TRY_PROJECT_UPLOAD_IMAGE';
export const TRY_STAGE_UPLOAD_IMAGE = 'TRY_STAGE_UPLOAD_IMAGE';

export const UPDATE_TOAST_CONTENT = 'UPDATE_TOAST_CONTENT';

export const INITAIL_TOAST_CONTENT = 'INITAIL_TOAST_CONTENT';
export const INITAIL_MANAGEMENT_STATE = 'INITAIL_MANAGEMENT_STATE';


export class InitailManagementState implements Action {
  readonly type = INITAIL_MANAGEMENT_STATE;
}
export class SetToastDisplayState implements Action {
  readonly type = SET_TOAST_DISPLAY_STATE;
  constructor(public payload: boolean) {}
}
export class SetUploadProgress implements Action {
  readonly type = SET_UPLOAD_PROGRESS;
  constructor(public payload: number) {}
}
export class TryProjectUploadImage implements Action {
  readonly type = TRY_PROJECT_UPLOAD_IMAGE;
  constructor(public payload: string) {}
}
export class TryStageUploadImage implements Action {
  readonly type = TRY_STAGE_UPLOAD_IMAGE;
  constructor(public payload: string) {}
}
export class UpdateToastContent implements Action {
  readonly type = UPDATE_TOAST_CONTENT;
  constructor(public payload: string) {}
}
export class InitailToastContent implements Action {
  readonly type = INITAIL_TOAST_CONTENT;
}

export type AuthoringManagementActions = InitailManagementState
                                        | SetToastDisplayState
                                        | SetUploadProgress
                                        | UpdateToastContent
                                        | InitailToastContent
                                        | TryProjectUploadImage
                                        | TryStageUploadImage
                                        ;

