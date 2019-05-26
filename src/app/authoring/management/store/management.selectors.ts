import { createSelector } from '@ngrx/store';
import { AppState } from '../../../model/app/app.model';

export const toastDisplayStateSelector = createSelector(
  (state: AppState) => state.authoringManagement.toastDisplayState,
  (toastState: boolean) => toastState
);
export const toastContentStateSelector = createSelector(
  (state: AppState) => state.authoringManagement.toastContent,
  (toastContent: string) => toastContent
);
export const uploadProgressStateSelector = createSelector(
  (state: AppState) => state.authoringManagement.uploadProgress,
  (uploadProgress: number) => uploadProgress
  );
export const uploadProjectInfoSelector = createSelector(
    (state: AppState) => state.auth.userData.email,
    (state: AppState) => state.gloabalData.projectData[state.gloabalData.editProjectIndex].uid,
    (email: string, uid: string) => {
      return {email: email, uid: uid};
    }
);
export const uploadStageInfoSelector = createSelector(
    (state: AppState) => state.auth.userData.email,
    (state: AppState) => state.gloabalData.projectData[state.gloabalData.editProjectIndex].uid,
    (state: AppState) => state.gloabalData.projectData[state.gloabalData.editProjectIndex].stages[state.gloabalData.editStageIndex].uid,
    (email: string, projectUid: string, stageUid: string) => {
      return {email: email, projectUid: projectUid, stageUid: stageUid};
    }
);




