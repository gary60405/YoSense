import { map, switchMap, mergeMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as ManipulationActions from './../store/manipulation.actions';
import { StagesState } from '../../model/authoring/management.model';

@Injectable()
export class ManipulationEffects {

  @Effect()
  tryLoadDiveEffects = this.action$
  .pipe(
      ofType(ManipulationActions.TRY_LOAD_DIVE),
      switchMap(() => {
        const loadedPromise = new Promise(resolve => {
          let isLoaded = false;
          while (!isLoaded) {
            isLoaded = eval('diveLinker.Hello()') !== [] ? true : false;
          }
          resolve();
        });
        return loadedPromise.then(() => true);
      }),
      mergeMap((data) => {
        return [{
          type: ManipulationActions.SET_STUDENT_DIVE_LOADED_STATE,
          payload: data
        }];
      })
    );
  @Effect()
  buildBlocklyWorkSpaceEffects = this.action$
  .pipe(
      ofType(ManipulationActions.BUILD_BLOCKLY_WORKSPACE),
      map((action: ManipulationActions.BuildBlocklyWorkSpace) => action.payload),
      mergeMap((stage: StagesState) => {
        function rebuiltCodegen(blockIndex, defCode, genCode) {
          const diveData = stage.stageData.diveData.inValue;
          let diveIndex = '';
          const type = defCode.indexOf('Number') !== -1 ? 'number' : 'angle';
          // stage.stageData.bindingData.forEach(item => {
          //   if (item.blocklyIndex === blockIndex) {
          //     diveIndex = item.diveIndex + '';
          //   }
          // });
          const diveId = diveData[diveIndex].dataValue;
          const value = genCode.split('var')[1].split(' = ')[1].split(';')[0].replace(/"/g, '\'');
          return `return "const type=\\\`${type}\\\`;diveLinker.Send(${diveId}, " + ${value} + ");";`;
        }
        let i = 0;
        let str = '';
        // const blockData = stage.stageData.blocklyData.map(item => {
        //   const data = {};
        //   data['type'] = item.blockDef.split('\'')[1];
        //   data['content'] = item.blockDef.split('{')[2].split('}')[0];
        //   data['generator'] = rebuiltCodegen(i, item.blockDef, item.blockGen);
        //   i++;
        //   return data;
        // });
        // blockData.forEach(data => str += `${data['type']}@^&${data['content']}@^&${data['generator']}#^&`);
        str = str.replace(/\n/g, '');
        eval(`init(\`${str}\`)`);
        return [{
          type: ManipulationActions.SET_BLOCKLY_TRANSFORMED_STATE,
          payload: str
        }];
      })
    );
  constructor(private action$: Actions,
              private afStore: AngularFirestore) {}
}
