import { ShareService } from './../../../share/share.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ManagementService } from '../management.service';
import { EditService } from '../../edit/edit.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-side-info',
  templateUrl: './side-info.component.html',
  styleUrls: ['./side-info.component.css']
})
export class SideInfoComponent implements OnInit, OnDestroy {

  constructor(public managementService: ManagementService,
              private editService: EditService,
              private shareService: ShareService) { }
  projectIndex = -1;
  editMode = false;
  editModeSubscription = new Subscription();
  ngOnInit() {
    this.managementService.editModeSubject
      .subscribe(res => {
        this.editMode = res;
      });
  }
  onEditProject(index) {
    this.shareService.stepperSubject.next();
    this.projectIndex = this.managementService.editProjectIndex;
    const stageData = this.managementService.getProjectData()[this.projectIndex].stage;
    if (stageData[index]['stageData']['diveId'] === undefined) {
      this.editService.diveId = null;
    } else {
      this.editService.diveId = stageData[index]['stageData']['diveId'];
    }
    if (stageData[index]['stageData']['diveData'] === undefined) {
      this.editService.diveDataArray = [];
    } else {
      this.editService.diveDataArray = stageData[index]['stageData']['diveData'];
    }
    if (stageData[index]['stageData']['blocklyData'] === undefined) {
      this.editService.blocklyDataArray = [];
    } else {
      this.editService.blocklyDataArray = stageData[index]['stageData']['blocklyData'];
    }
    if (stageData[index]['stageData']['bindingData'] === undefined) {
      this.editService.bindingDataArray = [];
    } else {
      this.editService.bindingDataArray = stageData[index]['stageData']['bindingData'];
    }
    if (stageData[index]['stageData']['conditionData'] === undefined) {
      this.editService.conditionDataArray = [];
    } else {
      this.editService.conditionDataArray = stageData[index]['stageData']['conditionData'];
    }
    if (stageData[index]['stageData']['passCondition'] === undefined) {
      this.editService.passConditionArray = [];
    } else {
      this.editService.passConditionArray = stageData[index]['stageData']['passCondition'];
    }
  }
  ngOnDestroy() {
    this.editModeSubscription.unsubscribe();
  }
}
