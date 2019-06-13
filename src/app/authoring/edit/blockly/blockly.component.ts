import { BlocklyService } from './blockly.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, ViewChild } from '@angular/core';

import * as BlocklyActions from './../blockly/store/blockly.actions';
import * as AuthoringActions from './../../edit/store/authoringStage.actions';
import { AppState } from '../../../model/app/app.model';
import { blocklyModeStateSelector, customBlockSelector, customBlockNameSelector } from './store/blockly.selectors';

import { BlockBuildState } from '../../../model/authoring/blockly.model';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.css'],
})
export class BlocklyComponent implements OnInit {

  constructor(private store: Store<AppState>,
              public dialog: MatDialog,
              private blocklyService: BlocklyService) {
    this.blocklyMode$ = store.pipe(select(blocklyModeStateSelector));
    this.customBlocksName$ = store.pipe(select(customBlockNameSelector));
  }

  @ViewChild('blocklyDialog', { static: true }) blocklyDialog: any;
  @ViewChild('blocklyPreviewer1', { static: false }) blocklyPreviewer1: any;
  @ViewChild('custom_mode', { static: false }) customMode: any;
  @ViewChild('preview_mode', { static: false }) previewMode: any;


  blocklyMode$: Observable<string>;
  customBlocksName$: Observable<{id: string, name: string, isEnable: boolean}[]>;

  blockId = '';

  ngOnInit() {}

  onPreview() {
    this.previewMode.openPreview();
  }

  onViewTextCode() {
    this.previewMode.openTextCode();
  }

  onSaveBlockCodeState() {
    this.previewMode.saveBlockCodeState();
  }

  onRestoreBlockCodeState() {
    this.previewMode.restoreBlockCodeState();
  }

  setBlocklyMode(mode: string) {
    this.store.dispatch(new BlocklyActions.SetBlocklyModeState(mode));
  }

  openDeleteDialog(id) {
    this.blockId = id;
    this.dialog.open(this.blocklyDialog);
  }

  deleteCustomBlock() {
    this.store.dispatch(new AuthoringActions.DeleteCustomBlock(this.blockId));
    this.blockId = '';
  }

  enableBlock(event: any, id: string) {
    this.store.dispatch(new AuthoringActions.SetBlockEnableState({checked: event.checked, id: id}));
  }

  editCustomBlock(id: string) {
    this.customMode.isNewBlock = false;
    this.customMode.isInitialWorkPanel = false;
    this.customMode.stepper.reset();
    this.store.pipe(select(customBlockSelector), take(1))
        .subscribe((customBlock: BlockBuildState[]) => this.store.dispatch(new BlocklyActions.TryEditCustomBlock({id: id, customBlocksState: customBlock})));
  }

  getCurrentBlockName(blocks: {id: string, name: string}[]) {
    const currentBlock = blocks.find(block => block.id === this.blockId);
    return currentBlock ? currentBlock.name : '';
  }

  previewPrimitiveBlock(blockData: string) {
    const width = parseInt(this.blocklyPreviewer1.nativeElement.offsetWidth, 10)  / 12;
    const height = parseInt(this.blocklyPreviewer1.nativeElement.offsetHeight, 10)  / 12;
    const blockType = blockData.split('"')[1];
    this.blocklyService.clearWorkspace();
    this.blocklyService.appendBlockToWorkspace(blockType, width, height);
  }

}
