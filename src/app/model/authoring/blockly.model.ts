export interface BlocklyDataState {
  toolBoxState: ToolBoxState[];
  customBlocksState: BlockBuildState[];
}
export interface BlocklyState {
  blocklyModeState: string;
  workspaceState: string;
  blockBuildState: BlockBuildState;
}

export interface BlockBuildState {
  blockName: string;
  blockId: string;
  blockDef: BlockDefinition;
  blockGen: BlockGeneration;
  isNew: boolean;
  isEnable: boolean;
}

export interface BlockDefinition {
  content: string;
  connectionType: string;
  portalType: string;
  embeddingNumber: string;
  externalType: string;
  blockTempText: string[];
}

export interface BlockGeneration {
  content: string;
  blockType: string;
  blockTypeContent: string;
  diveStateName: string;
  diveStateAction: string;
  isAsync: boolean;
  payload: string;
}


export interface CategoryState {
  selected: string;
  name: string;
  data: string;
}

export interface ToolBoxState {
  category: string;
  data: string;
}



