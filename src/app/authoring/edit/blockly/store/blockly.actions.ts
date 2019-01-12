import { Action } from '@ngrx/store';
import { ToolBoxState, BlockBuildState, BlocklyDataState } from '../../../../model/authoring/blockly.model';

export const SET_BLOCKLY_MODE_STATE = 'SET_BLOCKLY_MODE_STATE';
export const SET_BLOCK_NAME = 'SET_BLOCK_NAME';
export const SET_BLOCK_ID = 'SET_BLOCK_ID';
export const SET_TOOLBOX_BLOCK_STATE = 'SET_TOOLBOX_BLOCK_STATE';
export const SET_BLOCK_TYPE = 'SET_BLOCK_TYPE';
export const SET_BLOCK_TYPE_CONTENT = 'SET_BLOCK_TYPE_CONTENT';
export const SET_CONNECTION_TYPE = 'SET_CONNECTION_TYPE';
export const SET_PORTAL_TYPE = 'SET_PORTAL_TYPE';
export const SET_EMBEDDING_NUMBER = 'SET_EMBEDDING_NUMBER';
export const SET_EXTERNAL_TYPE = 'SET_EXTERNAL_TYPE';
export const SET_BLOCK_RESULT = 'SET_BLOCK_RESULT';
export const SET_BLOCK_TEMP_TEXT = 'SET_BLOCK_TEMP_TEXT';
export const SET_BLOCK_CODE_GENERATOR = 'SET_BLOCK_CODE_GENERATOR';
export const SET_OPTION_DIVE_STATE_NAME = 'SET_OPTION_DIVE_STATE_NAME';
export const SET_OPTION_DIVE_STATE_ACTION = 'SET_OPTION_DIVE_STATE_ACTION';
export const SET_OPTION_ASYNC_STATE = 'SET_OPTION_ASYNC_STATE';
export const SET_OPTION_PAYLOAD = 'SET_OPTION_PAYLOAD';
export const SET_BLOCK_STATE_IS_OLD = 'SET_BLOCK_STATE_IS_OLD';

export const TRY_SET_PORTAL_TYPE = 'TRY_SET_PORTAL_TYPE';
export const TRY_SET_CONNECTION_TYPE = 'TRY_SET_CONNECTION_TYPE';
export const TRY_SET_EMBEDDING_NUMBER = 'TRY_SET_EMBEDDING_NUMBER';
export const TRY_SET_EXTERNAL_TYPE = 'TRY_SET_EXTERNAL_TYPE';
export const TRY_EDIT_BLOCK_RESULT_TEXT = 'TRY_EDIT_BLOCK_RESULT_TEXT';
export const TRY_SUBMIT_BLOCK_DATA = 'TRY_SUBMIT_BLOCK_DATA';
export const TRY_EDIT_CUSTOM_BLOCK = 'TRY_EDIT_CUSTOM_BLOCK';

export const INITAIL_BLOCK_TEMP_TEXT = 'INITAIL_BLOCK_TEMP_TEXT';
export const INITAIL_OPTION_VALUE = 'INITAIL_OPTION_VALUE';
export const INITAIL_BUILD_BLOCK_STATE = 'INITAIL_BUILD_BLOCK_STATE';
export const INITAIL_BLOCKLY_STATE = 'INITAIL_BLOCKLY_STATE';

export const EDIT_BLOCK_RESULT_TEXT = 'EDIT_BLOCK_RESULT_TEXT';
export const EDIT_CUSTOM_BLOCK = 'EDIT_CUSTOM_BLOCK';

export class SetBlocklyModeState implements Action {
  readonly type = SET_BLOCKLY_MODE_STATE;
  constructor(public payload: string) {}
}
export class SetBlockName implements Action {
  readonly type = SET_BLOCK_NAME;
  constructor(public payload: string) {}
}
export class SetBlockId implements Action {
  readonly type = SET_BLOCK_ID;
}

export class SetToolboxBlockState implements Action {
  readonly type = SET_TOOLBOX_BLOCK_STATE;
  constructor(public payload: {toolBoxState: ToolBoxState[], customBlocksState: BlockBuildState[]}) {}
}

export class SetBlockType implements Action {
  readonly type = SET_BLOCK_TYPE;
  constructor(public payload: string) {}
}

export class SetBlockTypeConent implements Action {
  readonly type = SET_BLOCK_TYPE_CONTENT;
  constructor(public payload: string) {}
}

export class TrySetPortalType implements Action {
  readonly type = TRY_SET_PORTAL_TYPE;
  constructor(public payload: string) {}
}

export class SetPortalType implements Action {
  readonly type = SET_PORTAL_TYPE;
  constructor(public payload: string) {}
}

export class TrySetConnectionType implements Action {
  readonly type = TRY_SET_CONNECTION_TYPE;
  constructor(public payload: string) {}
}

export class SetConnectionType implements Action {
  readonly type = SET_CONNECTION_TYPE;
  constructor(public payload: string) {}
}

export class TrySetEmbeddingNumber implements Action {
  readonly type = TRY_SET_EMBEDDING_NUMBER;
  constructor(public payload: string) {}
}

export class SetEmbeddingNumber implements Action {
  readonly type = SET_EMBEDDING_NUMBER;
  constructor(public payload: string) {}
}

export class TrySetExternalType implements Action {
  readonly type = TRY_SET_EXTERNAL_TYPE;
  constructor(public payload: string) {}
}

export class SetExternalType implements Action {
  readonly type = SET_EXTERNAL_TYPE;
  constructor(public payload: string) {}
}

export class SetBlockTempText implements Action {
  readonly type = SET_BLOCK_TEMP_TEXT;
  constructor(public payload: {order: number, text: string}) {}
}

export class InitailBlockTempText implements Action {
  readonly type = INITAIL_BLOCK_TEMP_TEXT;
}

export class SetBlockResult implements Action {
  readonly type = SET_BLOCK_RESULT;
}

export class TryEditBlockResultText implements Action {
  readonly type = TRY_EDIT_BLOCK_RESULT_TEXT;
  constructor(public payload: {order: number, text: string}) {}
}

export class EditBlockResultText implements Action {
  readonly type = EDIT_BLOCK_RESULT_TEXT;
  constructor(public payload: {order: number, text: string}) {}
}

export class SetBlockCodeGenerator implements Action {
  readonly type = SET_BLOCK_CODE_GENERATOR;
  constructor(public payload: string) {}
}

export class SetOptionDiveStateName implements Action {
  readonly type = SET_OPTION_DIVE_STATE_NAME;
  constructor(public payload: string) {}
}

export class SetOptionDiveStateAction implements Action {
  readonly type = SET_OPTION_DIVE_STATE_ACTION;
  constructor(public payload: string) {}
}

export class SetOptionAsyncState implements Action {
  readonly type = SET_OPTION_ASYNC_STATE;
  constructor(public payload: string) {}
}

export class SetOptionPayload implements Action {
  readonly type = SET_OPTION_PAYLOAD;
  constructor(public payload: string) {}
}

export class InitailOptionValue implements Action {
  readonly type = INITAIL_OPTION_VALUE;
}

export class TrySubmitBlockData implements Action {
  readonly type = TRY_SUBMIT_BLOCK_DATA;
  constructor(public payload: {isNew: boolean, content: string, blockData: BlockBuildState}) {}
}

export class InitailBuildBlockState implements Action {
  readonly type = INITAIL_BUILD_BLOCK_STATE;
}

export class SetBlockStateIsOld implements Action {
  readonly type = SET_BLOCK_STATE_IS_OLD;
  constructor(public payload: boolean) {}
}

export class TryEditCustomBlock implements Action {
  readonly type = TRY_EDIT_CUSTOM_BLOCK;
  constructor(public payload: {id: string, customBlocksState: BlockBuildState[]}) {}
}

export class EditCustomBlock implements Action {
  readonly type = EDIT_CUSTOM_BLOCK;
  constructor(public payload: {id: string, customBlocksState: BlockBuildState[]}) {}
}

export class InitailBlocklyState implements Action {
  readonly type = INITAIL_BLOCKLY_STATE;
}

export type BlocklyActions = SetBlocklyModeState |
                             SetBlockName |
                             SetToolboxBlockState |
                             SetBlockType |
                             SetBlockTypeConent |
                             SetConnectionType |
                             SetPortalType |
                             SetEmbeddingNumber |
                             SetExternalType |
                             SetOptionDiveStateName |
                             SetOptionDiveStateAction |
                             SetOptionAsyncState |
                             SetOptionPayload |
                             SetBlockId |
                             TryEditCustomBlock |
                             TrySetConnectionType |
                             TrySetPortalType |
                             TrySetEmbeddingNumber |
                             TrySetExternalType |
                             InitailBlockTempText |
                             SetBlockTempText |
                             TryEditBlockResultText |
                             EditBlockResultText |
                             SetBlockCodeGenerator |
                             InitailOptionValue |
                             TrySubmitBlockData |
                             InitailBuildBlockState |
                             SetBlockStateIsOld |
                             EditCustomBlock |
                             InitailBlocklyState
                             ;

