import { HierarchyState } from './authoring.model';
import { DiveDataState, ConditionDataState, PassConditionState } from './management.model';
import { BlocklyDataState } from './blockly.model';
export interface EditState {
  diveReadTime: number;
  diveId: number;
  diveData: DiveDataState;
  conditionData: ConditionDataState[];
  blocklyData: BlocklyDataState;
  passConditionData: PassConditionState[];
  hierarchyData: HierarchyState[];
  operators: string[];
}
