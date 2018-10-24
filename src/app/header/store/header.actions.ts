import { Action } from '@ngrx/store';

export const SET_STEP_DISPLAY_STATE = 'SET_STEP_DISPLAY_STATE';
export const INITAIL_STEP_DISPLAY_STATE = 'INITAIL_STEP_DISPLAY_STATE';

export class SetStepDisplayState implements Action {
  readonly type = SET_STEP_DISPLAY_STATE;
  constructor(public payload: string) {}
}

export class InitailStepDisplayState implements Action {
  readonly type = INITAIL_STEP_DISPLAY_STATE;
}

export type HeaderActions = SetStepDisplayState |
                            InitailStepDisplayState;

