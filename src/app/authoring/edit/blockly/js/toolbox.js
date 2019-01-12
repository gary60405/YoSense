export const categoryName = [
  {view: '邏輯', index: 'logic'},
  {view: '流程', index: 'controls'},
  {view: '數學', index: 'math'},
  {view: '文字', index: 'text'},
  {view: '列表', index: 'lists'},
  {view: '顏色', index: 'colour'},
  {view: '變數', index: 'variable'},
  {view: '函數', index: 'function'}
];

export const toolbox = {
  "logic": [
    {selected: false, name: '邏輯比較', data: `<block type="logic_compare"> <field name="OP">EQ</field> </block>`},
    {selected: false, name: '邏輯運算', data: `<block type="logic_operation"> <field name="OP">AND</field> </block>`},
    {selected: false, name: 'not敘述', data: `<block type="logic_negate"></block>`},
    {selected: false, name: '真假值', data: `<block type="logic_boolean"> <field name="BOOL">TRUE</field> </block>`},
    {selected: false, name: '空值', data: `<block type="logic_null"></block>`},
    {selected: false, name: '真假值測試', data: `<block type="logic_ternary"></block>`}
  ],
  "controls": [
    {selected: false, name: 'If敘述', data: `<block type="controls_if"></block>`},
    {selected: false, name: '計數迴圈', data: `<block type="controls_repeat_ext"> <value name="TIMES"> <shadow type="math_number"> <field name="NUM">10</field> </shadow> </value> </block>`},
    {selected: false, name: '重複直到', data: `<block type="controls_whileUntil"> <field name="MODE">WHILE</field> </block>`},
    {selected: false, name: 'For迴圈', data: `<block type="controls_for"> <field name="VAR" id="CB*8,FC^zAJNNuG:9JD+" variabletype="">i</field> <value name="FROM"> <shadow type="math_number"> <field name="NUM">1</field> </shadow> </value> <value name="TO"> <shadow type="math_number"> <field name="NUM">10</field> </shadow> </value> <value name="BY"> <shadow type="math_number"> <field name="NUM">1</field> </shadow> </value> </block>`},
    {selected: false, name: '清單迭代', data: `<block type="controls_forEach"> <field name="VAR" id="grIc4xGm.B--9RS%F_R=" variabletype="">j</field> </block>`},
    {selected: false, name: '迴圈流程控制', data: `<block type="controls_flow_statements"> <field name="FLOW">BREAK</field> </block>`},
  ],
  "math": [
    {selected: false, name: '數值', data: `<block type="math_number"> <field name="NUM">0</field> </block>`},
    {selected: false, name: '數值運算', data: `<block type="math_arithmetic"> <field name="OP">ADD</field> <value name="A"> <shadow type="math_number"> <field name="NUM">1</field> </shadow> </value> <value name="B"> <shadow type="math_number"> <field name="NUM">1</field> </shadow> </value> </block>`},
    {selected: false, name: '科學計算', data: `<block type="math_single"> <field name="OP">ROOT</field> <value name="NUM"> <shadow type="math_number"> <field name="NUM">9</field> </shadow> </value> </block>`},
    {selected: false, name: '三角函數', data: `<block type="math_trig"> <field name="OP">SIN</field> <value name="NUM"> <shadow type="math_number"> <field name="NUM">45</field> </shadow> </value> </block>`},
    {selected: false, name: '數學常數', data: `<block type="math_constant"> <field name="CONSTANT">PI</field> </block>`},
    {selected: false, name: '數值判定', data: `<block type="math_number_property"> <mutation divisor_input="false"></mutation> <field name="PROPERTY">EVEN</field> <value name="NUMBER_TO_CHECK"> <shadow type="math_number"> <field name="NUM">0</field> </shadow> </value> </block>`},
    {selected: false, name: '概數運算', data: `<block type="math_round"> <field name="OP">ROUND</field> <value name="NUM"> <shadow type="math_number"> <field name="NUM">3.1</field> </shadow> </value> </block>`},
    {selected: false, name: '清單統計', data: `<block type="math_on_list"> <mutation op="SUM"></mutation> <field name="OP">SUM</field> </block>`},
    {selected: false, name: '餘數計算', data: `<block type="math_modulo"> <value name="DIVIDEND"> <shadow type="math_number"> <field name="NUM">64</field> </shadow> </value> <value name="DIVISOR"> <shadow type="math_number"> <field name="NUM">10</field> </shadow> </value> </block>`},
    {selected: false, name: '數值限制', data: `<block type="math_constrain"> <value name="VALUE"> <shadow type="math_number"> <field name="NUM">50</field> </shadow> </value> <value name="LOW"> <shadow type="math_number"> <field name="NUM">1</field> </shadow> </value> <value name="HIGH"> <shadow type="math_number"> <field name="NUM">100</field> </shadow> </value> </block>`},
    {selected: false, name: '隨機整數', data: `<block type="math_random_int"> <value name="FROM"> <shadow type="math_number"> <field name="NUM">1</field> </shadow> </value> <value name="TO"> <shadow type="math_number"> <field name="NUM">100</field> </shadow> </value> </block>`},
    {selected: false, name: '隨機分數', data: `<block type="math_random_float"></block>`}
  ],
  "text": [
    {selected: false, name: '字串設定', data: `<block type="text"> <field name="TEXT"></field> </block>`},
    {selected: false, name: '字串組合', data: `<block type="text_join"> <mutation items="2"></mutation> </block>`},
    {selected: false, name: '字串指定給變數', data: `<block type="text_append"> <field name="VAR" id="vkrgT:MP0idJpxQB~T4F" variabletype="">item</field> <value name="TEXT"> <shadow type="text"> <field name="TEXT"></field> </shadow> </value> </block>`},
    {selected: false, name: '字串長度', data: `<block type="text_length"> <value name="VALUE"> <shadow type="text"> <field name="TEXT">abc</field> </shadow> </value> </block>`},
    {selected: false, name: '是否為空字串', data: `<block type="text_isEmpty"> <value name="VALUE"> <shadow type="text"> <field name="TEXT"></field> </shadow> </value> </block>`},
    {selected: false, name: '字串索引(indexOf)', data: `<block type="text_indexOf"> <field name="END">FIRST</field> <value name="VALUE"> <block type="variables_get"> <field name="VAR" id="eBVN?O^1kryiT;{YwW,o" variabletype="">text</field> </block> </value> <value name="FIND"> <shadow type="text"> <field name="TEXT">abc</field> </shadow> </value> </block>`},
    {selected: false, name: '字串取得(charAt)', data: `<block type="text_charAt"> <mutation at="true"></mutation> <field name="WHERE">FROM_START</field> <value name="VALUE"> <block type="variables_get"> <field name="VAR" id="eBVN?O^1kryiT;{YwW,o" variabletype="">text</field> </block> </value> </block>`},
    {selected: false, name: '子字串取得', data: `<block type="text_getSubstring"> <mutation at1="true" at2="true"></mutation> <field name="WHERE1">FROM_START</field> <field name="WHERE2">FROM_START</field> <value name="STRING"> <block type="variables_get"> <field name="VAR" id="eBVN?O^1kryiT;{YwW,o" variabletype="">text</field> </block> </value> </block>`},
    {selected: false, name: '大小寫改變', data: `<block type="text_changeCase"> <field name="CASE">UPPERCASE</field> <value name="TEXT"> <shadow type="text"> <field name="TEXT">abc</field> </shadow> </value> </block>`},
    {selected: false, name: '空格消除', data: `<block type="text_trim"> <field name="MODE">BOTH</field> <value name="TEXT"> <shadow type="text"> <field name="TEXT">abc</field> </shadow> </value> </block>`},
    {selected: false, name: '文字輸出', data: `<block type="text_print"> <value name="TEXT"> <shadow type="text"> <field name="TEXT">abc</field> </shadow> </value> </block>`},
    {selected: false, name: '文字輸入並顯示', data: `<block type="text_prompt_ext"> <mutation type="TEXT"></mutation> <field name="TYPE">TEXT</field> <value name="TEXT"> <shadow type="text"> <field name="TEXT">abc</field> </shadow> </value> </block>`},
  ],
  "lists": [
    {selected: false, name: '空清單建立', data: `<block type="lists_create_with"> <mutation items="0"></mutation> </block>`},
    {selected: false, name: '以值建立清單', data: `<block type="lists_create_with"> <mutation items="3"></mutation> </block>`},
    {selected: false, name: '重複項目清單', data: `<block type="lists_repeat"> <value name="NUM"> <shadow type="math_number"> <field name="NUM">5</field> </shadow> </value> </block>`},
    {selected: false, name: '清單長度', data: `<block type="lists_length"></block>`},
    {selected: false, name: '是否為空清單', data: `<block type="lists_isEmpty"></block>`},
    {selected: false, name: '清單索引(indexOf)', data: `<block type="lists_indexOf"> <field name="END">FIRST</field> <value name="VALUE"> <block type="variables_get"> <field name="VAR" id="+[.SADRHvq$Hqc%OoZwf" variabletype="">list</field> </block> </value> </block>`},
    {selected: false, name: '清單索引取得', data: `<block type="lists_getIndex"> <mutation statement="false" at="true"></mutation> <field name="MODE">GET</field> <field name="WHERE">FROM_START</field> <value name="VALUE"> <block type="variables_get"> <field name="VAR" id="+[.SADRHvq$Hqc%OoZwf" variabletype="">list</field> </block> </value> </block>`},
    {selected: false, name: '清單索引設定', data: `<block type="lists_setIndex"> <mutation at="true"></mutation> <field name="MODE">SET</field> <field name="WHERE">FROM_START</field> <value name="LIST"> <block type="variables_get"> <field name="VAR" id="+[.SADRHvq$Hqc%OoZwf" variabletype="">list</field> </block> </value> </block>`},
    {selected: false, name: '以字串切割成清單(split)', data: `<block type="lists_split"> <mutation mode="SPLIT"></mutation> <field name="MODE">SPLIT</field> <value name="DELIM"> <shadow type="text"> <field name="TEXT">,</field> </shadow> </value> </block>`},
    {selected: false, name: '取得子清單', data: `<block type="lists_getSublist"> <mutation at1="true" at2="true"></mutation> <field name="WHERE1">FROM_START</field> <field name="WHERE2">FROM_START</field> <value name="LIST"> <block type="variables_get"> <field name="VAR" id="+[.SADRHvq$Hqc%OoZwf" variabletype="">list</field> </block> </value> </block>`},
    {selected: false, name: '清單排序', data: `<block type="lists_sort"> <field name="TYPE">NUMERIC</field> <field name="DIRECTION">1</field> </block>`}
  ],
  "colour": [
    {selected: false, name: '取色器', data: `<block type="colour_picker"> <field name="COLOUR">#ff0000</field> </block>`},
    {selected: false, name: '隨機顏色', data: `<block type="colour_random"></block>`},
    {selected: false, name: 'RGB配色', data: `<block type="colour_rgb"> <value name="RED"> <shadow type="math_number"> <field name="NUM">100</field> </shadow> </value> <value name="GREEN"> <shadow type="math_number"> <field name="NUM">50</field> </shadow> </value> <value name="BLUE"> <shadow type="math_number"> <field name="NUM">0</field> </shadow> </value> </block>`},
    {selected: false, name: '混色', data: `<block type="colour_blend"> <value name="COLOUR1"> <shadow type="colour_picker"> <field name="COLOUR">#ff0000</field> </shadow> </value> <value name="COLOUR2"> <shadow type="colour_picker"> <field name="COLOUR">#3333ff</field> </shadow> </value> <value name="RATIO"> <shadow type="math_number"> <field name="NUM">0.5</field> </shadow> </value> </block>`}
  ],
  "variable": [
    {selected: false, name: '變數操作', data: `<category name="變數" colour="#A65C81" custom="VARIABLE"></category>`}
  ],
  "function": [
    {selected: false, name: '函數操作', data: `<category name="函數" colour="#9A5CA6" custom="PROCEDURE"></category>`}
  ]
}
