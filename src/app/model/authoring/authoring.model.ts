import { ManagementState, ProjectState, StagesState } from './management.model';
import { EditState } from './edit.model';


export interface AuthoringState {
  managementState: ManagementState;
  editState: EditState;
  editMode: string;
  projectSideInfo: ProjectState;
  stageSideInfo: StagesState;
  isProjectLoaded: boolean;
  isStageLoaded: boolean;
}
