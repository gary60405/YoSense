import { AuthoringManagementState, AuthoringStageState } from './../authoring/authoring.model';
import { AuthState } from './../auth/auth.model';
import { ManipulationState } from '../manipulation/manipulation.model';
import { HeaderState } from '../header/header.model';
import { ProjectState, StagesSideInfoState, ProjectSideInfoState } from '../authoring/management.model';
import { BlocklyState } from '../authoring/blockly.model';
import { Params } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface GlobalState {
  projectData: ProjectState[];
  editProjectIndex: number;
  editStageIndex: number;
  editMode: string;
  projectSideInfo: ProjectSideInfoState;
  stageSideInfo: StagesSideInfoState;
  isProjectLoaded: boolean;
  isStageLoaded: boolean;
}

export interface AppState {
  auth: AuthState;
  authoringManagement: AuthoringManagementState;
  authoringStage: AuthoringStageState;
  blockly: BlocklyState;
  gloabalData: GlobalState;
  manipulation: ManipulationState;
  header: HeaderState;
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}
