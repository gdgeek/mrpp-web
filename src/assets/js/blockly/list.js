/*


 <category name="%{BKY_CATLISTS}" colour="%{BKY_LISTS_HUE}">
      
      <block type="lists_indexOf">
        <value name="VALUE">
          <block type="variables_get">
            <field name="VAR">{listVariable}</field>
          </block>
        </value>
      </block>
      <block type="lists_getIndex">
        <value name="VALUE">
          <block type="variables_get">
            <field name="VAR">{listVariable}</field>
          </block>
        </value>
      </block>
      <block type="lists_setIndex">
        <value name="LIST">
          <block type="variables_get">
            <field name="VAR">{listVariable}</field>
          </block>
        </value>
      </block>
      <block type="lists_getSublist">
        <value name="LIST">
          <block type="variables_get">
            <field name="VAR">{listVariable}</field>
          </block>
        </value>
      </block>
      <block type="lists_split">
        <value name="DELIM">
          <shadow type="text">
            <field name="TEXT">,</field>
          </shadow>
        </value>
      </block>
      <block type="lists_sort"></block>
    </category>
    
    
    */


export default {
  kind: 'category',
  name: '列表',
  colour: '%{BKY_LISTS_HUE}',
  contents: [
    {
      kind: 'block',
      type: 'lists_create_empty'
    },
    {
      kind: 'block',
      type: 'lists_create_with'
    },
    {
      kind: 'block',
      type: 'lists_repeat',
      inputs: {
        NUM: {
          shadow: {
            type: 'math_number',
            fields: {
              NUM: '5'
            }
          }
        }
      }
    },
    {
      kind: 'block',
      type: 'lists_length'
    },
    {
      kind: 'block',
      type: 'lists_isEmpty'
    },
    {
      kind: 'block',
      type: 'lists_indexOf',
      inputs: {
        VALUE: {
          block: {
            type: 'variables_get',
            fields: {
              VAR: '{listVariable}'
            }
          }
        }
      }
    },
    {
      kind: 'block',
      type: 'lists_getIndex',
      inputs: {
        VALUE: {
          block: {
            type: 'variables_get',
            fields: {
              VAR: '{listVariable}'
            }
          }
        }
      }
    },
    {
      kind: 'block',
      type: 'lists_setIndex',
      inputs: {
        LIST: {
          block: {
            type: 'variables_get',
            fields: {
              VAR: '{listVariable}'
            }
          }
        }
      }
    },
    {
      kind: 'block',
      type: 'lists_getSublist',
      inputs: {
        LIST: {
          block: {
            type: 'variables_get',
            fields: {
              VAR: '{listVariable}'
            }
          }
        }
      }
    },
    {
      kind: 'block',
      type: 'lists_split',
      inputs: {
        DELIM: {
          shadow: {
            type: 'text',
            fields: {
              TEXT: ','
            }
          }
        }
      }
    }
  ]
}
/**
 * 
 * 
 * 
 * 
 *
    <block type="lists_split">
        <value name="DELIM">
          <shadow type="text">
            <field name="TEXT">,</field>
          </shadow>
        </value>
      </block>
      <block type="lists_sort"></block>

 */