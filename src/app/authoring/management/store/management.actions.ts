import { Action } from '@ngrx/store';

export const INITAIL_MANAGEMENT_STATE = 'INITAIL_MANAGEMENT_STATE';


export class InitailManagementState implements Action {
  readonly type = INITAIL_MANAGEMENT_STATE;
}

export type AuthoringManagementActions = InitailManagementState;

