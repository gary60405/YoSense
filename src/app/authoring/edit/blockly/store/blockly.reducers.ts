import * as BlocklyActions from './blockly.actions';
import { blockModel } from '../js/buildBlock';
import { BlocklyState } from '../../../../model/authoring/blockly.model';

const initialState: BlocklyState = {
  blocklyModeState: 'SET_CUSTOM_BLOCK',
  workspaceState: `Blockly.inject('toolBoxPreviewer',{toolbox:'',trashcan:true,grid:{spacing:30,length:3,colour:'#39261f',snap:true},zoom:{controls:true,wheel:true,startScale:1.0,maxScale:1.2,minScale:0.8,scaleSpeed:1.2},})`,
  blockBuildState: {
    blockName: '',
    blockId: '',
    isNew: true,
    isEnable: true,
    blockDef: {
      content: `Blockly.Blocks['block_type'] = { init: function() {this.setOutput(true,null);this.appendDummyInput().appendField("text1");this.setColour(230); this.setTooltip(""); this.setHelpUrl("");} };`,
      connectionType: 'LEFT_OUTPUT',
      portalType: 'NONE',
      embeddingNumber:  '',
      externalType: '',
      blockTempText: ['text1', 'text2', 'text3']
    },
    blockGen: {
      content: '',
      blockType: 'NONE',
      blockTypeContent: '',
      diveStateName: '',
      diveStateAction: '',
      isAsync: false,
      payload: '',
    },
  }
};

export function BlocklyRuducer(state = initialState, action) {
  switch (action.type) {
    case BlocklyActions.SET_BLOCKLY_MODE_STATE:
      return {
        ...state,
        blocklyModeState: action.payload
      };
    case BlocklyActions.SET_TOOLBOX_BLOCK_STATE:
      let xmlText = '';
      const blocks = {};
      const categoryOder = new Map()
        .set('general', 1)
        .set('logic', 2)
        .set('controls', 3)
        .set('math', 4)
        .set('text', 5)
        .set('lists', 6)
        .set('colour', 7)
        .set('function', 8)
        .set('variable', 9);
      blocks[action.payload.customBlocksState.some(block => block.isEnable) ? 'general' : ''] = action.payload.customBlocksState
        .filter(block => block.isEnable === true)
        .map(block => `<block type="${block.blockId}"></block>`);
      action.payload.toolBoxState
            .sort((a, b) => categoryOder.get(a.category) > categoryOder.get(b.category) ? 1 : -1)
            .forEach(block => blocks.hasOwnProperty(block.category) ? blocks[block.category].push(block.data) : blocks[block.category] = [block.data]);
      Object.keys(blocks)
            .forEach((categoryName) => xmlText += mergeCategory(categoryName, blocks[categoryName].join('')));
      const customBlockDef = action.payload.customBlocksState.map(block => block.blockDef.content).join('');
      const toolBoxXml = `Blockly.inject('toolBoxPreviewer',{toolbox:'<xml>${xmlText}</xml>',trashcan:true,grid:{spacing:30,length:3,colour:'#39261f',snap:true},zoom:{controls:true,wheel:true,startScale:1.0,maxScale:2,minScale:0.8,scaleSpeed:1.2},})`;
      setTimeout(() => eval(customBlockDef + toolBoxXml), 0);
      return {
        ...state,
        workspaceState: toolBoxXml
      };
    case BlocklyActions.SET_BLOCK_NAME:
      return {
        ...state,
        blockBuildState: {
          ...state.blockBuildState,
          blockName: action.payload
        }
      };
    case BlocklyActions.SET_BLOCK_ID:
      const id = genUid();
      return {
        ...state,
        blockBuildState: {
          ...state.blockBuildState,
          blockId: id,
          blockDef: {
            ...state.blockBuildState.blockDef,
            content: state.blockBuildState.blockDef.content ? state.blockBuildState.blockDef.content.replace(`Blockly.Blocks['block_type']`, `Blockly.Blocks['${id}']`) : ''
          },
          blockGen: {
            ...state.blockBuildState.blockGen,
            content: state.blockBuildState.blockGen.content ? state.blockBuildState.blockGen.content.replace(`JavaScript['block_type']`, `JavaScript['${id}']`) : ''
          }
        }
      };
    case BlocklyActions.SET_CONNECTION_TYPE:
      return {
        ...state,
        blockBuildState: {
          ...state.blockBuildState,
          blockDef: {
            ...state.blockBuildState.blockDef,
            connectionType: action.payload
          }
        }
      };
    case BlocklyActions.SET_EXTERNAL_TYPE:
      return {
        ...state,
        blockBuildState: {
          ...state.blockBuildState,
          blockDef: {
            ...state.blockBuildState.blockDef,
            externalType: action.payload
          }
        }
      };
    case BlocklyActions.SET_EMBEDDING_NUMBER:
      return {
        ...state,
        blockBuildState: {
          ...state.blockBuildState,
          blockDef: {
            ...state.blockBuildState.blockDef,
            embeddingNumber: action.payload
          }
        }
      };
    case BlocklyActions.SET_PORTAL_TYPE:
      return {
        ...state,
        blockBuildState: {
          ...state.blockBuildState,
          blockDef: {
            ...state.blockBuildState.blockDef,
            portalType: action.payload
          }
        }
      };
    case BlocklyActions.SET_BLOCK_TEMP_TEXT:
      state.blockBuildState.blockDef.blockTempText[action.payload.order] = action.payload.text;
      return {
        ...state,
        blockBuildState: {
          ...state.blockBuildState,
          blockDef: {
            ...state.blockBuildState.blockDef,
            blockTempText: [
              ...state.blockBuildState.blockDef.blockTempText
            ]
          }
        }
      };
    case BlocklyActions.INITAIL_BLOCK_TEMP_TEXT:
      return {
        ...state,
        blockBuildState: {
          ...state.blockBuildState,
          blockDef: {
            ...state.blockBuildState.blockDef,
            blockTempText: [...initialState.blockBuildState.blockDef.blockTempText]
          },
        }
      };
    case BlocklyActions.EDIT_BLOCK_RESULT_TEXT:
      const currentText = state.blockBuildState.blockDef.blockTempText[action.payload.order];
      const result = action.payload.order === 0 ? state.blockBuildState.blockDef.content.replace(`"${currentText}"`, `"${action.payload.text}"`)
                      : action.payload.order === 1 ? state.blockBuildState.blockDef.content.replace(`\`${currentText}\``, `\`${action.payload.text}\``)
                      : action.payload.order === 2 ? state.blockBuildState.blockDef.content.replace(`'${currentText}'`, `'${action.payload.text}'`)
                      : '';
      executeText(result, state.blockBuildState.blockId !== '' ? state.blockBuildState.blockId : 'block_type');
      return {
        ...state,
        blockBuildState: {
          ...state.blockBuildState,
          blockDef: {
            ...state.blockBuildState.blockDef,
            content: result
          }
        }
      };
    case BlocklyActions.SET_BLOCK_RESULT:
      const blockText = state.blockBuildState.blockDef.blockTempText;
      const connectionTypeCode = state.blockBuildState.blockDef.connectionType === 'LEFT_OUTPUT' ? blockModel.connection.left_output
        : state.blockBuildState.blockDef.connectionType === 'UP_CONN' ? blockModel.connection.up_conn
        : state.blockBuildState.blockDef.connectionType === 'DOWN_CONN' ? blockModel.connection.down_conn
        : state.blockBuildState.blockDef.connectionType === 'UP_DOWN_CONN' ? blockModel.connection.up_down_conn
        : '';
      const embeddingNumberCode = state.blockBuildState.blockDef.externalType !== '' ? '' // blockText
        : state.blockBuildState.blockDef.portalType === 'NONE' || state.blockBuildState.blockDef.embeddingNumber === ''  ? blockModel.textfield.replace('"text1"', `"${blockText[0]}"`)
        : state.blockBuildState.blockDef.embeddingNumber === 'NUM_1' ? blockModel.valueEmbed.replace('"text1"', `"${blockText[0]}"`) + blockModel.textfield.replace('"text1"', `\`${blockText[1]}\``)
        : state.blockBuildState.blockDef.embeddingNumber === 'NUM_2' ? blockModel.valueEmbed.replace('"text1"', `"${blockText[0]}"`) + blockModel.valueEmbed.replace('"text1"', `\`${blockText[1]}\``).replace('"valueInput1"', '"valueInput2"') + blockModel.textfield.replace('"text1"', `'${blockText[2]}'`)
        : '';
      const externalTypeCode = state.blockBuildState.blockDef.portalType === 'NONE' ? ''
        : state.blockBuildState.blockDef.externalType === 'TYPE_SINGLE' ? blockModel.valueExtenal.replace('"text1"', `"${blockText[0]}"`)
        : state.blockBuildState.blockDef.externalType === 'TYPE_STATEMENT' ? blockModel.statementInput.replace('"text1"', `"${blockText[0]}"`)
        : '';
      const blockId = state.blockBuildState.blockId !== '' ? state.blockBuildState.blockId : 'block_type';
      const execText = `Blockly.Blocks['${blockId}'] = { init: function() {${connectionTypeCode + embeddingNumberCode + externalTypeCode}this.setColour(230); this.setTooltip(""); this.setHelpUrl("");} };`;
      executeText(execText, blockId);
      return {
        ...state,
        blockBuildState: {
          ...state.blockBuildState,
          blockDef: {
            ...state.blockBuildState.blockDef,
            content: execText
          },
        }
      };
    case BlocklyActions.SET_BLOCK_TYPE:
      return {
        ...state,
        blockBuildState: {
          ...state.blockBuildState,
          blockGen: {
            ...state.blockBuildState.blockGen,
            blockType: action.payload
          }
        }
      };
    case BlocklyActions.SET_BLOCK_TYPE_CONTENT:
      return {
        ...state,
        blockBuildState: {
          ...state.blockBuildState,
          blockGen: {
            ...state.blockBuildState.blockGen,
            blockTypeContent: action.payload
          }
        }
      };
    case BlocklyActions.SET_BLOCK_CODE_GENERATOR:
      return {
        ...state,
        blockBuildState: {
          ...state.blockBuildState,
          blockGen: {
            ...state.blockBuildState.blockGen,
            content: action.payload
          }
        }
      };
    case BlocklyActions.SET_OPTION_DIVE_STATE_NAME:
      return {
        ...state,
        blockBuildState: {
          ...state.blockBuildState,
          blockGen: {
            ...state.blockBuildState.blockGen,
            diveStateName: action.payload
          }
        }
      };
    case BlocklyActions.SET_OPTION_DIVE_STATE_ACTION:
      return {
        ...state,
        blockBuildState: {
          ...state.blockBuildState,
          blockGen: {
            ...state.blockBuildState.blockGen,
            diveStateAction: action.payload
          }
        }
      };
    case BlocklyActions.SET_OPTION_ASYNC_STATE:
      return {
        ...state,
        blockBuildState: {
          ...state.blockBuildState,
          blockGen: {
            ...state.blockBuildState.blockGen,
            isAsync: action.payload
          }
        }
      };
    case BlocklyActions.SET_OPTION_PAYLOAD:
      return {
        ...state,
        blockBuildState: {
          ...state.blockBuildState,
          blockGen: {
            ...state.blockBuildState.blockGen,
            payload: action.payload
          }
        }
      };
    case BlocklyActions.INITAIL_OPTION_VALUE:
      return {
        ...state,
        blockBuildState: {
          ...state.blockBuildState,
          blockGen: {
            ...state.blockBuildState.blockGen,
            diveStateName: initialState.blockBuildState.blockGen.diveStateName,
            diveStateAction: initialState.blockBuildState.blockGen.diveStateAction,
            isAsync: initialState.blockBuildState.blockGen.isAsync,
            payload: initialState.blockBuildState.blockGen.payload
          }
        }
      };
    case BlocklyActions.INITAIL_BUILD_BLOCK_STATE:
      return {
        ...state,
        blockBuildState: {
          ...initialState.blockBuildState,
          blockDef: {
            ...initialState.blockBuildState.blockDef,
          },
          blockGen: {
            ...initialState.blockBuildState.blockGen,
          }
        }
      };
    case BlocklyActions.SET_BLOCK_STATE_IS_OLD:
      return {
        ...state,
        blockBuildState: {
          ...state.blockBuildState,
          isNew: action.payload
        }
      };

    case BlocklyActions.EDIT_CUSTOM_BLOCK:
      const customBlock = action.payload.customBlocksState.find(block => block.blockId === action.payload.id);
      return {
        ...state,
        blockBuildState: {
          ...state.blockBuildState,
          ...customBlock
        }
      };
    case BlocklyActions.INITAIL_BLOCKLY_STATE:
      return {
        ...initialState,
        blockBuildState: {
          ...initialState.blockBuildState,
          blockDef: {
            ...initialState.blockBuildState.blockDef,
          },
          blockGen: {
            ...initialState.blockBuildState.blockGen,
          }
        }
      };
    default:
      return state;
  }
}

function executeText(execText, blockId = 'block_type') {
  const previewer = document.getElementById('blocklyPreviewer2');
  const width = window.getComputedStyle(previewer).getPropertyValue('width').replace('px', '');
  const height = window.getComputedStyle(previewer).getPropertyValue('height').replace('px', '');
  eval(execText);
  eval(`workspace.clear();`);
  eval(`Blockly.Xml.appendDomToWorkspace(Blockly.Xml.textToDom('<xml><block id="a" type="${blockId}" x="${parseInt(width, 10) / 12}" y="${parseInt(height, 10) / 12}"></block></xml>'), workspace);`);
}

function genUid() {
  let id = '', i = 6;
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const charSet = [{min: 48, max: 57}, {min: 65, max: 90}, {min: 97, max: 122}];
  while (i !== 0) {
    const range = charSet[random(0, 2)];
    id += String.fromCharCode(random(range['min'], range['max']));
    i--;
  }
  return id;
}

function mergeCategory(categoryName, blocks) {
  const category = new Map()
    .set('', '')
    .set('general', `<category name="一般" colour="#FF4067">${blocks}</category>`)
    .set('logic', `<category name="邏輯" colour="#5C81A6">${blocks}</category>`)
    .set('controls', `<category name="迴圈" colour="#5CA65C">${blocks}</category>`)
    .set('math', `<category name="數學" colour="#5C68A6">${blocks}</category>`)
    .set('text', `<category name="文字" colour="#5CA68D">${blocks}</category>`)
    .set('lists', `<category name="列表" colour="#745CA6">${blocks}</category>`)
    .set('colour', `<category name="顏色" colour="#A6745C">${blocks}</category>`)
    .set('variable', blocks)
    .set('function', blocks);
  return category.get(categoryName);
}
