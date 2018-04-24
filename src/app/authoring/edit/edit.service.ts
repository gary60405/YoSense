import { Injectable } from '@angular/core';
import { ManagementService } from '../management/management.service';

@Injectable()
export class EditService {

  constructor(private managementService: ManagementService) { }
  public diveId: number;
  public diveDataArray = [];
  public blocklyDataArray = [];
  public bindingDataArray = [];
  public conditionDataArray = [];
  public passConditionArray = [];
  public readonly operators = ['=', '!=', '>', '>=', '<', '<='];
  submitData() {
    const data = {diveId: 0, diveData: [], blocklyData: [], bindingData: [], conditionData: [], passCondition: []};
    data['diveId'] = this.diveId;
    data['diveData'] = this.diveDataArray;
    data['blocklyData'] = this.blocklyDataArray;
    data['bindingData'] = this.bindingDataArray;
    data['conditionData'] = this.conditionDataArray;
    data['passCondition'] = this.passConditionArray;
    const projectIndex = this.managementService.editProjectIndex;
    const stageIndex = this.managementService.editStageIndex;
    console.log(data);
    this.managementService.projectDataArray[projectIndex].lastModify = new Date();
    this.managementService.projectDataArray[projectIndex].stage[stageIndex].stageData = data;
  }
  transDataFormat(res: any[]) {
    this.diveDataArray = res.map((row) => {
      const newRow = {dataValue: '', viewValue: ''};
      [newRow['dataValue'], newRow['viewValue']] = [row['id'].toString(), row['name']];
      return newRow;
    });
    console.log(this.diveDataArray);
  }
  getPassConditionArray() {
    return this.passConditionArray.slice();
  }
  getBindingDataArray() {
    return this.bindingDataArray.slice();
  }
  getConditionDataArray() {
    return this.conditionDataArray.slice();
  }
  getDiveDataArray() {
    return this.diveDataArray.slice();
  }
  getBlocklyDataArray() {
    return this.blocklyDataArray.slice();
  }
  getOperators() {
    return this.operators.slice();
  }
}
