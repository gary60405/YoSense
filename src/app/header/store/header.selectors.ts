import { StepDisplayState, HeaderState } from './../../model/header/header.model';
import { Appstate } from './../../store/app.reducers';
import { createSelector } from '@ngrx/store';

export const stepDisplayStateSelector = createSelector(
  (state: Appstate) => state.header.stepDisplayState,
  (stepDisplayState: StepDisplayState) => stepDisplayState
);
