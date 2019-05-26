import { AuthoringManagementState } from './../../../model/authoring/authoring.model';
import * as ManagementActions from './management.actions';
const initialState: AuthoringManagementState = {
  toastDisplayState: false,
  toastContent: '',
  uploadProgress: 0,
};

export function authoringManagementRuducer(state = initialState, action) {
  switch (action.type) {
    case ManagementActions.SET_TOAST_DISPLAY_STATE:
        return {
          ...state,
          toastDisplayState: action.payload
        };
    case ManagementActions.SET_UPLOAD_PROGRESS:
          return {
            ...state,
            uploadProgress: action.payload
          };
    case ManagementActions.UPDATE_TOAST_CONTENT:
          return {
            ...state,
            toastContent: `${state.toastContent + action.payload}\n`
          };
    case ManagementActions.INITAIL_TOAST_CONTENT:
          return {
            ...state,
            toastContent: initialState.toastContent
          };
    case ManagementActions.INITAIL_MANAGEMENT_STATE:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
