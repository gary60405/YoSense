export const blockTypeContents = [
    {viewName: '取得積木的內容', blockTypeContent: 'GET_BLOCK_CONTENT',},
    {viewName: '輸出名稱', blockTypeContent: 'SEND_NAME_INTO_BLOCK',},
    {viewName: '輸出數值', blockTypeContent: 'SEND_VALUE_INTO_BLOCK',},
    {viewName: '比較兩個積木值', blockTypeContent: 'COMPARE_TWO_BLOCKS_VALUE',},
    {viewName: '取得DIVE值', blockTypeContent: 'GET_DIVE_VALUE_WITH_STATE',},
    {viewName: '設定狀態值傳入DIVE', blockTypeContent: 'SEND_VALUE_INTO_DIVE_WITH_STATE'},
    {viewName: '取得名稱取得DIVE值', blockTypeContent: 'GET_DIVE_VALUE_WITH_NAME',},
    {viewName: '取得狀態樹名稱傳入DIVE', blockTypeContent: 'SEND_DIVE_WITH_STATE_NAME',},
    {viewName: '取得積木值傳入DIVE', blockTypeContent: 'SEND_DIVE_WITH_BLOCK_VALUE',},
    {viewName: '取得狀態樹名稱與積木值傳入DIVE', blockTypeContent: 'SEND_DIVE_WITH_NAME_AND_BLOCK_VALUE',},
    {viewName: '取得狀態樹名稱比較積木與DIVE值', blockTypeContent: 'GET_STATE_NAME_TO_COMPARE_WITH_DIVE_VALUE',},
    {viewName: '以狀態樹比較積木與DIVE值', blockTypeContent: 'COMPARE_STATE_WITH_DIVE_VALUE',}
  ];

  export function getPureBlock() {
    return `Blockly.JavaScript['block_type'] = (block) => '';`;
  };

  export function getBlockContent() {
    return `Blockly.JavaScript['block_type'] = (block) => {
      try {
        return Blockly.JavaScript.statementToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim().replace(/^'/,"").replace(/'$/,"");
      }
      catch (e) {
        return Blockly.JavaScript.valueToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim();
      }
    };`;
  }

  export function sendNameIntoBlock(stateSelected) {
    return `Blockly.JavaScript['block_type'] = (block) => "${stateSelected}";`;
  }

  export function sendValueIntoBlock(stateSelected, stateActionSelected) {
    return `Blockly.JavaScript['block_type'] = (block) => 'diveState["${stateSelected}"]["${stateActionSelected}"]["value"]';`;
  }

  export function compareTwoBlocksValue() {
    return `Blockly.JavaScript['block_type'] = (block) => {
      let valueInput1, valueInput2;
      try {
        valueInput1 = Blockly.JavaScript.statementToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim();
        try {
          valueInput2 = \`'\${Blockly.JavaScript.statementToCode(block, 'valueInput2', Blockly.JavaScript.ORDER_ATOMIC).trim()}'\`;
        }
        catch (e) {
          valueInput2 = Blockly.JavaScript.valueToCode(block, 'valueInput2', Blockly.JavaScript.ORDER_ATOMIC).trim();
        }
      }
      catch (e) {
        valueInput1 = Blockly.JavaScript.valueToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim();
        try {
          valueInput2 = \`'\${Blockly.JavaScript.statementToCode(block, 'valueInput2', Blockly.JavaScript.ORDER_ATOMIC).trim()}'\`;
        }
        catch (e) {
          valueInput2 = Blockly.JavaScript.valueToCode(block, 'valueInput2', Blockly.JavaScript.ORDER_ATOMIC).trim();
        }
      }
      return \`\${valueInput1} === \${valueInput2}\`;
    };`
  }

  export function getDiveValueWithState(stateSelected, stateActionSelected) {
    return `Blockly.JavaScript['block_type'] = (block) => {
      try {
        return \`diveLinker.getAttr(diveState["${stateSelected}"]["${stateActionSelected}"]["diveID"]);\`;
      }
      catch (e) {
        return \`diveLinker.getAttr(diveState["${stateSelected}"]["${stateActionSelected}"]["diveID"]);\`;
      }
    };`;
  }

  export function sendValueIntoDiveWithState(stateSelected, stateActionSelected, isAsync=false) {
    return `Blockly.JavaScript['block_type'] = (block) => 'diveLinker.setInput(diveState["${stateSelected}"]["${stateActionSelected}"]["diveID"],diveState["${stateSelected}"]["${stateActionSelected}"]["value"], ${isAsync});';`;
  }

  export function getDiveValueWithName(stateActionSelected) {
    return `Blockly.JavaScript['block_type'] = (block) => {
      try {
        const valueInput1 = Blockly.JavaScript.statementToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim().replace(/^'/,"").replace(/'$/,"");
        return \`diveLinker.getAttr(diveState["\${valueInput1}"]["${stateActionSelected}"]["diveID"]);\`;
      }
      catch (e) {
        const valueInput1 = Blockly.JavaScript.valueToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC);
        return \`diveLinker.getAttr(diveState["\${valueInput1}"]["${stateActionSelected}"]["diveID"]);\`;
      }
    };`;
  }

export function sendDiveWithStateName(stateActionSelected, isAsync=false) {
  return `Blockly.JavaScript['block_type'] = (block) => {
    try {
      const valueInput1 = Blockly.JavaScript.statementToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim().replace(/^'/,"").replace(/'$/,"");
      return \`diveLinker.setInput(diveState["\${valueInput1}"]["${stateActionSelected}"]["diveID"],diveState["\${valueInput1}"]["${stateActionSelected}"]["value"], ${isAsync});\`;
    }
    catch (e) {
      const valueInput1 = Blockly.JavaScript.valueToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim();
      return \`diveLinker.setInput(diveState["\${valueInput1}"]["${stateActionSelected}"]["diveID"],diveState["\${valueInput1}"]["${stateActionSelected}"]["value"], ${isAsync});\`;
    }
  };`;
}

export function sendDiveWithBlockValue(stateSelected, stateActionSelected, isAsync=false) {
  return `Blockly.JavaScript['block_type'] = (block) => {
    try {
      const valueInput1 = Blockly.JavaScript.statementToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim().replace(/^'/,"").replace(/'$/,"");
      return \`diveLinker.setInput(diveState["${stateSelected}"]["${stateActionSelected}"]["diveID"],\${valueInput1},${isAsync});\`;
    }
    catch (e) {
      const valueInput1 = Blockly.JavaScript.valueToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim();
      return \`diveLinker.setInput(diveState["${stateSelected}"]["${stateActionSelected}"]["diveID"],\${valueInput1},${isAsync});\`;
    }
  };`;
}

export function sendDiveWithNameAndBlockValue(stateActionSelected, isAsync=false) {
  return `Blockly.JavaScript['block_type'] = (block) => {
    try {
      const valueInput1 = Blockly.JavaScript.statementToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim().replace(/^'/,"").replace(/'$/,"");
      const valueInput2 = Blockly.JavaScript.valueToCode(block, 'valueInput2', Blockly.JavaScript.ORDER_ATOMIC);
      return \`diveLinker.setInput(diveState[\${valueInput1}]["${stateActionSelected}"]["diveID"],\${valueInput2},${isAsync});\`;
    }
    catch (e) {
      const valueInput1 = Blockly.JavaScript.valueToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim();
      const valueInput2 = Blockly.JavaScript.valueToCode(block, 'valueInput2', Blockly.JavaScript.ORDER_ATOMIC);
      return \`diveLinker.setInput(diveState[\${valueInput1}]["${stateActionSelected}"]["diveID"],\${valueInput2},${isAsync});\`;
    }
  };`;
}

export function getStateNameToCompareWithDiveValue(stateActionSelected) {
  return `Blockly.JavaScript['block_type'] = (block) => {
    function sendFunction(state) {
      const diveValue = \`diveState[\${state}]["${stateActionSelected}"]["value"]\`;
      const readDiveData = \`eval('diveLinker.getAttr(diveState[\${state}]["${stateActionSelected}"]["diveID"])');\`;
      return \`(function () { return \${diveValue} == \${readDiveData}})()\`;
    }
    try {
      const valueInput1 = Blockly.JavaScript.statementToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim().replace(/^'/,"").replace(/'$/,"");
      return sendFunction("'" + valueInput1 + "'");
    }
    catch (e) {
      const valueInput1 = Blockly.JavaScript.valueToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC);
      return sendFunction(valueInput1);
    }
  };`;
}

export function compareStateWithDiveValue(stateSelected, stateActionSelected) {
  return `Blockly.JavaScript['block_type'] = (block) => diveState["${stateSelected}"]["${stateActionSelected}"]["value"] == eval('diveLinker.getAttr(diveState["${stateSelected}"]["${stateActionSelected}"]["diveID"])');`;
}
