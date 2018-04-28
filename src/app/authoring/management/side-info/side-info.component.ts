import { ShareService } from './../../../share/share.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ManagementService } from '../management.service';
import { EditService } from '../../edit/edit.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-side-info',
  templateUrl: './side-info.component.html',
  styleUrls: ['./side-info.component.css']
})
export class SideInfoComponent implements OnInit, OnDestroy {

  constructor(public managementService: ManagementService,
              private editService: EditService,
              private shareService: ShareService,
              private authService: AuthService) { }
  projectIndex = -1;
  editMode = false;
  projectInfo = {};
  stageData = [];
  editModeSubscription = new Subscription();
  stageSubscription = new Subscription();
  ngOnInit() {
    this.editModeSubscription =  this.managementService.editModeSubject
      .subscribe(res => {
        this.editMode = res;
      });
    this.stageSubscription = this.managementService.stageDataSubject
      .subscribe(res => {
        console.log(res);
        this.stageData = res;
      });
  }
  onEditProject() {
    this.managementService.sideInfo = {};
  }
  onEditStage() {
    this.shareService.stepperSubject.next();
    const index = this.managementService.editStageIndex;
    if (this.stageData[index]['stageData']['diveId'] === undefined) {
      this.editService.diveId = null;
    } else {
      this.editService.diveId = this.stageData[index]['stageData']['diveId'];
    }
    if (this.stageData[index]['stageData']['diveData'] === undefined) {
      this.editService.diveDataArray = [];
    } else {
      this.editService.diveDataArray = this.stageData[index]['stageData']['diveData'];
    }
    if (this.stageData[index]['stageData']['blocklyData'] === undefined) {
      this.editService.blocklyDataArray = [];
    } else {
      this.editService.blocklyDataArray = this.stageData[index]['stageData']['blocklyData'];
    }
    if (this.stageData[index]['stageData']['bindingData'] === undefined) {
      this.editService.bindingDataArray = [];
    } else {
      this.editService.bindingDataArray = this.stageData[index]['stageData']['bindingData'];
    }
    if (this.stageData[index]['stageData']['conditionData'] === undefined) {
      this.editService.conditionDataArray = [];
    } else {
      this.editService.conditionDataArray = this.stageData[index]['stageData']['conditionData'];
    }
    if (this.stageData[index]['stageData']['passCondition'] === undefined) {
      this.editService.passConditionArray = [];
    } else {
      this.editService.passConditionArray = this.stageData[index]['stageData']['passCondition'];
    }
  }
  ngOnDestroy() {
    this.editModeSubscription.unsubscribe();
    this.stageSubscription.unsubscribe();
  }
}
