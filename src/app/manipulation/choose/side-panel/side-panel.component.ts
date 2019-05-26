import { editModeSelector, projectSideInfoSelector } from './../../../store/app.selectors';
import { ProjectState, StagesState } from './../../../model/authoring/management.model';
import { AppState } from './../../../model/app/app.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { stageSideInfoSelector } from '../../../store/app.selectors';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {

  constructor(private store: Store<AppState>) {
    this.editMode$ = store.select(editModeSelector);
    this.stageInfo$ = store.select(stageSideInfoSelector);
    this.projectInfo$ = store.select(projectSideInfoSelector);
  }
  editMode$: Observable<string>;
  projectInfo$: Observable<ProjectState>;
  stageInfo$: Observable<StagesState>;
  ngOnInit() {
  }

}
