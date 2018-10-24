import { DiveDataState, BlocklyDataState, ConditionDataState, BindingDataState, PassConditionState } from './management.model';
export interface EditState {
  diveId: number;
  diveData: DiveDataState;
  blocklyData: BlocklyDataState[];
  bindingData: BindingDataState[];
  conditionData: ConditionDataState[];
  passConditionData: PassConditionState[];
  hierarchyData: {};
  operators: string[];
}
