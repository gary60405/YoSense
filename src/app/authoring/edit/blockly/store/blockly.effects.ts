import { AppState } from './../../../../model/app/app.model';
import { Store } from '@ngrx/store';
import { map, mergeMap, withLatestFrom, switchMap} from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as BlocklyActions from './../store/blockly.actions';
import * as AuthoringActions from './../../../edit/store/authoringStage.actions';
import { BlockBuildState, BlocklyDataState } from '../../../../model/authoring/blockly.model';
import { BlocklyService } from '../blockly.service';

@Injectable()
export class BlocklyEffects {

@Effect()
tryEditCustomBlockEffect = this.action$
.pipe(
  ofType(BlocklyActions.TRY_EDIT_CUSTOM_BLOCK),
  map((action: BlocklyActions.TryEditCustomBlock) => action.payload),
  mergeMap((data) => {
    return [
      {
        type: BlocklyActions.EDIT_CUSTOM_BLOCK,
        payload: data
      },
      {
        type: BlocklyActions.SET_BLOCK_RESULT
      }
    ];
  })
);
@Effect()
trySubmitBlockDataEffect = this.action$
.pipe(
    ofType(BlocklyActions.TRY_SUBMIT_BLOCK_DATA),
    map((action: BlocklyActions.TrySubmitBlockData) => action.payload),
    mergeMap((data: {isNew: boolean, content: string, blockData: BlockBuildState}) => {
      const genCode = data.content.replace(`Blockly.JavaScript['block_type']`, `Blockly.JavaScript['${data.blockData.blockId}']`);
      // console.log(genCode);
      return [
        {
          type: BlocklyActions.SET_BLOCK_CODE_GENERATOR,
          payload: genCode
        },
        {
          type: data.isNew ? AuthoringActions.ADD_CUSTOM_BLOCK : AuthoringActions.UPDATE_CUSTOM_BLOCK,
          payload: {
            ...data.blockData,
            blockGen: {
              ...data.blockData.blockGen,
              content: genCode
            }
          }
        },
        {
          type: BlocklyActions.INITAIL_BUILD_BLOCK_STATE
        },
             {
          type: BlocklyActions.SET_BLOCK_RESULT
        },
      ];
    })
  );

@Effect()
tryEditBlockResultTextEffect = this.action$
.pipe(
    ofType(BlocklyActions.TRY_EDIT_BLOCK_RESULT_TEXT),
    map((action: BlocklyActions.TryEditBlockResultText) => action.payload),
    mergeMap((data: {order: number, text: string}) => {
      return [
        {
          type: BlocklyActions.EDIT_BLOCK_RESULT_TEXT,
          payload: data
        },
        {
          type: BlocklyActions.SET_BLOCK_TEMP_TEXT,
          payload: data
        }
      ];
    }));

@Effect()
trySetPortalTypeffect = this.action$
.pipe(
    ofType(BlocklyActions.TRY_SET_PORTAL_TYPE),
    map((action: BlocklyActions.TrySetPortalType) => action.payload),
    mergeMap((portalType: string) => {
      const initalPayload = portalType === 'NONE' ?
        [
          {
            type: BlocklyActions.SET_EXTERNAL_TYPE,
            payload: ''
          },
          {
            type: BlocklyActions.SET_EMBEDDING_NUMBER,
            payload: ''
          }
        ] : [
          {
            type: portalType === 'EMBEDE' ? BlocklyActions.SET_EXTERNAL_TYPE : BlocklyActions.SET_EMBEDDING_NUMBER,
            payload: ''
          }
        ];
      return [
        {
          type: BlocklyActions.SET_PORTAL_TYPE,
          payload: portalType
        },
        ...initalPayload,
        {
          type: BlocklyActions.INITAIL_BLOCK_TEMP_TEXT
        },
        {
          type: BlocklyActions.SET_BLOCK_RESULT
        }
      ];
    }));

@Effect()
trySetConnectionEffect = this.action$
.pipe(
    ofType(BlocklyActions.TRY_SET_CONNECTION_TYPE),
    map((action: BlocklyActions.TrySetConnectionType) => action.payload),
    mergeMap((connectionType: string) => {
      return [
        {
          type: BlocklyActions.SET_CONNECTION_TYPE,
          payload: connectionType
        },
        {
          type: BlocklyActions.SET_BLOCK_RESULT
        }
      ];
    }));

@Effect()
trySetEmbeddingNumberEffect = this.action$
.pipe(
    ofType(BlocklyActions.TRY_SET_EMBEDDING_NUMBER),
    map((action: BlocklyActions.TrySetEmbeddingNumber) => action.payload),
    mergeMap((embeddingNumber: string) => {
      return [
        {
          type: BlocklyActions.SET_EMBEDDING_NUMBER,
          payload: embeddingNumber
        },
        {
          type: BlocklyActions.INITAIL_BLOCK_TEMP_TEXT
        },
        {
          type: BlocklyActions.SET_BLOCK_RESULT
        },
      ];
    }));

@Effect()
trySetExternalEffect = this.action$
.pipe(
    ofType(BlocklyActions.TRY_SET_EXTERNAL_TYPE),
    map((action: BlocklyActions.TrySetExternalType) => action.payload),
    mergeMap((externalType: string) => {
      return [
        {
          type: BlocklyActions.SET_EXTERNAL_TYPE,
          payload: externalType
        },
        {
          type: BlocklyActions.INITAIL_BLOCK_TEMP_TEXT
        },
        {
          type: BlocklyActions.SET_BLOCK_RESULT
        }
      ];
    }));

  @Effect()
  tryBuildPreviewWorkspaceEffect = this.action$
    .pipe(
      ofType(BlocklyActions.TRY_BUILD_PREVIEW_WORKSPACE),
      withLatestFrom(this.store),
      map(([action, state]) => state.authoringStage.editState.blocklyData),
      mergeMap((blocklyData: BlocklyDataState) => {
        let xmlText = '';
        const blocks = {};
        blocks[blocklyData.customBlocksState.some(block => block.isEnable) ? 'general' : ''] = blocklyData.customBlocksState
          .filter(block => block.isEnable === true)
          .map(block => `<block type="${block.blockId}"></block>`);
        blocklyData.toolBoxState
              .sort((a, b) => this.blocklyService.categoryOder.get(a.category) > this.blocklyService.categoryOder.get(b.category) ? 1 : -1)
              .forEach(block => blocks.hasOwnProperty(block.category) ? blocks[block.category].push(block.data) : blocks[block.category] = [block.data]);
        Object.keys(blocks).forEach((categoryName) => xmlText += this.blocklyService.mergeCategory(categoryName, blocks[categoryName]));
              return [
                {
                  type: BlocklyActions.SET_TOOLBOX_BLOCK_STATE,
                  payload: xmlText
                },
              ];
            })
    );

constructor(private action$: Actions,
            private store: Store<AppState>,
            public afStore: AngularFirestore,
            private blocklyService: BlocklyService) {}
}
