import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import * as AppActions from './../../../store/app.actions';
import * as ManipulationActions from './../../store/manipulation.actions';
import { AppState } from '../../../model/app/app.model';
import { initailWorkspaceSelector, manipulateHierarchyDataSelector } from '../../store/manipulation.selectors';
import { BlocklyService } from '../../../authoring/edit/blockly/blockly.service';
import { BlockBuildState } from '../../../model/authoring/blockly.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnDestroy {
  @ViewChild('passDialog', { static: false }) passDialog;
  @ViewChild('failDialog', { static: false }) failDialog;
  constructor(private dialog: MatDialog,
              private store: Store<AppState>,
              private blocklyService: BlocklyService) { }
  isEnd$: Observable<boolean>;
  ngOnInit() {
    this.initialWorkspace();
  }
  initialWorkspace() {
    this.store.dispatch(new ManipulationActions.TryInitialWorkspace());
    this.store.pipe(select(initailWorkspaceSelector), take(1))
        .subscribe((data: {workspaceState: string, customBlocks: BlockBuildState[]}) => {
          this.blocklyService.executeCode(data.customBlocks.map(block => block.blockDef.content).join(''));
          this.blocklyService.executeCode(data.customBlocks.map(block => block.blockGen.content).join(''));
          this.blocklyService.injectWorkspace('blocklyDiv', data.workspaceState);
        });
  }
  backToMenu() {
    this.store.dispatch(new AppActions.SetEditStageIndex(-1));
  }

 getCode() {
  this.store.pipe(select(manipulateHierarchyDataSelector), take(1))
      .subscribe((hierarchyData) => {
        const diveState = this.blocklyService.getDiveState(hierarchyData);
        const rawCode = this.blocklyService.getWorkspaceCode();
        const presetCode = this.blocklyService.executeCodePreset;
        const finalCode =  diveState + presetCode.replace('@@', rawCode);
        this.blocklyService.executeCode(finalCode);
      });
}

ngOnDestroy() {
  this.store.dispatch(new ManipulationActions.SetSnackbarOpenState(false));
}

}

