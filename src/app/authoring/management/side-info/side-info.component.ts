import { take } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ManagementService } from '../management.service';
import { EditService } from '../../edit/edit.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Appstate } from '../../../store/app.reducers';
import { ProjectState, StagesState } from '../../../model/authoring/management.model';
import { projectSideInfoSelector, editModeSelector, stageSideInfoSelector, projectUidStateSelector } from '../../store/authoring.selectors';
import * as AuthoringActions from './../../store/authoring.actions';

@Component({
  selector: 'app-side-info',
  templateUrl: './side-info.component.html',
  styleUrls: ['./side-info.component.css']
})
export class SideInfoComponent implements OnInit, OnDestroy {

  constructor(public managementService: ManagementService,
              private editService: EditService,
              private store: Store<Appstate>) {
    this.editMode$ = store.select(editModeSelector);
    this.projectInfo$ = store.select(projectSideInfoSelector);
    this.stageInfo$ = store.select(stageSideInfoSelector);
  }
  editMode$: Observable<string>;
  projectInfo$: Observable<ProjectState>;
  stageInfo$: Observable<StagesState>;
  projectIndex = -1;
  stageData = [];
  editModeSubscription = new Subscription();
  stageSubscription = new Subscription();
  ngOnInit() {}
  onEditProject() {
    this.store.select(projectUidStateSelector)
      .pipe(take(1))
      .subscribe((uid: string) => this.store.dispatch(new AuthoringActions.TryLoadStagesData(uid)));
  }
  onEditStage() {
    const index = this.managementService.editStageIndex;
    if (this.stageData[index]['stageData']['diveId'] === undefined) {
      this.editService.diveId = null;
    } else {
      this.editService.diveId = this.stageData[index]['stageData']['diveId'];
    }
    if (this.stageData[index]['stageData']['diveData'] === undefined) {
      this.editService.diveDataArray = {};
    } else {
      this.editService.diveDataArray = this.stageData[index]['stageData']['diveData'];
    }
    if (this.stageData[index]['stageData']['blocklyData'] === undefined) {
      this.editService.blocklyDataArray = [];
    } else {
      this.editService.blocklyDataArray = this.stageData[index]['stageData']['blocklyData'];
    }
    if (this.stageData[index]['stageData']['bindingData'] === undefined) {
      this.editService.bindingDataArray = [];
    } else {
      this.editService.bindingDataArray = this.stageData[index]['stageData']['bindingData'];
    }
    if (this.stageData[index]['stageData']['conditionData'] === undefined) {
      this.editService.conditionDataArray = [];
    } else {
      this.editService.conditionDataArray = this.stageData[index]['stageData']['conditionData'];
    }
    if (this.stageData[index]['stageData']['passCondition'] === undefined) {
      this.editService.passConditionArray = [];
    } else {
      this.editService.passConditionArray = this.stageData[index]['stageData']['passCondition'];
    }
  }
  ngOnDestroy() {
    this.editModeSubscription.unsubscribe();
    this.stageSubscription.unsubscribe();
  }
}
