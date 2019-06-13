import * as BlocklyActions from './../../blockly/store/blockly.actions';
import * as AuthoringActions from './../../../edit/store/authoringStage.actions';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../model/app/app.model';
import { take } from 'rxjs/operators';
import { codeFontSizeSelector, blockCodeStateSelector, buildPreviewWorkspaceSelector } from '../store/blockly.selectors';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';
import { BlocklyService } from '../blockly.service';
import { ClipboardService } from 'ngx-clipboard';
import { diveIdStateSelector, hierarchyDataSelector } from '../../store/authoringStage.selectors';
import { BlockBuildState } from '../../../../model/authoring/blockly.model';

declare var DiveLinker: any;

@Component({
  selector: 'app-preview-mode',
  templateUrl: './preview-mode.component.html',
  styleUrls: ['./preview-mode.component.css']
})

export class PreviewModeComponent implements OnInit {

  constructor(private store: Store<AppState>,
              private bottomSheet: MatBottomSheet,
              private blocklyService: BlocklyService,
              private clipboardService: ClipboardService) {
      this.diveId$ = store.pipe(select(diveIdStateSelector));
      this.fontSize$ = store.pipe(select(codeFontSizeSelector));
  }

  @ViewChild('preview', { static: true })preview: any;
  @ViewChild('view_code', { static: true })viewCode: any;
  @ViewChild('iframe', { static: false })iframe: any;

  diveId$: Observable<number>;
  fontSize$: Observable<number>;
  blockCode: string[];
  copyMsg = 'NO_COPY';
  saveMsg = 'UNSAVED';
  isDiveLoaded = false;

  ngOnInit() {
    this.store.dispatch(new BlocklyActions.TryBuildPreviewWorkspace());
    const initialPromise = new Promise((resolve, reject) => {
      this.store.pipe(select(buildPreviewWorkspaceSelector), take(1))
          .subscribe((data: {workspaceState: string, customBlocksState: BlockBuildState[]}) => {
            this.blocklyService.executeCode(data.customBlocksState.map(block => block.blockDef.content).join(''));
            this.blocklyService.executeCode(data.customBlocksState.map(block => block.blockGen.content).join(''));
            this.blocklyService.injectWorkspace('toolBoxPreviewer', data.workspaceState);
            resolve();
          });
    });
    initialPromise.then(() => this.store.pipe(select(blockCodeStateSelector), take(1)).subscribe((blockCodeState: string) => this.blocklyService.appendBlocksToWorkspace(blockCodeState)));
  }

  sleep (ms: number) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
  }

  openPreview() {
    const bottomRef = this.bottomSheet.open(this.preview, {panelClass: ['p-0', 'dive-preview', 'rounded']});
    bottomRef.afterOpened().pipe(take(1)).subscribe(async () => {
      const diveLinker = new DiveLinker('mainExperiment');
      const diveLoadedPromise = new Promise(async resolve => {
        while (!diveLinker.getLoadingStatus()) {
          await this.sleep(50);
        }
        resolve();
      });
      await diveLoadedPromise;
      this.isDiveLoaded = true;
    });
    bottomRef.afterDismissed().pipe(take(1)).subscribe(() => this.isDiveLoaded = false);
  }

  async resetDive() {
    this.isDiveLoaded = false;
    const src = this.iframe.nativeElement.src;
    this.iframe.nativeElement.src = '';
    this.iframe.nativeElement.src = src;
    await this.sleep(1000);
    this.isDiveLoaded = true;
  }

  executeCode() {
    this.store.pipe(select(hierarchyDataSelector), take(1))
      .subscribe((hierarchyData) => {
        const diveState = this.blocklyService.getDiveState(hierarchyData);
        const rawCode = this.blocklyService.getWorkspaceCode();
        const presetCode = this.blocklyService.executeCodePreset;
        const finalCode =  diveState + presetCode.replace('@@', rawCode);
        this.blocklyService.executeCode(finalCode);
      });
  }

  closePreview() {
    this.bottomSheet.dismiss();
  }

  async copyAllText() {
    const code = this.blocklyService.getWorkspaceCode();
    this.clipboardService.copyFromContent(code);
    this.copyMsg = 'ALL_TEXT';
    await this.sleep(1000);
    this.copyMsg = 'NO_COPY';
  }

  async copyParagraph(code: string) {
    this.clipboardService.copyFromContent(code.trim());
    this.copyMsg = 'PARAGRAPH';
    await this.sleep(1000);
    this.copyMsg = 'NO_COPY';
  }

  openTextCode() {
    this.blockCode = this.blocklyService.getWorkspaceCode()
      .replace(/await sleep\(100\)\;\n/g, '')
      .split('\n').map(text => text === '' ? 'THIS_LINE_IS_EMPTY' : text);
    if (this.blockCode[this.blockCode.length - 1] === 'THIS_LINE_IS_EMPTY') { this.blockCode.pop(); }
    this.bottomSheet.open(this.viewCode, {panelClass: ['p-0', 'text-code-preview', 'rounded']});
  }

  changeFontSize(event) {
    this.store.dispatch(new AuthoringActions.SetCodeFontSize(event.value));
  }

  async saveBlockCodeState() {
    this.store.dispatch(new AuthoringActions.SetBlockCodeState(this.blocklyService.getBlockCodeState()));
    this.saveMsg = 'SAVED';
    await this.sleep(1000);
    this.saveMsg = 'UNSAVED';
  }

  restoreBlockCodeState() {
    this.store.pipe(select(blockCodeStateSelector), take(1)).subscribe((blockCodeState: string) => this.blocklyService.appendBlocksToWorkspace(blockCodeState));
  }

  closeTextCode() {
    this.bottomSheet.dismiss();
  }

}
