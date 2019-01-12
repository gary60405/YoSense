import { SubmitDataState } from '../../../model/authoring/authoring.model';
import { Injectable } from '@angular/core';
import * as AuthoringStageActions from './authoringStage.actions';
import * as HeaderActions from '../../../header/store/header.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { DiveDataState, StageDataState } from '../../../model/authoring/management.model';

@Injectable()
export class AuthoringStageEffects {

@Effect()
SumitAllDataEffect = this.action$
.pipe(
    ofType(AuthoringStageActions.SUBMIT_ALL_DATA),
    map((action: AuthoringStageActions.SubmitAllData) => action.payload),
    mergeMap((submitData: SubmitDataState) => {
      delete submitData.editState.operators;
      this.afStore.doc(`project/${submitData.uid}/stage/${submitData.stageInfo.uid}`).set({
        ...submitData.stageInfo,
        lastModify: new Date(),
        stageData: {
          ...submitData.stageInfo.stageData,
          ...submitData.editState,
          hierarchyData: [...submitData.editState.hierarchyData]
        }
      });
      return [
        {
          type: AuthoringStageActions.INITAIL_AUTHORING_STAGE_STATE
        },
        {
          type: HeaderActions.INITAIL_STEP_DISPLAY_STATE
        }
    ];
    })
  );

@Effect()
tryLoadSelectedStageEffect = this.action$
.pipe(
    ofType(AuthoringStageActions.TRY_LOAD_SELECTED_STAGE),
    map((action: AuthoringStageActions.TryLoadSelectedStage) => action.payload),
    mergeMap((selectedStage: StageDataState) => {
      return [
        {
          type: AuthoringStageActions.LOAD_SELECTED_STAGE,
          payload: selectedStage
        }
      ];
    })
);

@Effect()
tryAddDiveDataEffect = this.action$
.pipe(
    ofType(AuthoringStageActions.TRY_ADD_DIVE_DATA),
    map((action: AuthoringStageActions.TryAddDiveData) => action.payload),
    mergeMap((diveData: DiveDataState) => {
      console.log(diveData);
      const diveDataArray = {};
      diveDataArray['inValue'] = diveData['inValue'].map((row) => {
        const newRow = {dataValue: '', viewValue: ''};
        [newRow['dataValue'], newRow['viewValue']] = [row['id'].toString(), row['name']];
        return newRow;
      });
      diveDataArray['outValue'] = diveData['outValue'].map((row) => {
        const newRow = {dataValue: '', viewValue: ''};
        [newRow['dataValue'], newRow['viewValue']] = [row['id'].toString(), row['name']];
        return newRow;
      });
      return [
        {
          type: AuthoringStageActions.SET_DIVE_LOADED_STATE,
          payload: true
        },
        {
          type: AuthoringStageActions.SET_CHECKED_STATE,
          payload: true
        },
        {
          type: AuthoringStageActions.ADD_DIVE_DATA,
          payload: diveDataArray
        }
    ];
    })
  );
constructor(private action$: Actions,
            public afStore: AngularFirestore) {}
}
