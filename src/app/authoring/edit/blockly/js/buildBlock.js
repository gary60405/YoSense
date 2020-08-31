// 不同積木造型的程式碼

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
