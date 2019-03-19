export interface ManipulationState {
  isDiveLoaded: boolean;
  snackBarState: SnackBarState;
  diveState: string;
}

export interface SnackBarState {
  isOpen: boolean;
  content: string;
}
