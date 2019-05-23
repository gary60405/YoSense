import { createSelector } from '@ngrx/store';
import { AppState } from '../../../../model/app/app.model';
import { BlockBuildState, ToolBoxState } from '../../../../model/authoring/blockly.model';
import { HierarchyState } from '../../../../model/authoring/authoring.model';

export const blocklyModeStateSelector = createSelector(
  (state: AppState) => state.blockly.blocklyModeState,
  (blocklyModeState: string) => blocklyModeState
);

export const appendBlockToWorkspaceSelector = createSelector(
  (state: AppState) => state.blockly.blockBuildState.blockDef.content,
  (state: AppState) => state.blockly.blockBuildState.blockId,
  (content: string, blockId: string) => {
    return {content: content, blockId: blockId !== '' ? blockId : 'block_type'};
  }
);

export const portalTypeSelector = createSelector(
  (state: AppState) => state.blockly.blockBuildState.blockDef.portalType,
  (portalType: string) => portalType
);

export const blockDefStateSelector = createSelector(
  (state: AppState) => state.blockly.blockBuildState.blockDef.content,
  (blockDef: string) => blockDef
);

export const connectionTypeSelector = createSelector(
  (state: AppState) => state.blockly.blockBuildState.blockDef.connectionType,
  (connectionType: string) => connectionType
);

export const externalTypeSelector = createSelector(
  (state: AppState) => state.blockly.blockBuildState.blockDef.externalType,
  (externalType: string) => externalType
);

export const embeddingNumberSelector = createSelector(
  (state: AppState) => state.blockly.blockBuildState.blockDef.embeddingNumber,
  (embeddingNumber: string) => embeddingNumber
);

export const blockTempTextSelector = createSelector(
  (state: AppState) => state.blockly.blockBuildState.blockDef.blockTempText,
  (blockTempText: string[]) => blockTempText
);

export const blockTypeSelector = createSelector(
  (state: AppState) => state.blockly.blockBuildState.blockGen.blockType,
  (blockType: string) => blockType
);

export const blockTypeContentSelector = createSelector(
  (state: AppState) => state.blockly.blockBuildState.blockGen.blockTypeContent,
  (blockTypeContent: string) => blockTypeContent
);

export const diveStateNamesSelector = createSelector(
  (state: AppState) => state.authoringStage.editState.hierarchyData.map(block => block.name),
  (blockTypeNames: string[]) => {
    return blockTypeNames;
  }
);

export const diveStateNameSelector = createSelector(
  (state: AppState) => state.blockly.blockBuildState.blockGen.diveStateName,
  (diveStateName: string) => diveStateName
);

export const diveStateActionSelector = createSelector(
  (state: AppState) => state.blockly.blockBuildState.blockGen.diveStateAction,
  (diveStateAction: string) => diveStateAction
);

export const isAsyncSelector = createSelector(
  (state: AppState) => state.blockly.blockBuildState.blockGen.isAsync,
  (isAsync: boolean) => isAsync
);

export const payloadSelector = createSelector(
  (state: AppState) => state.blockly.blockBuildState.blockGen.payload,
  (payload: string) => payload
);

export const submitBlockDataSelector = createSelector(
  (state: AppState) => state.blockly.blockBuildState,
  (blockBuildState: BlockBuildState) => {
    return blockBuildState;
  });

  export const isNewSelector = createSelector(
    (state: AppState) => state.blockly.blockBuildState.isNew,
    (isNew: boolean) => isNew
  );

  export const blockNameSelector = createSelector(
    (state: AppState) => state.blockly.blockBuildState.blockName,
    (blockName: string) => blockName
  );

  export const customBlockNameSelector = createSelector(
    (state: AppState) => state.authoringStage.editState.blocklyData.customBlocksState,
    (customBlocks: BlockBuildState[]) => {
      return customBlocks.map(customBlock => {
        return {id: customBlock.blockId, name: customBlock.blockName, isEnable: customBlock.isEnable};
      });
    }
  );

  export const diveStateSelector = createSelector(
    (state: AppState) => {
      const diveState = {};
      state.authoringStage.editState.hierarchyData.forEach(hierarchyData => {
        diveState[hierarchyData.name] = {};
        hierarchyData.states.forEach(data => {
          diveState[hierarchyData.name][data.stateName] = {
            diveID: data.diveData.diveNumber,
            value: data.diveData.diveValue
          };
        });
      });
      return diveState;
    },
    (hierarchyData: HierarchyState[]) => hierarchyData
  );

  export const customBlockSelector = createSelector(
    (state: AppState) => state.authoringStage.editState.blocklyData.customBlocksState,
    (customBlocks: BlockBuildState[]) => customBlocks
  );

  export const ToolBoxStateSelector = createSelector(
    (state: AppState) => state.authoringStage.editState.blocklyData.toolBoxState,
    (toolBoxState: ToolBoxState[]) => toolBoxState
  );

  export const buildPreviewWorkspaceSelector = createSelector(
      (state: AppState) => state.blockly.workspaceState,
      (state: AppState) => state.authoringStage.editState.blocklyData.customBlocksState,
      (workspaceState: string, customBlocksState: BlockBuildState[]) => {
        return {workspaceState: workspaceState, customBlocksState: customBlocksState};
      }
    );

  export const codeFontSizeSelector = createSelector(
    (state: AppState) => state.authoringStage.editState.blocklyData.codeFontSize,
    (codeFontSize: number) => codeFontSize
  );

  export const blockCodeStateSelector = createSelector(
    (state: AppState) => state.authoringStage.editState.blocklyData.blockCodeState,
    (blockCodeState: string) => blockCodeState
  );

  export const blockDefSelector = createSelector(
    (state: AppState) => state.blockly.blockBuildState.blockDef.connectionType,
    (state: AppState) => state.blockly.blockBuildState.blockDef.portalType,
    (state: AppState) => state.blockly.blockBuildState.blockDef.externalType,
    (state: AppState) => state.blockly.blockBuildState.blockDef.embeddingNumber,
    (connectionType: string, portalType: string, externalType: string, embeddingNumber: string) => {
      return {
        connectionType: connectionType,
        portalType: portalType,
        externalType: externalType,
        embeddingNumber: embeddingNumber
      };
    }
  );


