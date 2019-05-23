import { map, switchMap, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as ManipulationActions from './../store/manipulation.actions';
import { StagesState } from '../../model/authoring/management.model';
import { BlocklyService } from '../../authoring/edit/blockly/blockly.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../model/app/app.model';

declare var DiveLinker: any;

@Injectable()
export class ManipulationEffects {

  @Effect()
  tryLoadDiveEffects = this.action$
  .pipe(
      ofType(ManipulationActions.TRY_LOAD_DIVE),
      switchMap(async () => {
        const sleep = (ms: number) => new Promise(resolve => setTimeout(() => resolve(), ms));
        const diveLinker = new DiveLinker('mainExperiment');
        const diveLoadedPromise = new Promise(async resolve => {
          while (!diveLinker.getLoadingStatus()) {
            await sleep(50);
          }
          resolve();
        });
        await diveLoadedPromise;
        return true;
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
      ofType(ManipulationActions.TRY_INITIAL_WORKSPACE),
      withLatestFrom(this.store),
      map(([action, state]) => {
        const editProjectIndex = state.gloabalData.editProjectIndex;
        const editStageIndex = state.gloabalData.editStageIndex;
        const selectedProject = state.gloabalData.projectData[editProjectIndex];
        return selectedProject.stages[editStageIndex];
      }),
      mergeMap((stage: StagesState) => {
        let xmlText = '';
        const blocks = {};
        const diveState = this.blocklyService.getDiveState(stage.stageData.hierarchyData);
        const customBlocks = stage.stageData.blocklyData.customBlocksState;
        blocks[customBlocks.some(block => block.isEnable) ? 'general' : ''] = customBlocks
          .filter(block => block.isEnable === true)
          .map(block => `<block type="${block.blockId}"></block>`)
          .join('');
        stage.stageData.blocklyData.toolBoxState
             .forEach(block => blocks[block.category] = blocks.hasOwnProperty(block.category) ? blocks[block.category] + block.data : block.data);
        Object.keys(blocks).forEach(blockname => xmlText += this.blocklyService.mergeCategory(blockname, blocks[blockname]));
        return [
          {
            type: ManipulationActions.SET_DIVE_STATE,
            payload: diveState
          },
          {
            type: ManipulationActions.SET_WORKSPACE_STATE,
            payload: xmlText
          }
      ];
      })
    );
  constructor(private action$: Actions,
              private store: Store<AppState>,
              private blocklyService: BlocklyService) {}
}
