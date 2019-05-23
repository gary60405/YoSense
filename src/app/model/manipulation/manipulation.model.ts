export interface ManipulationState {
  isDiveLoaded: boolean;
  snackBarState: SnackBarState;
  diveState: string;
  workspaceState: string;
}

export interface SnackBarState {
  isOpen: boolean;
  content: string;
}
