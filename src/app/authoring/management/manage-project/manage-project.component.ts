import { take } from 'rxjs/operators';
import { projectDataStateSelector, addProjectSelector } from './../../store/authoring.selectors';
import { Appstate } from './../../../store/app.reducers';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectState } from '../../../model/authoring/management.model';
import { userDataStateSelector } from '../../../auth/store/auth.selectors';
import { UserDataState } from '../../../model/auth/auth.model';
import * as AuthoringActions from './../../store/authoring.actions';
import { projectLoadedStateSelector } from '../../store/authoring.selectors';
@Component({
  selector: 'app-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrls: ['./manage-project.component.css']
})
export class ManageProjectComponent implements OnInit {
  @ViewChild('projectDialog') projectDialog;
  @ViewChild('deleteProjectDialog') deleteProjectDialog;
  projectForm: FormGroup;
  projectData$: Observable<ProjectState[]>;
  isProjectLoaded$: Observable<boolean>;
  deleteIndex = -1;

  constructor(public dialog: MatDialog,
              private store: Store<Appstate>) {
    this.projectData$ = store.pipe(select(projectDataStateSelector));
    this.isProjectLoaded$ = store.pipe(select(projectLoadedStateSelector));
  }

  ngOnInit() {
    // this.store.pipe(select(userDataStateSelector))
    //   .subscribe((res: UserDataState) => {
    //     res.project
    //       .filter(data => data !== 'F2nV')
    //       .forEach(data => {
    //         if (data !== 'F2nV') {
    //           this.afStore.collection('project').doc(data).delete();
    //         }
    //       });
    //   });
    //   this.afStore.collection('user').doc('gary60405@gmail.com').update({project: ['F2nV']});
    // this.afStore.collection('project').doc('F2nV').update({
    //   createDate: new Date(),
    //   description: 'good',
    //   lastModify: new Date(),
    //   name: 'gf',
    //   uid: 'F2nV'
    // });
    // this.afStore.collection('project').valueChanges()
    //   .subscribe(res => {
    //     res.filter(data => data['author'] === 'gary60405@gmail.com' && data['uid'] !== 'F2nV')
    //        .map(data => data['uid'])
    //        .forEach(uid => this.afStore.collection('project').doc(uid).delete());
    //   });
    this.store.dispatch(new AuthoringActions.InitailProjectInfo());
    this.store.select(userDataStateSelector)
      .pipe(take(1))
      .subscribe((userData: UserDataState) => {
        this.store.dispatch(new AuthoringActions.TryLoadProjectsData(userData));
      });
    this.projectForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  onShowSideInfo(index: number) {
    this.store.select(projectDataStateSelector)
      .pipe(take(1))
      .subscribe((projectData: ProjectState[]) => {
        const data = {index: index, projects: projectData[index]};
        this.store.dispatch(new AuthoringActions.SetProjectSideInfo(data));
      });
  }

  onDeleteProject() {
    this.store.pipe(select(projectDataStateSelector))
      .pipe(take(1))
      .subscribe((projectData: ProjectState[]) => this.store.dispatch(new AuthoringActions.TryDeleteProject(projectData[this.deleteIndex].uid)));
    this.deleteIndex = -1;
  }

  onAddProject() {
    this.store.pipe(select(addProjectSelector))
      .pipe(take(1))
      .subscribe((res: UserDataState) => this.store.dispatch(new AuthoringActions.TryAddProject({userData: res, projectData: this.projectForm.value})));
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
