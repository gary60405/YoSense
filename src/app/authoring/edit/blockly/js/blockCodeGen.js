export const blockTypeContents = new Map()
  .set('BLOCKLY', [
      {viewName: '取得Block值', blockTypeContent: 'BLOCKLY_GETTER',},
      {viewName: '傳入Block值', blockTypeContent: 'BLOCKLY_SETTER',},
      {viewName: '兩個Block值比較', blockTypeContent: 'BLOCKLY_GETTER_COMPARE',}
    ])
  .set('DIVE', [
      {viewName: '取得DIVE值', blockTypeContent: 'DIVE_GETTER',},
      {viewName: '傳入DIVE值', blockTypeContent: 'DIVE_SETTER',},
    ])
  .set('REMIX', [
      {viewName: '以DIVE狀態樹傳入DIVE', blockTypeContent: 'BLOCKLY_GETTER_SET_DIVE_WITH_DIVE_STATE',},
      {viewName: '以Block值傳入DIVE', blockTypeContent: 'BLOCKLY_GETTER_SET_DIVE_WITH_BLOCK_VALUE',},
      {viewName: '以Block值非同步傳入DIVE', blockTypeContent: 'BLOCKLY_GETTER_ASYNC_SET_DIVE_WITH_BLOCK_VALUE',},
      {viewName: '以Block值與DIVE值比較', blockTypeContent: 'BLOCKLY_GETTER_COMPARE_WITH_DIVE_GETTER',}
    ]);

  export function getBlocklyGetter() {
    return `Blockly.JavaScript['block_type'] = (block) => {
      try {
        return Blockly.JavaScript.statementToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim().replace(/^'/,"").replace(/'$/,"");
      }
      catch (e) {
        return Blockly.JavaScript.valueToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim();
      }
    };`;
  }

  export function getBlocklySetter(stateSelected) {
    return `Blockly.JavaScript['block_type'] = (block) => '${stateSelected}';`;
  }

  export function getDiveSetter(stateSelected, stateActionSelected, isAsync=false) {
    return `diveLinker.Send(parseInt(diveState['${stateSelected}']['${stateActionSelected}']['diveID']),parseInt(diveState['${stateSelected}']['${stateActionSelected}']['value']), ${isAsync});`;
  }

  export function getDiveGetter(stateActionSelected) {
    return `Blockly.JavaScript['block_type'] = (block) => {
      try {
        const valueInput1 = Blockly.JavaScript.statementToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim().replace(/^'/,"").replace(/'$/,"")
        return \`eval('diveLinker.Get(diveState['\${valueInput1}']["${stateActionSelected}"]["diveID"])');\`
      }
      catch (e) {
        const valueInput1 = Blockly.JavaScript.valueToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC);
        return \`eval('diveLinker.Get(diveState['\${valueInput1}']["${stateActionSelected}"]["diveID"])');\`
      }
    };`;
  }

export function getBlocklyGetterSetDiveWithDiveState(stateActionSelected, isAsync=false) {
  return `Blockly.JavaScript['block_type'] = (block) => {
    try {
      const valueInput1 = Blockly.JavaScript.statementToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim().replace(/^'/,"").replace(/'$/,"");
      return \`diveLinker.Send(parseInt(diveState['\${valueInput1}']['${stateActionSelected}']['diveID']),parseInt(diveState['\${valueInput1}']['${stateActionSelected}']['value']), ${isAsync});\`;
    }
    catch (e) {
      const valueInput1 = Blockly.JavaScript.valueToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim();
      return \`diveLinker.Send(parseInt(diveState['\${valueInput1}']['${stateActionSelected}']['diveID']),parseInt(diveState[\${valueInput1}]['${stateActionSelected}']['value']), ${isAsync});\`;
    }
  };`;
}

export function getBlocklyGetterSetDiveWithBlockValue(stateActionSelected, isAsync=false) {
  return `Blockly.JavaScript['block_type'] = (block) => {
    try {
      const valueInput1 = Blockly.JavaScript.statementToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim().replace(/^'/,"").replace(/'$/,"")
      const valueInput2 = Blockly.JavaScript.valueToCode(block, 'valueInput2', Blockly.JavaScript.ORDER_ATOMIC);
      return \`diveLinker.Send(parseInt(diveState['\${valueInput1}']['${stateActionSelected}']['diveID']),\${valueInput2},${isAsync});\`;
    }
    catch (e) {
      const valueInput1 = Blockly.JavaScript.valueToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim()
      const valueInput2 = Blockly.JavaScript.valueToCode(block, 'valueInput2', Blockly.JavaScript.ORDER_ATOMIC);
      return \`diveLinker.Send(parseInt(diveState['\${valueInput1}']['${stateActionSelected}']['diveID']),\${valueInput2},${isAsync});\`;
    }
  };`;
}

export function getBlocklyGetterAsyncSetDiveWithBlockValue(stateActionSelected, isAsync=false) {
  return `Blockly.JavaScript['block_type'] = (block) => {
    try {
      const valueInput1 = Blockly.JavaScript.statementToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim()
      const valueInput2 = Blockly.JavaScript.valueToCode(block, 'valueInput2', Blockly.JavaScript.ORDER_ATOMIC);
      const sendCode = \`diveLinker.Send(parseInt(diveState['\${valueInput1}']['${stateActionSelected}']['diveID']),\${valueInput2},${isAsync});\`;
      return \`generalPromise.then(()=>{\${sendCode}})\`;
    }
    catch (e) {
      const valueInput1 = Blockly.JavaScript.valueToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim()
      const valueInput2 = Blockly.JavaScript.valueToCode(block, 'valueInput2', Blockly.JavaScript.ORDER_ATOMIC);
      const sendCode = \`diveLinker.Send(parseInt(diveState['\${valueInput1}']['${stateActionSelected}']['diveID']),\${valueInput2},${isAsync});\`;
      return \`generalPromise.then(()=>{\${sendCode}})\`;
    }
  };`;
}

export function getBlocklyGetterCompareWithDiveGetter(stateActionSelected, value) {
  return `Blockly.JavaScript['block_type'] = (block) => {
    function sendFunction(state) {
      const diveValue = \`diveState[\${state}]["${stateActionSelected}"]["value"]\`;
      const readDiveData = \`eval('diveLinker.Get(diveState[\${state}]["${stateActionSelected}"]["diveID"])');\`;
      const compareValue = \`(parseInt(diveState[\${state}]['${stateActionSelected}']['value']) === ${value});\`;
      return \`(function () {\${diveValue} = \${readDiveData} return \${compareValue}})()\`;
    }
    try {
      const valueInput1 = Blockly.JavaScript.statementToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim().replace(/^'/,"").replace(/'$/,"")
      return sendFunction("'" + valueInput1 + "'")
    }
    catch (e) {
      const valueInput1 = Blockly.JavaScript.valueToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC);
      return sendFunction(valueInput1)
    }
  };`;
}

export function getBlocklyGetterCompare() {
  return `Blockly.JavaScript['block_type'] = (block) => {
    let valueInput1, valueInput2;
    try {
      valueInput1 = Blockly.JavaScript.statementToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim()
      try {
        valueInput2 = \`'\${Blockly.JavaScript.statementToCode(block, 'valueInput2', Blockly.JavaScript.ORDER_ATOMIC).trim()}'\`;
      }
      catch (e) {
        valueInput2 = Blockly.JavaScript.valueToCode(block, 'valueInput2', Blockly.JavaScript.ORDER_ATOMIC).trim()
      }
    }
    catch (e) {
      valueInput1 = Blockly.JavaScript.valueToCode(block, 'valueInput1', Blockly.JavaScript.ORDER_ATOMIC).trim()
      try {
        valueInput2 = \`'\${Blockly.JavaScript.statementToCode(block, 'valueInput2', Blockly.JavaScript.ORDER_ATOMIC).trim()}'\`;
      }
      catch (e) {
        valueInput2 = Blockly.JavaScript.valueToCode(block, 'valueInput2', Blockly.JavaScript.ORDER_ATOMIC).trim()
      }
    }
    return \`\${valueInput1} === \${valueInput2}\`;
  }`
}
