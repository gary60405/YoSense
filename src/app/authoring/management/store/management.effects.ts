import { UserDataState } from './../../../model/auth/auth.model';
import { map, switchMap, mergeMap, take, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as AppActions from './../../../store/app.actions';
import * as AuthoringManagementActions from './../store/management.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../model/app/app.model';

@Injectable()
export class ManagementEffects {

@Effect()
TryUploadProjectImageEffect = this.action$
  .pipe(
    ofType(AuthoringManagementActions.TRY_PROJECT_UPLOAD_IMAGE),
    withLatestFrom(this.store),
    map(([action, state]) => {
      const projectIndex = state.gloabalData.editProjectIndex;
      return {
        uid: state.gloabalData.projectData[projectIndex].uid,
        payload: action['payload']
      };
    }),
    mergeMap((data: {uid: string, payload: string}) => {
      this.afStore.collection('project').doc(data.uid).update({coverImg: data.payload});
      return [
        {
          type: AppActions.SET_PROJECT_COVER_IMAGE,
          payload: data.payload
        }
      ];
    })
  );

@Effect()
TryUploadStageImageEffect = this.action$
  .pipe(
    ofType(AuthoringManagementActions.TRY_STAGE_UPLOAD_IMAGE),
    withLatestFrom(this.store),
    map(([action, state]) => {
      const projectIndex = state.gloabalData.editProjectIndex;
      const stageIndex = state.gloabalData.editStageIndex;
      return {
        projectUid: state.gloabalData.projectData[projectIndex].uid,
        stageUid: state.gloabalData.projectData[projectIndex].stages[stageIndex].uid,
        payload: action['payload']
      };
    }),
    mergeMap((data: {projectUid: string, stageUid: string, payload: string}) => {
      this.afStore.collection('project').doc(data.projectUid).collection('stage').doc(data.stageUid).update({coverImg: data.payload});
      return [
        {
          type: AppActions.SET_STAGE_COVER_IMAGE,
          payload: data.payload
        }
      ];
    })
  );

constructor(private store: Store<AppState>,
            private action$: Actions,
            public afStore: AngularFirestore) {}
}
