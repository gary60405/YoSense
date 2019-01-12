import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import * as BlocklyActions from './../blockly/store/blockly.actions';
import * as AuthoringActions from './../../edit/store/authoringStage.actions';
import { AppState } from '../../../model/app/app.model';
import { blockTypeContents, getBlocklyGetterCompare, getBlocklyGetterSetDiveWithDiveState, getBlocklyGetter, getBlocklySetter, getDiveSetter, getDiveGetter, getBlocklyGetterSetDiveWithBlockValue, getBlocklyGetterAsyncSetDiveWithBlockValue, getBlocklyGetterCompareWithDiveGetter} from './js/blockCodeGen';
import { blocklyModeStateSelector, blockDefStateSelector, portalTypeSelector, embeddingNumberSelector, blockTempTextSelector, blockTypeSelector, diveStateNamesSelector, blockTypeContentSelector, diveStateNameSelector, diveStateActionSelector, isAsyncSelector, payloadSelector, submitBlockDataSelector, connectionTypeSelector, externalTypeSelector, isNewSelector, blockNameSelector, customBlockNameSelector, diveStateSelector, SetToolboxBlockSelector, customBlockSelector, ToolBoxStateSelector } from './store/blockly.selectors';
import { toolbox, categoryName } from './js/toolbox';
import { isDiveObjectName, isDiveObjectAction, isDiveLocked } from './js/rule';
import { ToolBoxState, BlockBuildState } from '../../../model/authoring/blockly.model';
import { MatSnackBar, MatDialog} from '@angular/material';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.css']
})
export class BlocklyComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
    this.isNewBlock$ = store.pipe(select(isNewSelector));
    this.blocklyMode$ = store.pipe(select(blocklyModeStateSelector));
    this.connectionType$ = store.pipe(select(connectionTypeSelector));
    this.portalType$ = store.pipe(select(portalTypeSelector));
    this.externalType$ = store.pipe(select(externalTypeSelector));
    this.embeddingNumber$ = store.pipe(select(embeddingNumberSelector));
    this.blockTempText$ = store.pipe(select(blockTempTextSelector));
    this.blockType$ = store.pipe(select(blockTypeSelector));
    this.blockTypeContent$ = store.pipe(select(blockTypeContentSelector));
    this.diveStateNames$ = store.pipe(select(diveStateNamesSelector));
    this.diveStateName$ = store.pipe(select(diveStateNameSelector));
    this.diveStateAction$ = store.pipe(select(diveStateActionSelector));
    this.isAsync$ = store.pipe(select(isAsyncSelector));
    this.payload$ = store.pipe(select(payloadSelector));
    this.blockName$ = store.pipe(select(blockNameSelector));
    this.customBlocksName$ = store.pipe(select(customBlockNameSelector));
  }

  @ViewChild('hint') hint;
  @ViewChild('blocklyDialog') blocklyDialog;
  isNewBlock$: Observable<boolean>;
  blockName$: Observable<string>;
  blocklyMode$: Observable<string>;
  blockType$: Observable<string>;
  blockTypeContent$: Observable<string>;
  connectionType$: Observable<string>;
  portalType$: Observable<string>;
  externalType$: Observable<string>;
  embeddingNumber$: Observable<string>;
  blockTempText$: Observable<string[]>;
  diveStateNames$: Observable<string[]>;
  diveStateName$: Observable<string>;
  diveStateAction$:  Observable<string>;
  isAsync$:  Observable<boolean>;
  payload$: Observable<string>;
  customBlocksName$: Observable<{id: string, name: string, isEnable: boolean}[]>;

  blocklyModeSubscription: Subscription;
  toolBox: {};
  diveStateName: string;
  diveStateAction: string;
  blockTypeContents: Map<string, []>;

  blockId = '';
  isNewBlock: boolean;
  isSpinerDisplay = false;
  diveState = {};
  categoryName = [];
  isDiveObjectName = [];
  isDiveObjectAction = [];
  isDiveLocked = [];
  ngOnInit() {
    this.blockTypeContents = blockTypeContents;
    this.categoryName = categoryName;
    this.isDiveObjectName = isDiveObjectName;
    this.isDiveObjectAction = isDiveObjectAction;
    this.isDiveLocked = isDiveLocked;
    this.store.pipe(select(diveStateSelector), take(1)).subscribe(diveState => this.diveState = diveState);
    this.store.pipe(select(ToolBoxStateSelector), take(1)).subscribe(toolboxState => {
      toolboxState.forEach(blockState => toolbox[blockState.category].find(block => block.data === blockState.data).selected = true);
      this.toolBox = toolbox;
    });
    this.blocklyModeSubscription = this.store.pipe(select(blocklyModeStateSelector))
        .subscribe((blocklyMode: string) => {
          setTimeout(() => this.isSpinerDisplay = blocklyMode !== 'SET_PRIMITIVE_BLOCK' ? false : true, 300);
          switch (blocklyMode) {
            case 'SET_PRIMITIVE_BLOCK':
              return setTimeout(() => eval(`workspace = Blockly.inject('blocklyPreviewer1',{zoom: {wheel: true,startScale:1,minScale:1}})`));
            case 'SET_CUSTOM_BLOCK':
            this.isNewBlock = true;
              this.store.dispatch(new BlocklyActions.InitailBuildBlockState);
              return setTimeout(() => {
                eval(`workspace = Blockly.inject('blocklyPreviewer2',{zoom: {wheel: true,startScale:1.5,minScale:1}})`);
                this.store.pipe(select(blockDefStateSelector), take(1))
                    .subscribe((buildBlockState) => {
                      const previewer = document.getElementById('blocklyPreviewer2');
                      const width = window.getComputedStyle(previewer).getPropertyValue('width').replace('px', '');
                      const height = window.getComputedStyle(previewer).getPropertyValue('height').replace('px', '');
                      eval(buildBlockState);
                      eval(`workspace.clear();`);
                      eval(`Blockly.Xml.appendDomToWorkspace(Blockly.Xml.textToDom('<xml><block id="a" type="block_type" x="${parseInt(width, 10) / 12}" y="${parseInt(height, 10) / 12}"></block></xml>'), workspace);`);
                    });
              }, 0);
            case 'PREVIEW_MODE':
              this.store.pipe(select(SetToolboxBlockSelector), take(1))
                  .subscribe((setToolboxData: {toolBoxState: ToolBoxState[], customBlocksState: BlockBuildState[]}) => {
                    return this.store.dispatch(new BlocklyActions.SetToolboxBlockState(setToolboxData));
                  });
          }
    });
  }

  setBlocklyMode(mode: string) {
    this.store.dispatch(new BlocklyActions.SetBlocklyModeState(mode));
  }

  setBlockType(event) {
    this.store.dispatch(new BlocklyActions.SetBlockType(event.value));
  }

  setBlockTypeContent(event) {
    this.store.dispatch(new BlocklyActions.SetBlockTypeConent(event.value));
    this.store.dispatch(new BlocklyActions.InitailOptionValue());
  }

  setDiveStateName(value) {
    this.store.dispatch(new BlocklyActions.SetOptionDiveStateName(value));
    this.store.dispatch(new BlocklyActions.SetOptionDiveStateAction(''));
  }

  setDiveStateAction(value) {
    this.store.dispatch(new BlocklyActions.SetOptionDiveStateAction(value));
  }

  setDiveStateAsyncState(value) {
    this.store.dispatch(new BlocklyActions.SetOptionAsyncState(value));
  }

  setDiveStatePayload(value) {
    this.store.dispatch(new BlocklyActions.SetOptionPayload(value));
  }

  togglePrimitiveBlock(category: string, index: number) {
    this.toolBox[category][index].selected = !this.toolBox[category][index].selected;
    this.toolBox[category][index].selected ?
      this.store.dispatch(new AuthoringActions.AddCategoryBlock({category: category, data: this.toolBox[category][index].data}))
      : this.store.dispatch(new AuthoringActions.DeleteCategoryBlock({category: category, data: this.toolBox[category][index].data}));
  }

  previewPrimitiveBlock(blockData: string) {
    const previewer = document.getElementById('blocklyPreviewer1');
    const width = window.getComputedStyle(previewer).getPropertyValue('width').replace('px', '');
    const height = window.getComputedStyle(previewer).getPropertyValue('height').replace('px', '');
    const blockType = blockData.split('"')[1];
    eval(`workspace.clear()`);
    eval(`Blockly.Xml.appendDomToWorkspace(Blockly.Xml.textToDom('<xml><block id="a" type="${blockType}" x="${parseInt(width, 10) / 12}" y="${parseInt(height, 10) / 12}"></block></xml>'), workspace);`);
  }

  setPortalType(event) {
    this.store.dispatch(new BlocklyActions.TrySetPortalType(event.value));
  }

  setConnectionType(event) {
    this.store.dispatch(new BlocklyActions.TrySetConnectionType(event.value));
  }

  setEmbeddingNumber(event) {
    this.store.dispatch(new BlocklyActions.TrySetEmbeddingNumber(event.value));
  }

  setExternalType(event) {
    this.store.dispatch(new BlocklyActions.TrySetExternalType(event.value));
  }

  editBlockResultText(order: number, text: string) {
    this.store.dispatch(new BlocklyActions.TryEditBlockResultText({order: order, text: text}));
  }

  getStateAction(stateName) {
    return stateName ? Object.keys(this.diveState[stateName]) : [];
  }

  setBlockName(event) {
    this.store.dispatch(new BlocklyActions.SetBlockName(event.target.value));
  }

  editCustomBlock(id) {
    this.isNewBlock = false;
    this.store.pipe(select(customBlockSelector), take(1))
        .subscribe((customBlock: BlockBuildState[]) => this.store.dispatch(new BlocklyActions.TryEditCustomBlock({id: id, customBlocksState: customBlock})));
  }

  openDeleteDialog(id) {
    this.blockId = id;
    this.dialog.open(this.blocklyDialog);
  }

  deleteCustomBlock() {
    this.store.dispatch(new AuthoringActions.DeleteCustomBlock(this.blockId));
    this.blockId = '';
  }

  getCurrentBlockName(blocks: {id: string, name: string}[]) {
    const currentBlock = blocks.find(block => block.id === this.blockId);
    return currentBlock ? currentBlock.name : '';
  }

  enableBlock(event, id) {
    this.store.dispatch(new AuthoringActions.SetBlockEnableState({checked: event.checked, id: id}));
  }

  revertEdit() {
    this.isNewBlock = true;
    this.store.dispatch(new BlocklyActions.InitailBuildBlockState());
    this.store.dispatch(new BlocklyActions.SetBlockResult());
  }
  submitBlockData() {
    if (this.isNewBlock) {
      this.store.dispatch(new BlocklyActions.SetBlockId);
      this.store.dispatch(new BlocklyActions.SetBlockStateIsOld(false));
    }
    this.snackBar
        .openFromTemplate(this.hint, {panelClass: ['p-0'], duration: 3000})
        .afterDismissed().subscribe(() => this.isNewBlock = undefined);
    this.store
        .pipe(select(submitBlockDataSelector), take(1))
        .subscribe( (blockData: BlockBuildState) => {
          const blockTypeMap = new Map()
              .set('BLOCKLY_GETTER', getBlocklyGetter())
              .set('BLOCKLY_SETTER', getBlocklySetter(blockData.blockGen.diveStateName))
              .set('BLOCKLY_GETTER_COMPARE', getBlocklyGetterCompare())
              .set('DIVE_SETTER', getDiveSetter(blockData.blockGen.diveStateName, blockData.blockGen.diveStateAction, blockData.blockGen.isAsync))
              .set('DIVE_GETTER', getDiveGetter(blockData.blockGen.diveStateAction))
              .set('BLOCKLY_GETTER_SET_DIVE_WITH_DIVE_STATE', getBlocklyGetterSetDiveWithDiveState(blockData.blockGen.diveStateAction, blockData.blockGen.isAsync))
              .set('BLOCKLY_GETTER_SET_DIVE_WITH_BLOCK_VALUE', getBlocklyGetterSetDiveWithBlockValue(blockData.blockGen.diveStateAction, blockData.blockGen.isAsync))
              .set('BLOCKLY_GETTER_ASYNC_SET_DIVE_WITH_BLOCK_VALUE', getBlocklyGetterAsyncSetDiveWithBlockValue(blockData.blockGen.diveStateAction, blockData.blockGen.isAsync))
              .set('BLOCKLY_GETTER_COMPARE_WITH_DIVE_GETTER', getBlocklyGetterCompareWithDiveGetter(blockData.blockGen.diveStateAction, blockData.blockGen.payload));
          this.store.dispatch(new BlocklyActions.TrySubmitBlockData({isNew: this.isNewBlock, blockData: blockData, content: blockTypeMap.get(blockData.blockGen.blockTypeContent)}));
        });
  }

  ngOnDestroy() {
    this.blocklyModeSubscription.unsubscribe();
  }
}
