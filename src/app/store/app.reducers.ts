import { ManipulationState } from './../model/manipulation/manipulation.model';
import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducers';
import * as fromAuthoring from '../authoring/store/authoring.reducers';
import * as fromManipulation from '../manipulation/store/manipulation.reducers';
import * as fromHeader from '../header/store/header.reducers';
import { AuthoringState } from '../model/authoring/authoring.model';
import { AuthState } from '../model/auth/auth.model';
import { HeaderState } from '../model/header/header.model';

export interface Appstate {
  auth: AuthState;
  authoring: AuthoringState;
  manipulation: ManipulationState;
  header: HeaderState;
}

export const reducers: ActionReducerMap<Appstate> = {
  auth: fromAuth.authReducer,
  authoring: fromAuthoring.authoringRuducer,
  manipulation: fromManipulation.manipulationRuducer,
  header: fromHeader.headerReducer,
};



