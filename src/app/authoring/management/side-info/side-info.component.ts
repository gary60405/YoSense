import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { AppState } from '../../../model/app/app.model';
import * as AppActions from './../../../store/app.actions';
import * as AuthoringStageActions from './../../edit/store/authoringStage.actions';
import { ProjectState, StagesState } from '../../../model/authoring/management.model';
import { projectSideInfoSelector, selectedStageDataSelector, editModeSelector, stageSideInfoSelector } from './../../../store/app.selectors';

@Component({
  selector: 'app-side-info',
  templateUrl: './side-info.component.html',
  styleUrls: ['./side-info.component.css']
})
export class SideInfoComponent implements OnInit {

  constructor(private store: Store<AppState>) {
    this.editMode$ = store.select(editModeSelector);
    this.projectInfo$ = store.select(projectSideInfoSelector);
    this.stageInfo$ = store.select(stageSideInfoSelector);
  }
  editMode$: Observable<string>;
  projectInfo$: Observable<ProjectState>;
  stageInfo$: Observable<StagesState>;
  ngOnInit() {}
  onEditStage() {
    this.store
        .pipe(select(selectedStageDataSelector), take(1))
        .subscribe(selectedStage => {
          this.store.dispatch(new AuthoringStageActions.TryLoadSelectedStage(selectedStage));
          this.store.dispatch(new AppActions.InitailStageInfo());
        });
  }
}
