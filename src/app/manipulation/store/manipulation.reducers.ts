import { ManipulationState } from './../../model/manipulation/manipulation.model';
export const initailState: ManipulationState = {
  editProjectIndex: -1,
  editStageIndex: -1,
  editMode: 'PROJECT_MODE',
  projectSideInfo: {
    author: '',
    createDate: new Date(0),
    description: '',
    lastModify: new Date(0),
    name: '',
    uid: '',
    stages: []
  },
  stageSideInfo:  {
    createDate: new Date(0),
    description: '',
    lastModify: new Date(0),
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
