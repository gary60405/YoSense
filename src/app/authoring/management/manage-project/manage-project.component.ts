import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {MatDialog } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ManagementService } from './../management.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrls: ['./manage-project.component.css']
})
export class ManageProjectComponent implements OnInit, OnDestroy {
  @ViewChild('projectDialog') projectDialog;
  @ViewChild('deleteProjectDialog') deleteProjectDialog;
  projectForm: FormGroup;
  projectData = [];
  isLoadedProject = false;
  deleteIndex = -1;
  nowDate: Date;
  constructor(public dialog: MatDialog,
              private managementService: ManagementService,
              private afStore: AngularFirestore,
              private authService: AuthService) { }
  projectDataSubscrption = new Subscription();
  userInfoSubscription = new Subscription();
  ngOnInit() {
    this.managementService.editModeSubject.next(false);
    this.projectDataSubscrption = this.managementService.projectDataSubject
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
            this.managementService.projectDataArray = res;
            this.managementService.projectDataSubject.next(res);
          });
        });
    });
    const userInfo = this.authService.userInfo;
    this.authService.userInfoSubject.next(userInfo);
    this.projectForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  onShowSideInfo(index) {
    this.managementService.editProjectIndex = index;
    this.managementService.sideInfo = this.projectData[index];
  }
  onDeleteProject() {
    this.managementService.deleteProjectData(this.projectData[this.deleteIndex]['uid']);
    this.deleteIndex = -1;
  }
  onAddProject() {
    this.managementService.addProjectData(this.projectForm.value);
    this.projectForm.reset();
  }
  onAddProjectDialogOpen() {
    this.dialog.open(this.projectDialog);
  }
  onCheckDelete(index) {
    this.deleteIndex = index;
    this.dialog.open(this.deleteProjectDialog);
  }
  ngOnDestroy() {
    this.projectDataSubscrption.unsubscribe();
    this.userInfoSubscription.unsubscribe();
  }
}
