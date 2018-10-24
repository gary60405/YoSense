import { StagesState, ProjectState } from '../authoring/management.model';
export interface ManipulationState {
  editProjectIndex: number;
  editStageIndex: number;
  editMode: string;
  projectSideInfo: ProjectState;
  stageSideInfo: StagesState;
  projectData: ProjectState[];
  stageData: StagesState[];
}
