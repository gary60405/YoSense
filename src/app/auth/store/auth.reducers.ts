import { AuthState } from '../../model/auth/auth.model';
import * as AuthActions from './auth.actions';
const initialState: AuthState = {
  userData: {
    email: '',
    password: '',
    createDate: undefined,
    displayName: '',
    identification: '',
    project: [],
  },
  stateText: 'NONE_STATE',
  progressbarState: 'NONE_STATE',
  dialogueState: 'NONE_STATE',
  authenticatedState: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.TRY_SIGNUP:
      return {
        ...state,
        progressbarState: 'OPEN'
      };
    case AuthActions.SIGNUP:
      return {
        ...state,
        stateText: action.payload.stateText,
        progressbarState: action.payload.progressbarState,
        dialogueState: action.payload.dialogueState
      };
    case AuthActions.TRY_SIGNIN:
      return {
        ...state,
        progressbarState: 'OPEN'
      };
    case AuthActions.SIGNIN:
      return {
        ...state,
        userData: action.payload.userData,
        stateText: action.payload.stateText,
        progressbarState: action.payload.progressbarState,
        dialogueState: action.payload.dialogueState
      };
    case AuthActions.LOGOUT:
      return {
        ...initialState
      };
    case AuthActions.INITAIL_DIALOGUE:
      return {
        ...state,
        dialogueState: 'CLOSE_DIALOGUE'
      };
    case AuthActions.SET_AUTHENTICATED:
      return {
        ...state,
        authenticatedState: true
      };
    case AuthActions.UPDATE_USER_PROJECT:
      return {
        ...state,
        userData: {
          ...state.userData,
          project: [...action.payload]
        }
      };
    default:
      return state;
  }
}
