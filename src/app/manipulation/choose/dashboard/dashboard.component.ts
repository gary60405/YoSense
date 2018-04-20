import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ChooseService } from '../choose.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('projectDialog') projectDialog;
  @ViewChild('deleteProjectDialog') deleteProjectDialog;
  constructor(private dialog: MatDialog, private chooseService: ChooseService) { }
  projectData = [];
  deleteIndex = -1;
  projectCode: number;
  ngOnInit() {
    this.chooseService.editMode = false;
    this.projectData = this.chooseService.getProjectDataArray();
  }
  onShowSideInfo(index) {
    this.chooseService.sideInfo = this.chooseService.getProjectDataArray()[index];
    this.chooseService.editProjectIndex = index;
  }
  onAddProjectDialogOpen() {
    this.dialog.open(this.projectDialog);

  }
  onDeleteProject() {
    this.projectData.splice(this.deleteIndex, 1);
    this.chooseService.projectDataArray = this.projectData;
    this.deleteIndex = -1;
  }
  onAddProject() {
    console.log(this.projectCode);
  }
  onCheckDelete(index) {
    this.deleteIndex = index;
    this.dialog.open(this.deleteProjectDialog);
  }
}
