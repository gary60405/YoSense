import * as BlocklyActions from './../../blockly/store/blockly.actions';

import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AppState } from '../../../../model/app/app.model';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { isDiveObjectName, isDiveObjectAction, isDiveLocked } from './../js/rule';
import { blockTypeContents, getPureBlock, getBlockContent, sendNameIntoBlock, sendValueIntoBlock, compareTwoBlocksValue, getDiveValueWithState, getDiveValueWithName, sendValueIntoDiveWithState, sendDiveWithStateName, sendDiveWithBlockValue, sendDiveWithNameAndBlockValue, getStateNameToCompareWithDiveValue, compareStateWithDiveValue} from './../js/blockCodeGen';
import { isNewSelector, portalTypeSelector, embeddingNumberSelector, blockTempTextSelector, blockTypeSelector, diveStateNamesSelector, blockTypeContentSelector, diveStateNameSelector, diveStateActionSelector, isAsyncSelector, payloadSelector, connectionTypeSelector, externalTypeSelector, blockNameSelector, submitBlockDataSelector, appendBlockToWorkspaceSelector, diveStateSelector, blockDefSelector } from '../store/blockly.selectors';
import { MatSnackBar } from '@angular/material';
import { take } from 'rxjs/operators';
import { BlockBuildState } from '../../../../model/authoring/blockly.model';
import { BlocklyService } from '../blockly.service';

@Component({
  selector: 'app-custom-mode',
  templateUrl: './custom-mode.component.html',
  styleUrls: ['./custom-mode.component.css']
})
export class CustomModeComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>,
              private snackBar: MatSnackBar,
              private blocklyService: BlocklyService
              ) {
    this.isNewBlock$ = store.pipe(select(isNewSelector));
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
  }

  isNewBlock$: Observable<boolean>;
  blockName$: Observable<string>;
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

  diveStateName: string;
  diveStateAction: string;
  blockTypeContents: Map<string, []>;
  blockResultSubscription: Subscription;

  diveState = {};
  isDiveObjectName = [];
  isDiveObjectAction = [];
  isDiveLocked = [];
  isNewBlock = true;
  messageState = true;
  isInitialWorkPanel = true;

  @ViewChild('hint') hint: any;
  @ViewChild('stepper') stepper: any;
  @ViewChild('blocklyPreviewer2') blocklyPreviewer2: any;

  ngOnInit() {
    this.blockTypeContents = this.blocklyService.blockTypeClassify(blockTypeContents);
    this.isDiveObjectName = isDiveObjectName;
    this.isDiveObjectAction = isDiveObjectAction;
    this.isDiveLocked = isDiveLocked;
    this.store.pipe(select(diveStateSelector), take(1)).subscribe(diveState => this.diveState = diveState);
    this.store.dispatch(new BlocklyActions.InitailBuildBlockState);
    this.blocklyService.injectWorkspace('blocklyPreviewer2');
    this.blockResultSubscription = this.store.pipe(select(appendBlockToWorkspaceSelector))
      .subscribe((data: {content: string, blockId: string}) => {
        const height = parseInt(this.blocklyPreviewer2.nativeElement.offsetHeight, 10) / 12;
        const width = parseInt(this.blocklyPreviewer2.nativeElement.offsetWidth, 10) / 12;
        this.blocklyService.executeCode(data.content);
        this.blocklyService.clearWorkspace();
        this.blocklyService.appendBlockToWorkspace(data.blockId, height, width);
      });
  }

  setBlockType(event) {
    this.isInitialWorkPanel = false;
    this.store.dispatch(new BlocklyActions.SetBlockType(event.value));
    if (event.value === 'NONE') {
      this.store.dispatch(new BlocklyActions.SetBlockTypeConent('PURE_BLOCK'));
    }
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

  setPortalType(event) {
    this.isInitialWorkPanel = false;
    this.store.dispatch(new BlocklyActions.TrySetPortalType(event.value));
  }

  setConnectionType(event) {
    this.isInitialWorkPanel = false;
    this.store.dispatch(new BlocklyActions.TrySetConnectionType(event.value));
  }

  setEmbeddingNumber(event) {
    this.store.dispatch(new BlocklyActions.TrySetEmbeddingNumber(event.value));
  }

  setExternalType(event) {
    this.store.dispatch(new BlocklyActions.TrySetExternalType(event.value));
  }

  editBlockResultText(order: number, text: string) {
    this.isInitialWorkPanel = false;
    this.store.dispatch(new BlocklyActions.TryEditBlockResultText({order: order, text: text}));
  }

  getStateAction(stateName) {
    return stateName ? Object.keys(this.diveState[stateName]) : [];
  }

  setBlockName(event) {
    this.isInitialWorkPanel = false;
    this.store.dispatch(new BlocklyActions.SetBlockName(event.target.value));
  }

  onStepperSelected(event) {
    if (event.selectedIndex === 2) {
      this.store.pipe(select(blockDefSelector), take(1))
          .subscribe((blockDef) => this.blockTypeContents = this.blocklyService.blockTypeContentFilter(blockDef, blockTypeContents));
    }
  }
  revertEdit() {
    this.isNewBlock = true;
    this.isInitialWorkPanel = true;
    this.store.dispatch(new BlocklyActions.InitailBuildBlockState());
    this.store.dispatch(new BlocklyActions.SetBlockResult());
  }
  submitBlockData() {
    this.messageState = this.isNewBlock;
    if (this.isNewBlock) {
      this.store.dispatch(new BlocklyActions.SetBlockId);
      this.store.dispatch(new BlocklyActions.SetBlockStateIsOld(false));
    }
    this.snackBar
        .openFromTemplate(this.hint, {panelClass: ['p-0'], duration: 3000})
        .afterDismissed().pipe(take(1))
        .subscribe(() => this.messageState = true);
    this.store
        .pipe(select(submitBlockDataSelector), take(1))
        .subscribe( (blockData: BlockBuildState) => {
          const blockTypeMap = new Map()
              .set('PURE_BLOCK', getPureBlock())
              .set('GET_BLOCK_CONTENT', getBlockContent())
              .set('SEND_NAME_INTO_BLOCK', sendNameIntoBlock(blockData.blockGen.diveStateName))
              .set('SEND_VALUE_INTO_BLOCK', sendValueIntoBlock(blockData.blockGen.diveStateName, blockData.blockGen.diveStateAction))
              .set('COMPARE_TWO_BLOCKS_VALUE', compareTwoBlocksValue())
              .set('GET_DIVE_VALUE_WITH_STATE', getDiveValueWithState(blockData.blockGen.diveStateName, blockData.blockGen.diveStateAction))
              .set('SEND_VALUE_INTO_DIVE_WITH_STATE', sendValueIntoDiveWithState(blockData.blockGen.diveStateName, blockData.blockGen.diveStateAction, blockData.blockGen.isAsync))
              .set('GET_DIVE_VALUE_WITH_NAME', getDiveValueWithName(blockData.blockGen.diveStateAction))
              .set('SEND_DIVE_WITH_STATE_NAME', sendDiveWithStateName(blockData.blockGen.diveStateAction, blockData.blockGen.isAsync))
              .set('SEND_DIVE_WITH_BLOCK_VALUE', sendDiveWithBlockValue(blockData.blockGen.diveStateName, blockData.blockGen.diveStateAction, blockData.blockGen.isAsync))
              .set('SEND_DIVE_WITH_NAME_AND_BLOCK_VALUE', sendDiveWithNameAndBlockValue(blockData.blockGen.diveStateAction, blockData.blockGen.isAsync))
              .set('GET_STATE_NAME_TO_COMPARE_WITH_DIVE_VALUE', getStateNameToCompareWithDiveValue(blockData.blockGen.diveStateAction))
              .set('COMPARE_STATE_WITH_DIVE_VALUE', compareStateWithDiveValue(blockData.blockGen.diveStateName, blockData.blockGen.diveStateAction));
          this.store.dispatch(new BlocklyActions.TrySubmitBlockData({isNew: this.isNewBlock, blockData: blockData, content: blockTypeMap.get(blockData.blockGen.blockTypeContent)}));
          this.revertEdit();
        });
  }
  ngOnDestroy() {

  }
}
