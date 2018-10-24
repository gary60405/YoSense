import { ManipulationState } from './../../model/manipulation/manipulation.model';
export const initailState: ManipulationState = {
  editProjectIndex: -1,
  editStageIndex: -1,
  editMode: 'PROJECT_MODE',
  projectSideInfo: {
    author: '',
    createDate: '',
    description: '',
    lastModify: '',
    name: '',
    uid: '',
    stages: []
  },
  stageSideInfo:  {
    createDate: '',
    description: '',
    lastModify: '',
    name: '',
    order: '',
    stageData: {
      bindingData: [],
      blocklyData: [],
      conditionData: [],
      diveData: [],
      diveId: '',
      passcondition: [],
      hierarchyData: {}
    }
  },
  projectData: [],
  stageData: []
};

export function manipulationRuducer(state = initailState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
