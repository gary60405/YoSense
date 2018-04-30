import { ShareService } from './../../../share/share.service';
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
  deleteIndex = -1;
  isLoadedProject = false;
  constructor(public dialog: MatDialog,
              private managementService: ManagementService,
              private shareService: ShareService) { }
  ngOnInit() {
    this.managementService.sideInfo = {};
    this.managementService.editModeSubject.next(true);
    this.stageForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
    this.managementService.stageDataSubject
      .subscribe(stage => {
        this.stageData = stage;
        this.isLoadedProject = true;
      });
    this.managementService.getStageData();
  }

  onShowSideInfo(index) {
    this.managementService.sideInfo = this.managementService.stageDataArray[index];
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
    stageData['stageData'] = {};
    this.stageData.push(stageData);
    this.managementService.addStageData(stageData);
    this.stageForm.reset();
  }
  onDeleteStage() {
    this.managementService.deleteStageData(this.deleteIndex);
    this.deleteIndex = -1;
  }
  onAddStageDialogOpen() {
    this.dialog.open(this.stageDialog);
  }
}
