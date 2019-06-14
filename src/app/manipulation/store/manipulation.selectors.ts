import { AppState } from './../../model/app/app.model';
import { createSelector } from '@ngrx/store';
import { UserDataState } from '../../model/auth/auth.model';
import { StagesState, PassConditionState, ConditionDataState } from '../../model/authoring/management.model';
import { BlockBuildState } from '../../model/authoring/blockly.model';
import { HierarchyState } from '../../model/authoring/authoring.model';
import { SnackBarState } from '../../model/manipulation/manipulation.model';

export const diveStateSelector = createSelector(
  (state: AppState) => state.manipulation.diveState,
  (diveState: string) => diveState
);

export const initailWorkspaceSelector = createSelector(
  (state: AppState) => state.manipulation.workspaceState,
  (state: AppState) => {
    const projectIndex = state.gloabalData.editProjectIndex;
    const stageIndex = state.gloabalData.editStageIndex;
    return state.gloabalData.projectData[projectIndex].stages[stageIndex].stageData.blocklyData.customBlocksState;
  },
  (workspaceState: string, customBlocks: BlockBuildState[]) => {
    return { workspaceState: workspaceState, customBlocks: customBlocks };
  }
);

export const joinProjectSetSelector = createSelector(
  (state: AppState, props: string) => state.auth.userData,
  (userData: UserDataState, props: string) => {
    return {
      userData: userData,
      projectCode: props
    };
  }
);

export const deleteProjectSelector = createSelector(
  (state: AppState, props: number) => {
    if (state.gloabalData.projectData.length > props) {
      return {
        email: state.auth.userData.email,
        uid: state.gloabalData.projectData[props].uid
      };
    }
  },
  (deleteProject: {email: string, uid: string}) => deleteProject
);

export const stageLengthSelector  = createSelector(
  (state: AppState) => {
    const editProjectIndex = state.gloabalData.editProjectIndex;
    const selectedProject = state.gloabalData.projectData[editProjectIndex];
    return selectedProject.stages.length;
  },
  (length: number) => length
  );

export const selectedStageSelector  = createSelector(
  (state: AppState) => {
    const editProjectIndex = state.gloabalData.editProjectIndex;
    const editStageIndex = state.gloabalData.editStageIndex;
    return state.gloabalData.projectData[editProjectIndex].stages[editStageIndex];
  },
  (selectedStage: StagesState) => selectedStage
);

export const passConditionSelector = createSelector(
  (state: AppState) => {
    const editProjectIndex = state.gloabalData.editProjectIndex;
    const editStageIndex = state.gloabalData.editStageIndex;
    const selectedStage = state.gloabalData.projectData[editProjectIndex].stages[editStageIndex];
    return selectedStage.stageData.passcondition;
  },
  (passcondition: PassConditionState[]) => passcondition
);

export const diagnosisSelector = createSelector(
  (state: AppState) => {
    const editProjectIndex = state.gloabalData.editProjectIndex;
    const editStageIndex = state.gloabalData.editStageIndex;
    const selectedProject = state.gloabalData.projectData[editProjectIndex];
    const selectedStage = selectedProject.stages[editStageIndex];
    return selectedStage.stageData.conditionData;
  },
  (conditionData: ConditionDataState[]) => conditionData
);

export const diveIdSelector = createSelector(
  (state: AppState) => {
    const editProjectIndex = state.gloabalData.editProjectIndex;
    const editStageIndex = state.gloabalData.editStageIndex;
    const selectedProject = state.gloabalData.projectData[editProjectIndex];
    const selectedStage = selectedProject.stages[editStageIndex];
    return selectedStage.stageData.diveId;
  },
  (diveId: string) => diveId
);

export const snackBarStateSelector = createSelector(
  (state: AppState) => state.manipulation.snackBarState,
  (snackBarState: SnackBarState) => snackBarState
);

export const studentDiveLoadedStateSelector = createSelector(
  (state: AppState) => state.manipulation.isDiveLoaded,
  (isDiveLoaded: boolean) => isDiveLoaded
);

export const manipulateHierarchyDataSelector = createSelector(
  (state: AppState) => {
    const projectIndex = state.gloabalData.editProjectIndex;
    const stageIndex = state.gloabalData.editStageIndex;
    return state.gloabalData.projectData[projectIndex].stages[stageIndex].stageData.hierarchyData;
  },
  (hierarchyData: HierarchyState[]) => hierarchyData
);

