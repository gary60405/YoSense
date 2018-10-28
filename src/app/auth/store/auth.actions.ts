import { Action } from '@ngrx/store';
import { UserDataState, AuthState } from '../../model/auth/auth.model';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const SIGNUP = 'SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const INITAIL_DIALOGUE = 'INITAIL_DIALOGUE';
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const UPDATE_USER_PROJECT = 'UPDATE_USER_PROJECT';
export const DELETE_USER_PROJECT = 'DELETE_USER_PROJECT';

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;
  constructor(public payload: UserDataState) {}
}

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;
  constructor(public payload: {email: string, password: string}) {}
}

export class Signup implements Action {
  readonly type = SIGNUP;
  constructor(public payload: AuthState) {}
}

export class Signin implements Action {
  readonly type = SIGNIN;
  constructor(public payload: AuthState) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class InitailDialogue implements Action {
  readonly type = INITAIL_DIALOGUE;
}

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class UpdateUserProject implements Action {
  readonly type = UPDATE_USER_PROJECT;
  constructor(public payload: string[]) {}
}

export class DeleteUserProject implements Action {
  readonly type = DELETE_USER_PROJECT;
  constructor(public payload: string) {}
}


export type AuthActions = Signup |
                          Signin |
                          Logout |
                          TrySignup |
                          TrySignin |
                          InitailDialogue |
                          SetAuthenticated |
                          UpdateUserProject |
                          DeleteUserProject;
