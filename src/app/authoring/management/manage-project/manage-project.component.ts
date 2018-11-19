import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import * as AppActions from './../../../store/app.actions';
import { AppState } from '../../../model/app/app.model';
import { UserDataState } from '../../../model/auth/auth.model';
import { AddProjectState } from '../../../model/selector/selector.model';
import { ProjectState } from '../../../model/authoring/management.model';
import { userDataStateSelector } from './../../../auth/store/auth.selectors';
import { projectLoadedStateSelector, projectDataStateSelector, addProjectSelector } from './../../../store/app.selectors';

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
              private store: Store<AppState>,
              public afStore: AngularFirestore
              ) {
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
      // this.afStore.collection('user').doc('gary60405@gmail.com').update({project: ['F2nV']});
    // this.afStore.collection('project').doc('9esW').update({
    //   author: 'gary60405@gmail.com',
    //   createDate: new Date(),
    //   description: 'good',
    //   lastModify: new Date(),
    //   name: 'gf',
    //   uid: '9esW'
    // });
    // this.afStore.collection('project').valueChanges()
    //   .subscribe(res => {
    //     res.filter(data => data['author'] === 'gary60405@gmail.com' && data['uid'] !== 'F2nV')
    //        .map(data => data['uid'])
    //        .forEach(uid => this.afStore.collection('project').doc(uid).delete());
    //   });
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
    this.store
        .pipe(select(projectDataStateSelector), take(1))
        .subscribe((projectData: ProjectState[]) => this.store.dispatch(new AppActions.SetProjectSideInfo({index: index, projects: projectData[index]})));
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
