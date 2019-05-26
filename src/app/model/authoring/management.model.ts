import { HierarchyState } from './authoring.model';
import { BlocklyDataState } from './blockly.model';

export interface PassConditionState {
  condition: ConditionState;
  logical: string;
}

export interface ValueState {
  dataValue: string;
  viewValue: string;
}

export interface DiveDataState {
  inValue: ValueState[];
  outValue: ValueState[];
}

export interface ConditionState {
  diveAttribute: string;
  operator: string;
  value: string;
}

export interface ConditionsState {
  condition: ConditionState[];
  logical: string;
}

export interface ConditionDataState {
  conditions: ConditionsState[];
  content: string;
  name: string;
}

export interface StageDataState {
  blocklyData: BlocklyDataState;
  conditionData: ConditionDataState[];
  diveData: DiveDataState;
  diveId: string;
  passcondition: PassConditionState[];
  hierarchyData: HierarchyState[];
}

export interface StagesState {
  uid: string;
  createDate: Date;
  description: string;
  lastModify: Date;
  name: string;
  order: number;
  coverImg: string;
  stageData: StageDataState;
}
export interface StagesSideInfoState {
  uid: string;
  createDate: Date;
  description: string;
  lastModify: Date;
  name: string;
  coverImg: string;
  order: number;
}

export interface ProjectState {
  author: string;
  createDate: Date;
  description: string;
  lastModify: Date;
  name: string;
  uid: string;
  coverImg: string;
  stages: StagesState[];
}
export interface ProjectSideInfoState {
  author: string;
  createDate: Date;
  description: string;
  lastModify: Date;
  name: string;
  coverImg: string;
  uid: string;
}

export interface ManagementState {
  projectDataState: ProjectState[];
  editProjectIndex: number;
  editStageIndex: number;
}

