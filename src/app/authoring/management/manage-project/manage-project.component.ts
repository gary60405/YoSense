import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import * as AppActions from './../../../store/app.actions';
import { AppState } from '../../../model/app/app.model';
import { UserDataState } from '../../../model/auth/auth.model';
import { AddProjectState } from '../../../model/selector/selector.model';
import { ProjectState, ProjectSideInfoState } from '../../../model/authoring/management.model';
import { userDataStateSelector } from './../../../auth/store/auth.selectors';
import { projectLoadedStateSelector, projectDataStateSelector, addProjectSelector, projectSideInfoStateSelector } from './../../../store/app.selectors';

@Component({
  selector: 'app-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrls: ['./manage-project.component.css']
})
export class ManageProjectComponent implements OnInit {
  @ViewChild('projectDialog', { static: true }) projectDialog;
  @ViewChild('deleteProjectDialog', { static: true }) deleteProjectDialog;
  projectForm: FormGroup;
  projectData$: Observable<ProjectState[]>;
  isProjectLoaded$: Observable<boolean>;
  deleteIndex = -1;

  constructor(public dialog: MatDialog,
              private store: Store<AppState>,
              public afStore: AngularFirestore
              ) {
    this.projectData$ = store.pipe(select(projectDataStateSelector));
    this.isProjectLoaded$ = store.pipe(select(projectLoadedStateSelector));
  }

  ngOnInit() {
    this.store.dispatch(new AppActions.InitailProjectInfo());
    this.store
        .pipe(select(userDataStateSelector), take(1))
        .subscribe((userData: UserDataState) => this.store.dispatch(new AppActions.TryLoadProjectsData(userData)));
    this.projectForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  onShowSideInfo(index: number) {
    this.store.dispatch(new AppActions.SetEditProjectIndex(index));
    this.store
        .pipe(select(projectSideInfoStateSelector(index)), take(1))
        .subscribe((projectData: ProjectSideInfoState) => this.store.dispatch(new AppActions.SetProjectSideInfo(projectData)));
  }

  onDeleteProject() {
    this.store
        .pipe(select(projectDataStateSelector), take(1))
        .subscribe((projectData: ProjectState[]) => this.store.dispatch(new AppActions.TryDeleteProject(projectData[this.deleteIndex].uid)));
    this.deleteIndex = -1;
  }

  onAddProject() {
    this.store
        .pipe(select(addProjectSelector, this.projectForm.value), take(1))
        .subscribe((addProjectSet: AddProjectState) => this.store.dispatch(new AppActions.TryAddProject(addProjectSet)));
    this.projectForm.reset();
  }

  onAddProjectDialogOpen() {
    this.dialog.open(this.projectDialog);
  }

  onCheckDelete(index) {
    this.deleteIndex = index;
    this.dialog.open(this.deleteProjectDialog);
  }
}
