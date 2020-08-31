import { Injectable } from '@angular/core';
import { HierarchyDataState, HierarchyState } from '../../../model/authoring/authoring.model';
import { blocklyGroup, diveGroup, remixGroup, connectionType, portalType, embeddingNumber, externalType } from './js/rule';
declare var Blockly: any;
declare var js_beautify: any;

@Injectable({
  providedIn: 'root',
})

export class BlocklyService {

  constructor() { }
  public workspace: any;
  public categoryOder = new Map()
    .set('general', 1)
    .set('logic', 2)
    .set('controls', 3)
    .set('math', 4)
    .set('text', 5)
    .set('lists', 6)
    .set('colour', 7)
    .set('function', 8)
    .set('variable', 9);
  public executeCodePreset =
    `
      let isStop = 0;
      const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      document.getElementById("closePreviewBtn").addEventListener("click", () => isStop = 1, {once: true});
      document.getElementById("reloadPreviewBtn").addEventListener("click", () => isStop = 1, {once: true});
      const diveLinker = new DiveLinker('mainExperiment', {'autoShakehand': false});
      diveLinker.id = 'DIVE_LINKER_ID';
      (async()=>{@@})();
    `;
  private standardWorkspaceConfig = {
    toolbox: '',
    trashcan: true,
    grid: {
      spacing: 30,
      length: 3,
      colour: '#39261f',
      snap: true
    },
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 2,
      minScale: 0.8,
      scaleSpeed: 1.2
    }
  };

  private blocklyPreviewer1Config = {
    zoom: {
      wheel: true,
      startScale: 1,
      minScale: 1
    }
  };

  private blocklyPreviewer2Config = {
    zoom: {
      wheel: true,
      startScale: 1.5,
      minScale: 1
    }
  };

  injectWorkspace(workspaceId: string, xmlText = '') {
    this.standardWorkspaceConfig.toolbox = `<xml>${xmlText}</xml>`;
    const configuration = workspaceId === 'blocklyPreviewer1' ? this.blocklyPreviewer1Config
      : workspaceId === 'blocklyPreviewer2' ? this.blocklyPreviewer2Config
      : workspaceId === 'blocklyDiv' || workspaceId === 'toolBoxPreviewer' ? this.standardWorkspaceConfig : '';
    this.workspace = Blockly.inject(workspaceId, configuration);
  }

  clearWorkspace() {
    this.workspace.clear();
  }

  appendBlockToWorkspace(type: string, x: number, y: number) {
    Blockly.Xml.appendDomToWorkspace(Blockly.Xml.textToDom(`<xml><block id="a" type="${type}" x="${x}" y="${y}"></block></xml>`), this.workspace);
  }

  appendBlocksToWorkspace(xml: string) {
    Blockly.Xml.appendDomToWorkspace(Blockly.Xml.textToDom(xml), this.workspace);
  }

  restoreBlockCodeToWorkspace(xml) {
    Blockly.Xml.appendDomToWorkspace(Blockly.Xml.textToDom(xml), this.workspace);
  }

  executeCode(code: string) {
    console.log(js_beautify(code));
    eval(code);
  }

  getWorkspaceCode() {
    return js_beautify(Blockly.JavaScript.workspaceToCode(this.workspace));
  }

  getBlockCodeState() {
    return Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.workspace));
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

  blockTypeClassify(content: {viewName: string, blockTypeContent: string}[]) {
    const finalMap = new Map();
    const block = content.filter(data => blocklyGroup.includes(data['blockTypeContent']));
    const dive = content.filter(data => diveGroup.includes(data['blockTypeContent']));
    const remix = content.filter(data => remixGroup.includes(data['blockTypeContent']));
    finalMap.set('BLOCKLY', block).set('DIVE', dive).set('REMIX', remix);
    return finalMap;
  }

  blockTypeContentFilter(blockDef: any, content: {viewName: string, blockTypeContent: string}[]) {
    content = blockDef['connectionType'] === 'LEFT_OUTPUT' ? content.filter(data => connectionType['LEFT_OUTPUT'].includes(data['blockTypeContent']))
    : content.filter(data => connectionType['OTHER'].includes(data['blockTypeContent']));
    // console.log(content);
    content = blockDef['portalType'] === 'NONE' ? content.filter(data => portalType['NONE'].includes(data['blockTypeContent']))
    : blockDef['embeddingNumber'] === 'NUM_1' ? content.filter(data => embeddingNumber['NUM_1'].includes(data['blockTypeContent']))
    : blockDef['embeddingNumber'] === 'NUM_2' ? content.filter(data => embeddingNumber['NUM_2'].includes(data['blockTypeContent']))
    : blockDef['externalType'] === 'TYPE_SINGLE' ? content.filter(data => externalType['TYPE_SINGLE'].includes(data['blockTypeContent']))
    : blockDef['externalType'] === 'TYPE_STATEMENT' ? content.filter(data => externalType['TYPE_STATEMENT'].includes(data['blockTypeContent']))
    : [];
    // console.log(content);
    return this.blockTypeClassify(content);
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
