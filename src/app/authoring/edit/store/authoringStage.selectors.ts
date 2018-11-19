import { createSelector } from '@ngrx/store';

import { DiveDataState, BlocklyDataState, ConditionDataState, StagesState } from '../../../model/authoring/management.model';
import { AppState } from '../../../model/app/app.model';
import { BindingDataState, PassConditionState } from '../../../model/authoring/management.model';
import { EditState } from '../../../model/authoring/edit.model';



export const diveLoadedStateSelector = createSelector(
  (state: AppState) => state.authoringStage.toggleState.isDiveLoaded,
  (loadedState: boolean) => loadedState
);

export const diveIdCheckedSelector = createSelector(
  (state: AppState) => state.authoringStage.toggleState.isChecked,
  (checkedState: boolean) => checkedState
);

export const diveDataSelector = createSelector(
  (state: AppState) => state.authoringStage.editState.diveData,
  (diveData: DiveDataState) => diveData
 );

export const selectedStageDateSelector  = createSelector(
  (state: AppState) => {
    const editProjectIndex = state.gloabalData.editProjectIndex;
    const editStageIndex = state.gloabalData.editStageIndex;
    const selectedProject = state.gloabalData.projectData[editProjectIndex];
    const lastModify = selectedProject !== undefined ? selectedProject.stages[editStageIndex].lastModify : new Date();
    const createDate = selectedProject !== undefined ? selectedProject.stages[editStageIndex].createDate : new Date();
    return {lastModify: lastModify, createDate: createDate};
  },
  (date: {lastModify: Date, createDate: Date}) => date
);

export const hierarchyDataSelector = createSelector(
  (state: AppState) => state.authoringStage.editState.hierarchyData,
  (hierarchyData: {}) => hierarchyData
);

export const blocklyDataSelector = createSelector(
  (state: AppState) => state.authoringStage.editState.blocklyData,
  (blocklyData: BlocklyDataState[]) => blocklyData
 );

export const bindingDataSelector = createSelector(
  (state: AppState) => state.authoringStage.editState.bindingData,
  (bindingData: BindingDataState[]) => bindingData
);

export const conditionDataSelector = createSelector(
  (state: AppState) => state.authoringStage.editState.conditionData,
  (conditionData: ConditionDataState[]) => conditionData
);

export const operatersSelector = createSelector(
  (state: AppState) => state.authoringStage.editState.operators,
  (operators: string[]) => operators
);

export const passConditionSelector = createSelector(
  (state: AppState) => state.authoringStage.editState.passConditionData,
  (passConditionData: PassConditionState[]) => passConditionData
);

export const submitDataSelector = createSelector(
  (state: AppState) => state.authoringStage.editState,
  (state: AppState) => {
    const projectIndex = state.gloabalData.editProjectIndex;
    const stageIndex = state.gloabalData.editStageIndex;
    const projectData = state.gloabalData.projectData[projectIndex];
    const projectUid = projectData.uid;
    const stageState = projectData.stages[stageIndex];
    return {uid: projectUid, stageInfo: stageState};
  },
  (editState: EditState, submitDataSet: {uid: string, stageInfo: StagesState}) => {
    return {
      editState: editState,
      ...submitDataSet
    };
  }
);
