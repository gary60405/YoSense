import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

import { AppState } from '../../../model/app/app.model';
import { DiveDataState } from './../../../model/authoring/management.model';
import * as AuthoringStageActions from './../store/authoringStage.actions';
import * as HeaderActions from './../../../header/store/header.actions';
import { diveLoadedStateSelector, diveIdCheckedSelector, selectedStageDateSelector, diveIdStateSelector } from '../store/authoringStage.selectors';

@Component({
  selector: 'app-dive',
  templateUrl: './dive.component.html',
  styleUrls: ['./dive.component.css']
})
export class DiveComponent implements OnInit {
  @ViewChild('diveDialog') diveDialog;
  @ViewChild('code') code;
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

  confirm() {
    this.store.dispatch(new AuthoringStageActions.SetDiveLoadedState(false));
    this.store.dispatch(new AuthoringStageActions.SetDiveIdState(this.code.nativeElement.value));
    this.url = `http://120.114.170.2:8080/Experiment/kaleTestExperiment5.jsp?eid=${this.code.nativeElement.value}`;
    const solvePromise = (text, timer) => new Promise(resolve => setTimeout(() => resolve(eval(text)), timer));
    solvePromise('diveLinker.Hello()', 3000)
      .then((res) => solvePromise('diveLinker.IOArray', 100))
      .then((res: DiveDataState) => this.store.dispatch(new AuthoringStageActions.TryAddDiveData(res)));
  }
}
