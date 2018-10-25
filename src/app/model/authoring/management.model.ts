export interface PassConditionState {
  condition: ConditionState;
  logical: string;
}

export interface ValueState {
  id: number;
  name: string;
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
export interface BlocklyDataState {
  blockDef: string;
  blockGen: string;
  isDisabled: Boolean;
  name: string;
}
export interface BindingDataState {
  blocklyIndex: number;
  diveIndex: number;
}
export interface StageDataState {
  bindingData: BindingDataState[];
  blocklyData: BlocklyDataState[];
  conditionData: ConditionDataState[];
  diveData: DiveDataState[];
  diveId: string;
  passcondition: PassConditionState[];
  hierarchyData: {};
}
export interface StagesState {
  createDate: Date;
  description: string;
  lastModify: Date;
  name: string;
  order: string;
  stageData: StageDataState;
}

export interface ProjectState {
  author: string;
  createDate: Date;
  description: string;
  lastModify: Date;
  name: string;
  uid: string;
  stages: StagesState[];
}

export interface ManagementState {
  projectDataState: ProjectState[];
  deleteIndex: number;
  editProjectIndex: number;
  editStageIndex: number;
}
