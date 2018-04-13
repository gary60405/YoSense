import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ManagementService } from './../management.service';
@Component({
  selector: 'app-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrls: ['./manage-project.component.css']
})
export class ManageProjectComponent implements OnInit {
  @ViewChild('projectDialog') projectDialog;
  @ViewChild('deleteProjectDialog') deleteProjectDialog;
  projectForm: FormGroup;
  projectData = [];
  deleteIndex = -1;
  nowDate: Date;
  constructor(public dialog: MatDialog,
              private managementService: ManagementService) { }

  ngOnInit() {
    this.managementService.editMode = false;
    this.projectForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
    this.projectData = this.managementService.getProjectData();
  }

  onShowSideInfo(index) {
    const projectDataArray = this.managementService.getProjectData();
    this.managementService.editProjectIndex = index;
    this.managementService.sideInfo = projectDataArray[index];
  }
  onDeleteProject() {
    this.projectData.splice(this.deleteIndex, 1);
    this.managementService.projectDataArray = this.projectData;
    this.deleteIndex = -1;
  }
  onAddProject() {
    const projectData = this.projectForm.value;
    projectData['createDate'] = new Date();
    projectData['lastModify'] = new Date();
    projectData['stage'] = [];
    this.projectData.push(projectData);
    this.managementService.projectDataArray = this.projectData;
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
