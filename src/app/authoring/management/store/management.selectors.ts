// import { createSelector } from '@ngrx/store';
// import { AppState } from '../../../model/app/app.model';
// import { UserDataState } from '../../../model/auth/auth.model';
// import { StagesState } from '../../../model/authoring/management.model';
// import { ManagementState, ProjectState, StageDataState } from './../../../model/authoring/management.model';

// export const managementStateSelector = createSelector(
//   (state: AppState) => state.authoringManagement.managementState,
//   (managementState: ManagementState) => managementState
// );

// export const projectDataStateSelector = createSelector(
//   (state: AppState) => state.authoringManagement.managementState.projectDataState,
//   (projectDataState: ProjectState[]) => projectDataState
// );

// export const stageDataStateSelector = createSelector(
//   (state: AppState) => {
//     const editProjectIndex = state.authoringManagement.managementState.editProjectIndex;
//     return state.authoringManagement.managementState.projectDataState[editProjectIndex]['stages'];
//   },
//   (stageDataState: StagesState[]) => stageDataState
// );
// export const selectedStageDataSelector  = createSelector(
//   (state: AppState) => {
//     const editProjectIndex = state.authoringManagement.managementState.editProjectIndex;
//     const editStageIndex = state.authoringManagement.managementState.editStageIndex;
//     const selectedProject = state.authoringManagement.managementState.projectDataState[editProjectIndex];
//     return selectedProject.stages[editStageIndex].stageData;
//   },
//   (selectedStage: StageDataState) => selectedStage
// );
// export const projectUidStateSelector = createSelector(
//   (state: AppState) => {
//     const editProjectIndex = state.authoringManagement.managementState.editProjectIndex;
//     const projectDataState = state.authoringManagement.managementState.projectDataState[editProjectIndex];
//     return projectDataState !== undefined ? projectDataState.uid : null;
//   },
//   (uid: string) => uid
// );

// export const deleteDataSetSelector = createSelector(
//   (state: AppState, props: number) => {
//     const editProjectIndex = state.authoringManagement.managementState.editProjectIndex;
//     const uid = state.authoringManagement.managementState.projectDataState[editProjectIndex]['uid'];
//     const stage = state.authoringManagement.managementState.projectDataState.filter(res => res.uid === uid)[0].stages[props];
//     const stageName = stage === undefined ? '' : stage.name;
//     return {uid: uid, stageName: stageName};
//   },
//   (deleteDataSet: {uid: string, stageName: string}) => deleteDataSet
// );

// export const projectLoadedStateSelector = createSelector(
//   (state: AppState) => state.authoringManagement.isProjectLoaded,
//   (projectLoadedState: boolean) => projectLoadedState
// );

// export const stageLoadedStateSelector = createSelector(
//   (state: AppState) => state.authoringManagement.isStageLoaded,
//   (stageLoadedStage: boolean) => stageLoadedStage
// );

// export const projectSideInfoSelector = createSelector(
//   (state: AppState) => state.authoringManagement.projectSideInfo,
//   (projectSideInfo: ProjectState) => projectSideInfo
// );

// export const stageSideInfoSelector = createSelector(
//   (state: AppState) => state.authoringManagement.stageSideInfo,
//   (stageSideInfo: StagesState) => stageSideInfo
// );

// export const editModeSelector = createSelector(
//   (state: AppState) => state.authoringManagement.editMode,
//   (editMode: string) => editMode
// );

// export const addProjectSelector = createSelector(
//   (state: AppState) => state.auth.userData,
//   (data: UserDataState) => data
// );



