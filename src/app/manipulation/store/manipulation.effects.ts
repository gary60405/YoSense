import { BlocklyDataState } from './../../model/authoring/blockly.model';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as ManipulationActions from './../store/manipulation.actions';
import { StagesState } from '../../model/authoring/management.model';
import { BlocklyService } from '../../authoring/edit/blockly/blockly.service';

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
      ofType(ManipulationActions.TRY_INITIAL_WORKSPACE),
      map((action: ManipulationActions.TryInitialWorkspace) => action.payload),
      mergeMap((stage: StagesState) => {
        let xmlText = '';
        const blocks = {};
        const diveState = this.blocklyService.getDiveState(stage.stageData.hierarchyData);
        const customBlocks = stage.stageData.blocklyData.customBlocksState;
        const customBlockDef = customBlocks.map(block => block.blockDef.content).join('\n');
        const customBlockGen = customBlocks.map(block => block.blockGen.content).join('\n');
        blocks[customBlocks.some(block => block.isEnable) ? 'general' : ''] = customBlocks
          .filter(block => block.isEnable === true)
          .map(block => `<block type="${block.blockId}"></block>`)
          .join('');
        stage.stageData.blocklyData.toolBoxState
          .forEach(block => blocks[block.category] = blocks.hasOwnProperty(block.category) ? blocks[block.category] + block.data : block.data);
        Object.keys(blocks).forEach(blockname => xmlText += this.blocklyService.mergeCategory(blockname, blocks[blockname]));
        eval(diveState + customBlockDef + customBlockGen);
        // console.log(customBlocks);
        // console.log(diveState + customBlockDef + customBlockGen);
        this.blocklyService.injectStandardWorkspace('blocklyDiv', xmlText);
        return [{
          type: ManipulationActions.SET_DIVE_STATE,
          payload: diveState
        }];
      })
    );
  constructor(private action$: Actions,
              private blocklyService: BlocklyService) {}
}
