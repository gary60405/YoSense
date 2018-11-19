import { GlobalState } from './app.model';
import { AuthoringManagementState, AuthoringStageState } from './../authoring/authoring.model';
import { AuthState } from './../auth/auth.model';
import { ManipulationState } from '../manipulation/manipulation.model';
import { HeaderState } from '../header/header.model';
import { ProjectState, StagesState } from '../authoring/management.model';

export interface GlobalState {
  projectData: ProjectState[];
  editProjectIndex: number;
  editStageIndex: number;
  editMode: string;
  projectSideInfo: ProjectState;
  stageSideInfo: StagesState;
  isProjectLoaded: boolean;
  isStageLoaded: boolean;
}

export interface AppState {
  auth: AuthState;
  authoringManagement: AuthoringManagementState;
  authoringStage: AuthoringStageState;
  gloabalData: GlobalState;
  manipulation: ManipulationState;
  header: HeaderState;
}
