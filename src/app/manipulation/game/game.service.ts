import { ChooseService } from './../choose/choose.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GameService {
  public snackBarSubject = new Subject();
  public stageDataSubject = new Subject();
  public snackBarOffSubject = new Subject();
  public stageData = {};
  constructor(private chooseService: ChooseService) {}
  getStageData() {
    this.stageData = this.chooseService.stageDataArray[this.chooseService.editStageIndex]['stageData'];
  }
  moveEditStageIndex() {
    const stageDataArray = this.chooseService.stageDataArray;
    const index = this.chooseService.editStageIndex;
    if (stageDataArray.length !== index + 1) {
      this.chooseService.editStageIndex += 1;
      this.stageData = this.chooseService.getStageDataArray();
    }
  }
  getPassCondition() {
    return this.stageData['passCondition'];
  }
  getDiagnosis() {
    return this.stageData['conditionData'];
  }
  transformBlockDef() {
    let i = 0;
    const blockData = this.stageData['blocklyData'].map(item => {
      const data = {};
      data['type'] = item.blockDef.split('\'')[1];
      data['content'] = item.blockDef.split('{')[2].split('}')[0];
      data['generator'] = this.rebuiltCodegen(i, item.blockDef, item.blockGen);
      i++;
      return data;
    });
    let str = '';
    blockData.forEach(data => {
      str += `${data['type']}@^&${data['content']}@^&${data['generator']}#^&`;
    });
    return str.replace(/\n/g, '');
  }
  rebuiltCodegen(blockIndex, defCode, genCode) {
    const diveData = this.stageData['diveData']['inValue'];
    let diveIndex = '';
    let type = '';
    if (defCode.indexOf('Number') !== -1) {
      type = 'number';
    } else {
      type = 'angle';
    }
    this.stageData['bindingData'].forEach(item => {
      if (item.blocklyIndex === blockIndex) {
        diveIndex = item.diveIndex;
      }
    });
    const diveId = diveData[diveIndex].dataValue;
    console.log(genCode);
    const value = genCode.split('var')[1].split(' = ')[1].split(';')[0].replace(/"/g, '\'');
    console.log(`return "const type=\\\`${type}\\\`;diveLinker.Send(${diveId}, " + ${value} + ");";`);
    return `return "const type=\\\`${type}\\\`;diveLinker.Send(${diveId}, " + ${value} + ");";`;
  }
}
