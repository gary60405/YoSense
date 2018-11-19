import { StagesState, ProjectState } from '../authoring/management.model';
export interface ManipulationState {
  isDiveLoaded: boolean;
  snackBarState: SnackBarState;
  blocklyData: string;
}

export interface SnackBarState {
  isOpen: boolean;
  content: string;
}
