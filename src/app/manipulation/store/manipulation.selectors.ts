import { AppState } from './../../model/app/app.model';
import { createSelector } from '@ngrx/store';
import { UserDataState } from '../../model/auth/auth.model';
import { StagesState, StageDataState } from '../../model/authoring/management.model';

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
  }
);

export const stageLengthSelector  = createSelector(
  (state: AppState) => {
    const editProjectIndex = state.gloabalData.editProjectIndex;
    const selectedProject = state.gloabalData.projectData[editProjectIndex];
    return selectedProject.stages.length;
  });

export const selectedStageSelector  = createSelector(
  (state: AppState) => {
    const editProjectIndex = state.gloabalData.editProjectIndex;
    const editStageIndex = state.gloabalData.editStageIndex;
    const selectedProject = state.gloabalData.projectData[editProjectIndex];
    return selectedProject.stages[editStageIndex];
  },
  (selectedStage: StagesState) => selectedStage
);

export const passConditionSelector = createSelector(
  (state: AppState) => {
    const editProjectIndex = state.gloabalData.editProjectIndex;
    const editStageIndex = state.gloabalData.editStageIndex;
    const selectedProject = state.gloabalData.projectData[editProjectIndex];
    const selectedStage = selectedProject.stages[editStageIndex];
    return selectedStage.stageData.passcondition;
  }
);

export const diagnosisSelector = createSelector(
  (state: AppState) => {
    const editProjectIndex = state.gloabalData.editProjectIndex;
    const editStageIndex = state.gloabalData.editStageIndex;
    const selectedProject = state.gloabalData.projectData[editProjectIndex];
    const selectedStage = selectedProject.stages[editStageIndex];
    return selectedStage.stageData.conditionData;
  }
);

export const diveIdSelector = createSelector(
  (state: AppState) => {
    const editProjectIndex = state.gloabalData.editProjectIndex;
    const editStageIndex = state.gloabalData.editStageIndex;
    const selectedProject = state.gloabalData.projectData[editProjectIndex];
    const selectedStage = selectedProject.stages[editStageIndex];
    return selectedStage.stageData.diveId;
  }
);

export const snackBarStateSelector = createSelector(
  (state: AppState) => state.manipulation.snackBarState
);

export const studentDiveLoadedStateSelector = createSelector(
  (state: AppState) => state.manipulation.isDiveLoaded
);

