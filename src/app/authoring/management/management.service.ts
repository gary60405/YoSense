import { Injectable } from '@angular/core';

@Injectable()
export class ManagementService {

  constructor() { }
  public editMode = false;
  public editProjectIndex = -1;
  public editStageIndex = 0;
  public sideInfo = {};
  public projectDataArray = [
    {name: '專案一', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', createDate: new Date(), lastModify: new Date,
     stage: [
      {order: 0, name: '關卡一', description: 'At nesciunt blanditiis reprehenderit quia repudiandae,',
       createDate: new Date(), lastModify: new Date, stageData: {
         diveId: 3124, diveData: [
          {dataValue: '1504853805902', viewValue: '要旋轉角度'},
          {dataValue: '1504853547811', viewValue: '移動部署'}
         ], blocklyData: [
          {name: '121', blockDef: '123', blockGen: '123', isDisabled: false},
          {name: '122', blockDef: '123', blockGen: '123', isDisabled: false},
         ], bindingData: [
          {diveIndex: '0', blocklyIndex: 0},
          {diveIndex: '1', blocklyIndex: 1},
         ],
         conditionData: [
          {
            condition: [
              {diveAttribute: '1504854853547', operator: '!=', value: 'dfg'},
              {diveAttribute: '1504853805902', operator: '>=', value: 'df'},
              {diveAttribute: '1504854853547', operator: '<=', value: 'afsd'}
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
            condition: {diveAttribute: '1504854853547', operator: '!=', value: 'sfa'},
            logical: 'and'
          },
          {
            condition: {diveAttribute: '1504854853547', operator: '<=', value: 'e43'},
            logical: 'or'
          }
         ]}
       },
      {order: 1, name: '關卡二', description: 'Obcaecati sit amet consectetur adipisicing sequi dolore',
       createDate: new Date(), lastModify: new Date, stageData: []},
      {order: 2, name: '關卡三', description: 'Culpa mollitia dolorum sequi deserunt illum sequi saepe.',
       createDate: new Date(), lastModify: new Date, stageData: []},
     ]
  },
    {name: '專案二', description: 'At nesciunt blanditiis reprehenderit quia repudiandae,', createDate: new Date(), lastModify: new Date,
      stage: []},
    {name: '專案三', description: 'Obcaecati sit amet consectetur adipisicing sequi dolore', createDate: new Date(), lastModify: new Date,
      stage: []},
    {name: '專案四', description: 'Culpa mollitia dolorum sequi deserunt illum sequi saepe.', createDate: new Date(), lastModify: new Date,
      stage: []},
    {name: '專案五', description: 'Reprehenderit quia repudiandae consectetur adipisicing.', createDate: new Date(), lastModify: new Date,
      stage: []},
    {name: '專案六', description: 'temporibus odio vitae fugiat deleniti elit dolorum maxime.', createDate: new Date(), lastModify: new Date,
      stage: []},
  ];

  getProjectData() {
    return this.projectDataArray.slice();
  }
}
