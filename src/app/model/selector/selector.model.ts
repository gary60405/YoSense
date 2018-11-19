import { ProjectState } from './../authoring/management.model';
import { StagesState } from '../authoring/management.model';
import { UserDataState } from '../auth/auth.model';
export interface AddProjectState {
  email: string;
  project: string[];
  projectData: ProjectState;
}

export interface AddStageState {
  email: string;
  projectUid: string;
  stagesLength: number;
  stageData: StagesState;
}

export interface DeleteProjectState {
  email: string;
  uid: string;
}

export interface DeleteStageState {
  projectUid: string;
  stageUid: string;
  index: number;
}

export interface JoinProjectSetState {
  userData: UserDataState;
  projectCode: string;
}
