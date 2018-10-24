import { ManagementState, ProjectState } from './../../model/authoring/management.model';
import { Appstate } from './../../store/app.reducers';
import { createSelector } from '@ngrx/store';
import { StagesState, DiveDataState } from '../../model/authoring/management.model';
import { UserDataState } from '../../model/auth/auth.model';

export const hierarchyDataSelector = createSelector(
  (state: Appstate) => state.authoring.editState.hierarchyData,
  (hierarchyData: {}) => hierarchyData
);

export const managementStateSelector = createSelector(
  (state: Appstate) => state.authoring.managementState,
  (managementState: ManagementState) => managementState
);

export const projectDataStateSelector = createSelector(
  (state: Appstate) => state.authoring.managementState.projectDataState,
  (projectDataState: ProjectState[]) => projectDataState
);

export const stageDataStateSelector = createSelector(
  (state: Appstate) => {
    const editProjectIndex = state.authoring.managementState.editProjectIndex;
    return state.authoring.managementState.projectDataState[editProjectIndex]['stages'];
  },
  (stageDataState: StagesState[]) => stageDataState
);

export const projectUidStateSelector = createSelector(
  (state: Appstate) => {
    const editProjectIndex = state.authoring.managementState.editProjectIndex;
    return state.authoring.managementState.projectDataState[editProjectIndex]['uid'];
  },
  (stageDataState: string) => stageDataState
);

export const deleteDataSetSelector = createSelector(
  (state: Appstate, props: number) => {
    const uid = state.authoring.projectSideInfo.uid;
    const stageName = state.authoring.managementState.projectDataState.filter(res => res.uid === uid)[0].stages[props].name;
    return {uid: uid, stageName: stageName};
  },
  (deleteDataSet: {uid: string, stageName: string}) => deleteDataSet
);

export const projectLoadedStateSelector = createSelector(
  (state: Appstate) => state.authoring.isProjectLoaded,
  (projectLoadedState: boolean) => projectLoadedState
);

export const stageLoadedStateSelector = createSelector(
  (state: Appstate) => state.authoring.isStageLoaded,
  (stageLoadedStage: boolean) => stageLoadedStage
);

export const projectSideInfoSelector = createSelector(
  (state: Appstate) => state.authoring.projectSideInfo,
  (projectSideInfo: ProjectState) => projectSideInfo
);

export const stageSideInfoSelector = createSelector(
  (state: Appstate) => state.authoring.stageSideInfo,
  (stageSideInfo: StagesState) => stageSideInfo
);

export const editModeSelector = createSelector(
  (state: Appstate) => state.authoring.editMode,
  (editMode: string) => editMode
);

export const addProjectSelector = createSelector(
  (state: Appstate) => state.auth.userData,
  (data: UserDataState) => data
);

export const diveDataSelector = createSelector(
  (state: Appstate) => state.authoring.editState.diveData,
  (diveData: DiveDataState) => diveData
);

