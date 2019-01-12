let workspace = null;

function init(str) {
    const blocksData = str.split('#^&').map(data => {
      const newData = {}
      const splited = data.split('@^&');
      newData['type'] = splited[0];
      newData['content'] = splited[1];
      newData['generator'] = splited[2];
      return newData;
    }).slice(0, -1);
    initCodeGenerator(blocksData)
    this.workspace = Blockly.inject('blocklyDiv', {
      toolbox: Blockly.Xml.textToDom(getXmlText(blocksData)),
      trashcan: true,
      grid: {
        spacing: 30,
        length: 3,
        colour: '#39261f',
        snap: true
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 1.2,
        minScale: 0.8,
        scaleSpeed: 1.2
      },
  });
}

function resetBlocklyWorkSpace() {
  Blockly.mainWorkspace.clear();
  Blockly.mainWorkspace.dispose();
}

function getXmlText(blocksData) {
  let xmlText = '<xml id="toolbox">';
  for (block in blocksData) {
    block = blocksData[block];
    xmlText += `<block type="${block['type']}"></block>`;
    Blockly.Blocks[block['type']] = {
      init: Function(`${block['content']}`)
    };
  }
  xmlText += '</xml>';
  return xmlText;
}

function initCodeGenerator(blocksData) {
  for (block in blocksData) {
    block = blocksData[block];
    Blockly.JavaScript[block['type']] = Function('block', block['generator']);
  }
}

function getCode() {
  console.log(Blockly.JavaScript.workspaceToCode(this.workspace));
  return Blockly.JavaScript.workspaceToCode(this.workspace);
}


