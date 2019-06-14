import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState, RouterStateUrl } from '../model/app/app.model';
import { UserDataState } from './../model/auth/auth.model';
import { StagesState } from './../model/authoring/management.model';
import { ProjectState, StageDataState } from './../model/authoring/management.model';
import * as fromRouter from '@ngrx/router-store';
import { AddStageState } from '../model/selector/selector.model';

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');

export const projectDataStateSelector = createSelector(
  (state: AppState) => state.gloabalData.projectData,
  (projectDataState: ProjectState[]) => projectDataState
);
export const projectSideInfoStateSelector = (index: number) => createSelector(
  (state: AppState) => state.gloabalData.projectData,
  (projectDataState: ProjectState[]) => Object.assign({}, projectDataState[index])
);

// TODO:stageDataStateSelector的問題
export const stageDataStateSelector = createSelector(
  (state: AppState) => state.gloabalData.projectData[state.gloabalData.editProjectIndex]['stages'],
  (stageDataState: StagesState[]) => stageDataState
);
export const stageDataSideInfoStateSelector =  (index: number) => createSelector(
  (state: AppState) => {
    const editProjectIndex = state.gloabalData.editProjectIndex;
    return state.gloabalData.projectData[editProjectIndex]['stages'];
  },
  (stageDataState: StagesState[]) => Object.assign({}, stageDataState[index]));

export const selectedStageDataSelector  = createSelector(
  (state: AppState) => {
    const editProjectIndex = state.gloabalData.editProjectIndex;
    const editStageIndex = state.gloabalData.editStageIndex;
    const selectedProject = state.gloabalData.projectData[editProjectIndex];
    return selectedProject.stages[editStageIndex].stageData;
  },
  (selectedStage: StageDataState) => selectedStage
);
export const projectUidStateSelector = createSelector(
  (state: AppState) => {
    const editProjectIndex = state.gloabalData.editProjectIndex;
    const projectDataState = state.gloabalData.projectData[editProjectIndex];
    return projectDataState !== undefined ? projectDataState.uid : null;
  },
  (uid: string) => uid
);

export const deleteDataSetSelector = createSelector(
  (state: AppState, props: number) => {
    const editProjectIndex = state.gloabalData.editProjectIndex;
    const projectUid = state.gloabalData.projectData[editProjectIndex].uid;
    const stage = state.gloabalData.projectData.filter(res => res.uid === projectUid)[0].stages[props];
    const stageUid = stage === undefined ? '' : stage.uid;
    return {projectUid: projectUid, stageUid: stageUid};
  },
  (uid: {projectUid: string, stageUid: string}) => uid
);

export const projectLoadedStateSelector = createSelector(
  (state: AppState) => state.gloabalData.isProjectLoaded,
  (projectLoadedState: boolean) => projectLoadedState
);

export const stageLoadedStateSelector = createSelector(
  (state: AppState) => state.gloabalData.isStageLoaded,
  (stageLoadedStage: boolean) => stageLoadedStage
);

export const projectSideInfoSelector = createSelector(
  (state: AppState) => state.gloabalData.projectSideInfo,
  (projectSideInfo: ProjectState) => projectSideInfo
);

export const stageSideInfoSelector = createSelector(
  (state: AppState) => state.gloabalData.stageSideInfo,
  (stageSideInfo: StagesState) => stageSideInfo
);

export const editModeSelector = createSelector(
  (state: AppState) => state.gloabalData.editMode,
  (editMode: string) => editMode
);

export const addProjectSelector = createSelector(
  (state: AppState) => state.auth.userData,
  (userData: UserDataState, props: ProjectState) => {
    return {
      email: userData.email,
      project: userData.project,
      projectData: props
    };
  }
);

export const addStageSelector = createSelector(
  (state: AppState, props: StagesState) => {
    const editProjectIndex = state.gloabalData.editProjectIndex;
    return {
      email: state.auth.userData.email,
      projectUid: state.gloabalData.projectData[editProjectIndex].uid,
      stagesLength: state.gloabalData.projectData[editProjectIndex]['stages'].length,
      stageData: props
    };
  },
  (stage: AddStageState) => stage
);

export const editProjectIndexSelector = createSelector(
  (state: AppState) => state.gloabalData.editProjectIndex,
  (editProjectIndex: number) => editProjectIndex
);

export const editStageIndexSelector = createSelector(
  (state: AppState) => state.gloabalData.editStageIndex,
  (editStageIndex: number) => editStageIndex
);

