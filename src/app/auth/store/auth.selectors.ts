import { createSelector } from '@ngrx/store';
import { Appstate } from '../../store/app.reducers';
import { UserDataState } from '../../model/auth/auth.model';

export const stateTextSelector = createSelector(
  (state: Appstate) => state.auth.stateText,
  (stateText: string) => stateText
);

export const progressbarStateSelector = createSelector(
  (state: Appstate) => state.auth.progressbarState,
  (progressbarState: string) => progressbarState
);

export const dialogueStateSelector = createSelector(
  (state: Appstate) => state.auth.dialogueState,
  (dialogueState: string) => dialogueState
);

export const userDataStateSelector = createSelector(
  (state: Appstate) => state.auth.userData,
  (userData: UserDataState) => userData
);

export const authenticateStateSelector = createSelector(
  (state: Appstate) => state.auth.authenticatedState,
  (authenticatedState: boolean) => authenticatedState
);
