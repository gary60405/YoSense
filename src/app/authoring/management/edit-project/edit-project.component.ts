import { StagesState } from './../../../model/authoring/management.model';
import { take } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Appstate } from '../../../store/app.reducers';
import { stageLoadedStateSelector, deleteDataSetSelector, stageDataStateSelector } from '../../store/authoring.selectors';
import * as AuthoringActions from './../../store/authoring.actions';

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
              private store: Store<Appstate>) {
    this.stageData$ = store.pipe(select(stageDataStateSelector));
    this.isStageLoaded$ = store.pipe(select(stageLoadedStateSelector));
  }
  ngOnInit() {
    this.stageForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  onShowSideInfo(index) {
    this.store.select(stageDataStateSelector)
      .pipe(take(1))
      .subscribe((stagesData: StagesState[]) => {
        const data = {index: index, stages: stagesData[index]};
        this.store.dispatch(new AuthoringActions.SetStageSideInfo(data));
      });
  }

  onCheckDelete(index) {
    this.deleteIndex = index;
    this.dialog.open(this.deleteStageDialog);
  }
  onAddstage() {
    const stageData = this.stageForm.value;
    this.store.pipe(select(stageDataStateSelector))
      .pipe(take(1))
      .subscribe((stagesData: StagesState[]) => {
        stageData['order'] = stagesData.length;
        stageData['createDate'] = new Date();
        stageData['lastModify'] = new Date();
        stageData['stageData'] = [];
        this.stageForm.reset();
      });
  }
  onDeleteStage() {
    this.store.pipe(select(deleteDataSetSelector, this.deleteIndex))
      .pipe(take(1))
      .subscribe((deleteDataSet: {uid: string, stageName: string}) => this.store.dispatch(new AuthoringActions.TryDeleteStage({...deleteDataSet, index: this.deleteIndex})));
    this.deleteIndex = -1;
  }

  onAddStageDialogOpen() {
    this.dialog.open(this.stageDialog);
  }
}
