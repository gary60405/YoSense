import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';

import { AppState } from '../../../model/app/app.model';
import * as AuthoringStageActions from './../store/authoringStage.actions';
import * as HeaderActions from './../../../header/store/header.actions';
import { diveLoadedStateSelector, diveIdCheckedSelector, selectedStageDateSelector, diveIdStateSelector } from '../store/authoringStage.selectors';

declare var DiveLinker: any;

@Component({
  selector: 'app-dive',
  templateUrl: './dive.component.html',
  styleUrls: ['./dive.component.css']
})
export class DiveComponent implements OnInit {
  @ViewChild('diveDialog', { static: true }) diveDialog;
  @ViewChild('code', { static: false }) code;
  diveId$: Observable<number>;
  isDiveLoaded$: Observable<boolean>; // Dive是否讀取完成
  isChecked$: Observable<boolean>; // 是否填完DIVE ID
  url = 'http://dive.nutn.edu.tw:8080/Experiment/';

  constructor(public dialog: MatDialog,
              private store: Store<AppState>) {
    this.diveId$ = store.pipe(select(diveIdStateSelector));
    this.isDiveLoaded$ = store.pipe(select(diveLoadedStateSelector));
    this.isChecked$ = store.pipe(select(diveIdCheckedSelector));
  }

  ngOnInit() {
    this.store.pipe(select(selectedStageDateSelector), take(1))
      .subscribe(date => {
        if (date.createDate.toString() !== date.lastModify.toString()) {
          this.store.dispatch(new HeaderActions.SetStepDisplayState('ALL_DISPLAY'));
        }
      });
  }

  open() {
    this.dialog.open(this.diveDialog);
  }

  async confirm() {
    this.store.dispatch(new AuthoringStageActions.SetDiveLoadedState(false));
    this.store.dispatch(new AuthoringStageActions.SetDiveIdState(this.code.nativeElement.value));
    this.url = `http://dive.nutn.edu.tw:8080/Experiment/kaleTestExperiment5.jsp?eid=${this.code.nativeElement.value}`;
    const sleep = (ms: number) => new Promise(resolve => setTimeout(() => resolve(), ms));
    const diveLinker = new DiveLinker('mainExperiment');
    const diveLoadedPromise = new Promise(async resolve => {
      while (!diveLinker.getLoadingStatus()) {
        await sleep(50);
      }
      resolve();
    });
    await diveLoadedPromise;
    this.store.dispatch(new AuthoringStageActions.TryAddDiveData(diveLinker.getIOList()));
  }
}
