import { StepDisplayState } from './../../model/header/header.model';
import { AppState } from './../../model/app/app.model';
import { createSelector } from '@ngrx/store';

export const stepDisplayStateSelector = createSelector(
  (state: AppState) => state.header.stepDisplayState,
  (stepDisplayState: StepDisplayState) => stepDisplayState
);
