import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {MatDialog } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ChooseService } from '../choose.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('projectDialog') projectDialog;
  @ViewChild('deleteProjectDialog') deleteProjectDialog;
  constructor(private dialog: MatDialog,
              private chooseService: ChooseService,
              private authService: AuthService,
              private afStore: AngularFirestore) { }
  projectData = [];
  deleteIndex = -1;
  projectCode: number;
  isLoadedProject = false;
  userInfoSubscription = new Subscription();
  projectDataSubscrption = new Subscription();
  ngOnInit() {
    this.chooseService.editMode = false;
    this.projectDataSubscrption = this.chooseService.projectDataSubject
      .subscribe(res => {
        this.isLoadedProject = true;
        this.projectData = res;
      });
    this.userInfoSubscription = this.authService.userInfoSubject.subscribe(data => {
      this.afStore.collection('project').valueChanges()
        .subscribe(projects => {
          const projectPromise = new Promise((resolve, reject) => {
            projects = projects.filter(project => {
              return data['project'].find(projectIndex => project['uid'] === projectIndex);
            }).map(row => {
              row['lastModify'] = row['lastModify'].toDate();
              row['createDate'] = row['createDate'].toDate();
              return row;
            });
            resolve(projects);
          });
          projectPromise.then((res: {}[]) => {
            this.chooseService.projectDataArray = res;
            this.chooseService.projectDataSubject.next(res);
          });
        });
    });
    const userInfo = this.authService.userInfo;
    this.authService.userInfoSubject.next(userInfo);
  }
  onShowSideInfo(index) {
    this.chooseService.sideInfo = this.projectData[index];
    this.chooseService.editProjectIndex = index;
  }
  onAddProjectDialogOpen() {
    this.dialog.open(this.projectDialog);
  }
  onDeleteProject() {
    this.projectData.splice(this.deleteIndex, 1);
    this.chooseService.deleteProjectData(this.projectData);
    this.deleteIndex = -1;
  }
  onJoinProject() {
    this.chooseService.joinProject(this.projectCode);
  }
  onCheckDelete(index) {
    this.deleteIndex = index;
    this.dialog.open(this.deleteProjectDialog);
  }
  ngOnDestroy() {
    this.userInfoSubscription.unsubscribe();
    this.projectDataSubscrption.unsubscribe();
  }

}
