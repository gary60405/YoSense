import { createSelector } from '@ngrx/store';
import { AppState } from './../../model/app/app.model';
import { UserDataState } from '../../model/auth/auth.model';

export const stateTextSelector = createSelector(
  (state: AppState) => state.auth.stateText,
  (stateText: string) => stateText
);

export const progressbarStateSelector = createSelector(
  (state: AppState) => state.auth.progressbarState,
  (progressbarState: string) => progressbarState
);

export const dialogueStateSelector = createSelector(
  (state: AppState) => state.auth.dialogueState,
  (dialogueState: string) => dialogueState
);

export const userDataStateSelector = createSelector(
  (state: AppState) => state.auth.userData,
  (userData: UserDataState) => userData
);

export const authenticateStateSelector = createSelector(
  (state: AppState) => state.auth.authenticatedState,
  (authenticatedState: boolean) => authenticatedState
);
