import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import * as AppActions from './../../../store/app.actions';
import { AppState } from '../../../model/app/app.model';
import { StagesState } from './../../../model/authoring/management.model';
import { stageLoadedStateSelector, deleteDataSetSelector, stageDataStateSelector, projectUidStateSelector, addStageSelector } from './../../../store/app.selectors';
import { AddStageState } from '../../../model/selector/selector.model';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  @ViewChild('stageDialog') stageDialog;
  @ViewChild('deleteStageDialog') deleteStageDialog;
  deleteIndex = -1;
  stageForm: FormGroup;
  isStageLoaded$: Observable<boolean>;
  stageData$: Observable<StagesState[]>;
  constructor(public dialog: MatDialog,
              private store: Store<AppState>) {
    this.stageData$ = store.pipe(select(stageDataStateSelector));
    this.isStageLoaded$ = store.pipe(select(stageLoadedStateSelector));
  }
  ngOnInit() {
    this.store
        .pipe(select(projectUidStateSelector), take(1))
        .subscribe((uid: string) => uid !== null ? this.store.dispatch(new AppActions.TryLoadStagesData(uid)) : '');
    this.stageForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  onShowSideInfo(index) {
    this.store
        .pipe(select(stageDataStateSelector), take(1))
        .subscribe((stagesData: StagesState[]) => {
          const data = {index: index, stages: stagesData[index]};
          this.store.dispatch(new AppActions.SetStageSideInfo(data));
        });
  }

  onCheckDelete(index) {
    this.deleteIndex = index;
    this.dialog.open(this.deleteStageDialog);
  }

  onAddstage() {
    this.store
        .pipe(select(addStageSelector, this.stageForm.value), take(1))
        .subscribe((addStageData: AddStageState) => {
          this.store.dispatch(new AppActions.TryAddStage(addStageData));
          this.stageForm.reset();
        });
  }

  onDeleteStage() {
    this.store
        .pipe(select(deleteDataSetSelector, this.deleteIndex), take(1))
        .subscribe((deleteDataSet: {projectUid: string, stageUid: string}) => this.store.dispatch(new AppActions.TryDeleteStage({...deleteDataSet, index: this.deleteIndex})));
    this.deleteIndex = -1;
  }

  onAddStageDialogOpen() {
    this.dialog.open(this.stageDialog);
  }
}
