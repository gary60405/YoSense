import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit, ViewChild  } from '@angular/core';

import * as AppActions from './../../../store/app.actions';
import * as ManipulationActions from './../../store/manipulation.actions';
import { AppState } from '../../../model/app/app.model';
import { UserDataState } from './../../../model/auth/auth.model';
import { ProjectState } from '../../../model/authoring/management.model';
import { JoinProjectSetState } from '../../../model/selector/selector.model';
import { DeleteProjectState } from './../../../model/selector/selector.model';
import { userDataStateSelector } from './../../../auth/store/auth.selectors';
import { joinProjectSetSelector, deleteProjectSelector } from '../../store/manipulation.selectors';
import { projectDataStateSelector, projectLoadedStateSelector } from './../../../store/app.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('projectDialog') projectDialog;
  @ViewChild('repeatDialog') repeatDialog;
  @ViewChild('deleteProjectDialog') deleteProjectDialog;
  constructor(private afStore: AngularFirestore,
              private dialog: MatDialog,
              private store: Store<AppState>) {
    this.projectData$ = store.pipe(select(projectDataStateSelector));
    this.isLoadedProject$ = store.pipe(select(projectLoadedStateSelector));
  }
  projectData$: Observable<ProjectState[]>;
  isLoadedProject$: Observable<boolean>;
  deleteIndex = -1;
  projectCode: string;
  specification: string;
  ngOnInit() {
    this.store.dispatch(new AppActions.InitailProjectInfo);
    this.store
        .pipe(select(userDataStateSelector), take(1))
        .subscribe((userData: UserDataState) => this.store.dispatch(new AppActions.TryLoadProjectsData(userData)));
  }
  onShowSideInfo(index) {
    this.store
        .pipe(select(projectDataStateSelector), take(1))
        .subscribe((projectData: ProjectState[]) => this.store.dispatch(new AppActions.SetProjectSideInfo({index: index, projects: projectData[index]})));
  }
  onAddProjectDialogOpen() {
    this.projectCode = '';
    this.dialog.open(this.projectDialog);
  }

  onDeleteProject() {
    this.store
        .pipe(select(deleteProjectSelector, this.deleteIndex), take(1))
        .subscribe((deleteProjectSet: DeleteProjectState) => this.store.dispatch(new AppActions.TryDeleteUserProject(deleteProjectSet)));
    this.deleteIndex = -1;
  }

  onJoinProject() {
    this.afStore.collection('project', ref => ref.where('uid', '==', this.projectCode)).get()
      .subscribe((res) => {
        if (!res.empty) {
          this.store.pipe(select(joinProjectSetSelector, this.projectCode), take(1))
              .subscribe((joinProject: JoinProjectSetState) => {
                if (joinProject.userData.project.find(data => data === this.projectCode) === undefined) {
                  this.store.dispatch(new AppActions.TryAddUserProject(joinProject));
                } else {
                  this.specification = '該專案已存在';
                  this.dialog.open(this.repeatDialog);
                }
              });
        } else {
          this.specification = '請輸入正確專案代碼';
          this.dialog.open(this.repeatDialog);
        }
      });
  }

  onCheckDelete(index) {
    this.deleteIndex = index;
    this.dialog.open(this.deleteProjectDialog);
  }

}
