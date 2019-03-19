import { Injectable } from '@angular/core';
import { HierarchyDataState, HierarchyState } from '../../../model/authoring/authoring.model';

@Injectable({
  providedIn: 'root',
})

export class BlocklyService {

  constructor() { }

  injectStandardWorkspace(id: string, xmlText: string, workspaceName = 'workspace') {
    eval(`${workspaceName} = Blockly.inject('${id}',{toolbox:'<xml>${xmlText}</xml>',trashcan:true,grid:{spacing:30,length:3,colour:'#39261f',snap:true},zoom:{controls:true,wheel:true,startScale:1.0,maxScale:1.2,minScale:0.8,scaleSpeed:1.2}})`);
  }

  injectSimpleWorkspace(id: string, startScale = 1.5, minScale = 1, workspaceName = 'workspace') {
    eval(`${workspaceName} = Blockly.inject('${id}',{zoom: {wheel: true,startScale:${startScale},minScale:${minScale}}})`);
  }

  appendBlocksToWorkspace(x: number, y: number, workspaceName = 'workspace') {
    eval(`Blockly.Xml.appendDomToWorkspace(Blockly.Xml.textToDom('<xml><block id="a" type="block_type" x="${x}" y="${y}"></block></xml>'), ${workspaceName});`);
  }

  getBlockGenCode(blockId: string, content: string) {
    return `Blockly.JavaScript['${blockId}'] = (block) => {${content}};`;
  }

  getDiveState(stateArray: HierarchyState[]) {
    const diveState = {};
    stateArray.forEach((state: HierarchyState) => {
      diveState[state.name] = {};
      state.states.forEach((stateData: HierarchyDataState) => {
        diveState[state.name][stateData.stateName] = {};
        diveState[state.name][stateData.stateName]['diveID'] = stateData.diveData.diveNumber;
        diveState[state.name][stateData.stateName]['value'] = stateData.diveData.diveValue;
      });
    });
    return `const diveState = ${JSON.stringify(diveState)};`;
  }

  clearWorkspace(workspace = 'workspace') {
    eval(`${workspace}.clear();`);
  }

  mergeCategory(categoryName, blocks) {
    const category = new Map()
      .set('', '')
      .set('general', `<category name="一般" colour="#FF4067">${blocks}</category>`)
      .set('logic', `<category name="邏輯" colour="#5C81A6">${blocks}</category>`)
      .set('controls', `<category name="迴圈" colour="#5CA65C">${blocks}</category>`)
      .set('math', `<category name="數學" colour="#5C68A6">${blocks}</category>`)
      .set('text', `<category name="文字" colour="#5CA68D">${blocks}</category>`)
      .set('lists', `<category name="列表" colour="#745CA6">${blocks}</category>`)
      .set('colour', `<category name="顏色" colour="#A6745C">${blocks}</category>`)
      .set('variable', blocks)
      .set('function', blocks);
    return category.get(categoryName);
  }
}
