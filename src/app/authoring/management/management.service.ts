import { Injectable } from '@angular/core';

@Injectable()
export class ManagementService {

  constructor() { }
  public editMode = false;
  public editProjectIndex = -1;
  public editStageIndex = 0;
  public sideInfo = {};
  public projectDataArray = [
    {name: '專案一', uid: '123a' , description: 'Lorem ipsum dolor sit amet consectetur', createDate: new Date(), lastModify: new Date,
     stage: [
      {order: 0, name: '關卡一', description: 'At nesciunt blanditiis reprehenderit quia repudiandae,',
       createDate: new Date(), lastModify: new Date, stageData: {
         diveId: 3154, diveData: [
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
            conditions: [
              {
                  condition: {diveAttribute: '1504853805902', operator: '!=', value: '12'},
                  logical: ''
              },
              {
                  condition: {diveAttribute: '1504853805902', operator: '>=', value: '10'},
                  logical: '&&'
              },
              {
                  condition: {diveAttribute: '1504853805902', operator: '<=', value: '5'},
                  logical: '||'
              }
            ],
            content: 'asd',
            name: 'df'
          },
          {
            conditions: [
              {
                  condition: {diveAttribute: '1504853805902', operator: '<=', value: '3'},
                  logical: ''
              },
              {
                  condition: {diveAttribute: '1504853805902', operator: '>=', value: '6'},
                  logical: '&&'
              },
              {
                  condition: {diveAttribute: '1504853805902', operator: '<=', value: '3'},
                  logical: '||'
              }
            ],
            content: 'aaaasd',
            name: 'dsssf'
          }
         ], passCondition: [
          {
            condition: {diveAttribute: '1504853805902', operator: '=', value: '10'},
            logical: ''
          },
          {
            condition: {diveAttribute: '1511104719544', operator: '!=', value: '15'},
            logical: '&&'
          },
          {
            condition: {diveAttribute: '1511104719544', operator: '<=', value: '5'},
            logical: '||'
          }
         ]}
       },
      {order: 1, name: '關卡二', description: 'Obcaecati sit amet consectetur adipisicing sequi dolore',
       createDate: new Date(), lastModify: new Date, stageData: []},
      {order: 2, name: '關卡三', description: 'Culpa mollitia dolorum sequi deserunt illum sequi saepe.',
       createDate: new Date(), lastModify: new Date, stageData: []},
     ]
  },
    {name: '專案二', uid: '223b' , description: 'At nesciunt blanditiis reprehenderit quia,', createDate: new Date(), lastModify: new Date,
      stage: []},
    {name: '專案三', uid: '323c' , description: 'Obcaecati sit amet consectetur adipisicing', createDate: new Date(), lastModify: new Date,
      stage: []},
    {name: '專案四', uid: '423d' , description: 'Culpa mollitia dolorum sequi deserunt illum.', createDate: new Date(), lastModify: new Date,
      stage: []},
    {name: '專案五', uid: '512e' , description: 'Reprehenderit quia repudiandae consectetur', createDate: new Date(), lastModify: new Date,
      stage: []},
    {name: '專案六', uid: '623f' , description: 'temporibus odio vitae fugiat deleniti elit.', createDate: new Date(), lastModify: new Date,
      stage: []},
  ];

  getProjectData() {
    return this.projectDataArray.slice();
  }
}
