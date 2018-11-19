import { AuthoringManagementState } from './../../../model/authoring/authoring.model';
import * as ManagementActions from './management.actions';
// import { ProjectState } from '../../../model/authoring/management.model';
const initialState: AuthoringManagementState = {
  nothing: ''
};

export function authoringManagementRuducer(state = initialState, action) {
  switch (action.type) {
    case ManagementActions.INITAIL_MANAGEMENT_STATE:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
