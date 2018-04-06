import { Injectable } from '@angular/core';

@Injectable()
export class EditService {

  constructor() { }
  public diveDataArray = [
    {value: '0001', viewValue: '0001'},
    {value: '0002', viewValue: '0002'},
    {value: '0003', viewValue: '0003'},
  ];
  public blocklyDataArray = [
    {name: '121', blockDef: '123', blockGen: '123', isDisabled: false},
    {name: '122', blockDef: '123', blockGen: '123', isDisabled: false},
    {name: '123', blockDef: '123', blockGen: '123', isDisabled: false},
  ];
  public conditionDataArray = [];
  public passConditionArray = [];
  public readonly operators = ['=', '!=', '>', '>=', '<', '<='];
  transDataFormat(res: any[]) {
    this.diveDataArray = res.map((row) => {
      const newRow = {value: '', viewValue: ''};
      [newRow['value'], newRow['viewValue']] = [row['id'], row['name']];
      return newRow;
    });
  }
  getPassConditionArray() {
    return this.passConditionArray.slice();
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
