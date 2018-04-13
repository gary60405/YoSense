import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {MatDialog } from '@angular/material';
import { ManagementService } from './../management.service';
@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  @ViewChild('stageDialog') stageDialog;
  @ViewChild('deleteStageDialog') deleteStageDialog;
  stageData = [];
  stageForm: FormGroup;
  editProjectIndex = -1;
  deleteIndex = -1;
  constructor(public dialog: MatDialog,
              private managementService: ManagementService) { }
  ngOnInit() {
    this.managementService.editMode = true;
    this.editProjectIndex = this.managementService.editProjectIndex;
    this.stageForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
    this.stageData = this.managementService.getProjectData()[this.editProjectIndex].stage;
  }

  onShowSideInfo(index) {
    this.managementService.sideInfo = this.managementService.getProjectData()[this.editProjectIndex]['stage'][index];
    this.managementService.editStageIndex = index;
    console.log(this.managementService.sideInfo);
  }
  onCheckDelete(index) {
    this.deleteIndex = index;
    this.dialog.open(this.deleteStageDialog);
  }
  onAddstage() {
    const stageData = this.stageForm.value;
    stageData['order'] = this.stageData.length;
    stageData['createDate'] = new Date();
    stageData['lastModify'] = new Date();
    stageData['stageData'] = [];
    this.stageData.push(stageData);
    this.managementService.projectDataArray[this.editProjectIndex].stage = this.stageData;
    this.stageForm.reset();
  }
  onDeleteStage() {
    this.stageData.splice(this.deleteIndex, 1);
    this.managementService.projectDataArray[this.editProjectIndex].stage = this.stageData;
    this.deleteIndex = -1;
  }
  onAddStageDialogOpen() {
    this.dialog.open(this.stageDialog);
  }
}
