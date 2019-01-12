export const blockModel = {
  connection: {
    left_output: 'this.setOutput(true,null);',
    down_conn: 'this.setNextStatement(true,null);',
    up_conn: 'this.setPreviousStatement(true,null);',
    up_down_conn: 'this.setPreviousStatement(true,null);this.setNextStatement(true,null);',
  },
  valueEmbed: 'this.appendDummyInput().appendField("text1");this.appendValueInput("valueInput1").setCheck(null);',
  valueExtenal: 'this.appendValueInput("valueInput1") .setCheck(null) .appendField("text1");',
  statementInput: 'this.appendStatementInput("valueInput1").setCheck(null).appendField("text1");',
  textfield: 'this.appendDummyInput().appendField("text1");'
};

export const diveState = {
  'lion_sleep': {
    sleep: {
      diveID: '1539592634354',
      value: ''
    }
  },
  'goat': {
    move: {
      diveID: '1511104738945',
      value: ''
    }
  },
  'monkey': {
    move: {
      diveID: '1511104362549',
      value: ''
    }
  },
  'banana1': {
    is_green: {
      diveID: '1539786384490  ',
      value: ''
    }
  },
  'banana2': {
    is_green: {
      diveID: '1539594937115',
      value: ''
    }
  },
};
