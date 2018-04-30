import { Injectable } from '@angular/core';
import { ManagementService } from '../management/management.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EditService {

  constructor(private managementService: ManagementService) { }
  public diveId = 0;
  public diveDataArray = {};
  public blocklyDataArray = [];
  public bindingDataArray = [];
  public conditionDataArray = [];
  public passConditionArray = [];
  public readonly operators = ['=', '!=', '>', '>=', '<', '<='];
  public diveDataSubject = new Subject<{}>();
  submitData() {
    const data = {
      lastModify: new Date(),
      stageData: {
        diveId: this.diveId,
        diveData: this.diveDataArray,
        blocklyData: this.blocklyDataArray,
        bindingData: this.bindingDataArray,
        conditionData: this.conditionDataArray,
        passCondition: this.passConditionArray
      }
    };
    this.managementService.updateStageProject(data);
  }
  transDataFormat(res: {}) {
    this.diveDataArray['inValue'] = res['inValue'].map((row) => {
      const newRow = {dataValue: '', viewValue: ''};
      [newRow['dataValue'], newRow['viewValue']] = [row['id'].toString(), row['name']];
      return newRow;
    });
    this.diveDataArray['outValue'] = res['outValue'].map((row) => {
      const newRow = {dataValue: '', viewValue: ''};
      [newRow['dataValue'], newRow['viewValue']] = [row['id'].toString(), row['name']];
      return newRow;
    });
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
    this.diveDataSubject.next(this.diveDataArray);
  }
  getBlocklyDataArray() {
    return this.blocklyDataArray.slice();
  }
  getOperators() {
    return this.operators.slice();
  }
}
