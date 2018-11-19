import { ManagementState, ProjectState, StagesState } from './management.model';
import { EditState } from './edit.model';


export interface AuthoringManagementState {
  nothing: string;
}

export interface AuthoringStageState {
  toggleState: ToggleState;
  editState: EditState;
}

export interface ToggleState {
  isDiveLoaded: boolean;
  isChecked: boolean;
}

export interface SubmitDataState {
  uid: string;
  editState: EditState;
  stageInfo: StagesState;
}

export interface HierarchyState {
  name: string;
  states: HierarchyDataState[];
}

export interface HierarchyDataState {
  class: string;
  stateName: string;
  diveData: HierarchyDiveDataState;
}

export interface HierarchyDiveDataState {
  diveName: string;
  diveNumber: string;
  diveValue: string;
}
