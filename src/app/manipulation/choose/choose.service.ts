import { Injectable } from '@angular/core';

@Injectable()
export class ChooseService {
  public editProjectIndex = 0;
  public editStageIndex = 0;
  public editMode: boolean;
  public sideInfo = {};
  public projectDataArray = [
    {name: '專案一', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', createDate: new Date(), lastModify: new Date,
     stage: [
      {order: 0, name: '關卡一', description: 'At nesciunt blanditiis reprehenderit quia repudiandae,',
       createDate: new Date(), lastModify: new Date, stageData: {
         diveId: 3402, diveData: [
          {dataValue: '1504853805902', viewValue: '要旋轉角度'},
          {dataValue: '1511104362549', viewValue: '移動部署'},
          {dataValue: '1511104719544', viewValue: '部署移動'}
         ], blocklyData: [
          // tslint:disable-next-line:max-line-length
          {name: '121', blockDef: `Blockly.Blocks['chicken'] = {  init: function() {this.appendDummyInput().appendField("兔子走").appendField(new Blockly.FieldNumber(0, 0, 30), "bunnyStep").appendField("步");this.setPreviousStatement(true, null);this.setNextStatement(true, null);this.setColour(230);this.setTooltip("");this.setHelpUrl("");}};`, blockGen: `Blockly.JavaScript['chicken'] = function(block) { var text_1234 = block.getFieldValue('bunnyStep');var value_123 = Blockly.JavaScript.valueToCode(block, 'bunnyStep', Blockly.JavaScript.ORDER_ATOMIC);// TODO: Assemble JavaScript into code variable.var code = '...;\n';return code;};`, isDisabled: false},
          {name: '122', blockDef: `Blockly.Blocks['gary'] = {  init: function() {this.appendDummyInput().appendField("老鼠走").appendField(new Blockly.FieldNumber(0, 0, 30), "monkeyStep").appendField("步");this.setPreviousStatement(true, null);this.setNextStatement(true, null);this.setColour(230);this.setTooltip("");this.setHelpUrl("");}};`, blockGen: `Blockly.JavaScript['gary'] = function(block) { var text_5678 = block.getFieldValue('monkeyStep');var value_123 = Blockly.JavaScript.valueToCode(block, 'monkeyStep', Blockly.JavaScript.ORDER_ATOMIC);// TODO: Assemble JavaScript into code variable.var code = '...;\n';return code;};`, isDisabled: false},
          // tslint:disable-next-line:max-line-length
          {name: '122', blockDef: `Blockly.Blocks['monkey_turn'] = {  init: function() {this.appendDummyInput().appendField("老鼠轉").appendField(new Blockly.FieldAngle(0), "monkeyTurn").appendField("度");this.setPreviousStatement(true, null);this.setNextStatement(true, null);this.setColour(230);this.setTooltip("");this.setHelpUrl("");}};`, blockGen: `Blockly.JavaScript['monkey_turn'] = function(block) { var text_3456 = block.getFieldValue('monkeyTurn');var value_123 = Blockly.JavaScript.valueToCode(block, 'monkeyTurn', Blockly.JavaScript.ORDER_ATOMIC);// TODO: Assemble JavaScript into code variable.var code = '...;\n';return code;};`, isDisabled: false}
         ], bindingData: [
          {diveIndex: '0', blocklyIndex: 0},
          {diveIndex: '1', blocklyIndex: 1},
          {diveIndex: '2', blocklyIndex: 2}
         ],
         conditionData: [
          {
            condition: [
              {diveAttribute: '1504854853547', operator: '!=', value: 'dfg'},
              {diveAttribute: '1511104362549', operator: '>=', value: '10'},
              {diveAttribute: '1511104719544', operator: '==', value: '15'}
            ],
            content: 'asd',
            name: 'df'
          },
          {
            condition: [
              {diveAttribute: '1504853805902', operator: '<=', value: 'dfffg'},
              {diveAttribute: '1504853805902', operator: '=', value: 'dfff'},
            ],
            content: 'aaaasd',
            name: 'dsssf'
          }
         ], passCondition: [
          {
            condition: {diveAttribute: '1504853805902', operator: '=', value: 'sf'},
            logical: ''
          },
          {
            condition: {diveAttribute: '1511104362549', operator: '!=', value: '15'},
            logical: 'and'
          },
          {
            condition: {diveAttribute: '1511104719544', operator: '<=', value: '10'},
            logical: 'or'
          }
         ]}
       },
       {order: 0, name: '關卡二', description: 'At nesciunt blanditiis reprehenderit quia repudiandae,',
       createDate: new Date(), lastModify: new Date, stageData: {
         diveId: 3402, diveData: [
          {dataValue: '1504853805902', viewValue: '要旋轉角度'},
          {dataValue: '1511104362549', viewValue: '移動部署'},
          {dataValue: '1511104719544', viewValue: '部署移動'}
         ], blocklyData: [
          // tslint:disable-next-line:max-line-length
          {name: '121', blockDef: `Blockly.Blocks['chicken'] = {  init: function() {this.appendDummyInput().appendField("兔子走").appendField(new Blockly.FieldNumber(0, 0, 30), "bunnyStep").appendField("步");this.setPreviousStatement(true, null);this.setNextStatement(true, null);this.setColour(230);this.setTooltip("");this.setHelpUrl("");}};`, blockGen: `Blockly.JavaScript['chicken'] = function(block) { var text_1234 = block.getFieldValue('bunnyStep');var value_123 = Blockly.JavaScript.valueToCode(block, 'bunnyStep', Blockly.JavaScript.ORDER_ATOMIC);// TODO: Assemble JavaScript into code variable.var code = '...;\n';return code;};`, isDisabled: false},
          {name: '122', blockDef: `Blockly.Blocks['gary'] = {  init: function() {this.appendDummyInput().appendField("鼠鼠走").appendField(new Blockly.FieldNumber(0, 0, 30), "monkeyStep").appendField("步");this.setPreviousStatement(true, null);this.setNextStatement(true, null);this.setColour(230);this.setTooltip("");this.setHelpUrl("");}};`, blockGen: `Blockly.JavaScript['gary'] = function(block) { var text_5678 = block.getFieldValue('monkeyStep');var value_123 = Blockly.JavaScript.valueToCode(block, 'monkeyStep', Blockly.JavaScript.ORDER_ATOMIC);// TODO: Assemble JavaScript into code variable.var code = '...;\n';return code;};`, isDisabled: false},
          // tslint:disable-next-line:max-line-length
          {name: '122', blockDef: `Blockly.Blocks['monkey_turn'] = {  init: function() {this.appendDummyInput().appendField("鼠鼠轉").appendField(new Blockly.FieldAngle(0), "monkeyTurn").appendField("度");this.setPreviousStatement(true, null);this.setNextStatement(true, null);this.setColour(230);this.setTooltip("");this.setHelpUrl("");}};`, blockGen: `Blockly.JavaScript['monkey_turn'] = function(block) { var text_3456 = block.getFieldValue('monkeyTurn');var value_123 = Blockly.JavaScript.valueToCode(block, 'monkeyTurn', Blockly.JavaScript.ORDER_ATOMIC);// TODO: Assemble JavaScript into code variable.var code = '...;\n';return code;};`, isDisabled: false}
         ], bindingData: [
          {diveIndex: '0', blocklyIndex: 0},
          {diveIndex: '1', blocklyIndex: 1},
          {diveIndex: '2', blocklyIndex: 2}
         ],
         conditionData: [
          {
            condition: [
              {diveAttribute: '1504854853547', operator: '!=', value: 'dfg'},
              {diveAttribute: '1511104362549', operator: '>=', value: '10'},
              {diveAttribute: '1511104719544', operator: '==', value: '15'}
            ],
            content: 'asd',
            name: 'df'
          },
          {
            condition: [
              {diveAttribute: '1504853805902', operator: '<=', value: 'dfffg'},
              {diveAttribute: '1504853805902', operator: '=', value: 'dfff'},
            ],
            content: 'aaaasd',
            name: 'dsssf'
          }
         ], passCondition: [
          {
            condition: {diveAttribute: '1504853805902', operator: '=', value: 'sf'},
            logical: ''
          },
          {
            condition: {diveAttribute: '1511104362549', operator: '!=', value: '15'},
            logical: 'and'
          },
          {
            condition: {diveAttribute: '1511104719544', operator: '<=', value: '10'},
            logical: 'or'
          }
         ]}
       },
      {order: 2, name: '關卡三', description: 'Culpa mollitia dolorum sequi deserunt illum sequi saepe.',
       createDate: new Date(), lastModify: new Date, stageData: []},
     ]
  },
  ];
  constructor() { }
  getProjectDataArray() {
    return this.projectDataArray.slice();
  }
  getStageDataArray() {
    return this.projectDataArray.slice()[this.editProjectIndex].stage[this.editStageIndex].stageData;
  }

  getEditStageIndex() {
    return this.editStageIndex;
  }
  getEditProjectIndex() {
    return this.editProjectIndex;
  }
}
