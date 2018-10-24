export interface AuthState {
  userData: UserDataState;
  stateText: string;
  progressbarState: string;
  dialogueState: string;
  authenticatedState: boolean;
}

export interface UserDataState {
  email: string;
  password: string;
  createDate: Date;
  displayName: string;
  identification: string;
  project: string[];
}

