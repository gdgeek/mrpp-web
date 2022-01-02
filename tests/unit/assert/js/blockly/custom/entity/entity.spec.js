import Entity from '@/assets/js/blockly/custom/entity/entity'

describe('Entity Blockly', () => {
  it('Entity block', async() => {
    // root.$store.state.blockly.data.actions
    const root = {
      $store: {
        state: {
          blockly: {
            data: {
              entities: [{ name: 'entity 1', uuid: 'aaa-bbb-ccc' }]
            }
          }
        }
      }
    }

    const block = Entity.getBlockJson(root)
    const options = block.args0[0].options()
    expect(options.length).toBe(2)
    expect(options[1][0]).toMatch('entity 1')
    expect(options[1][1]).toMatch('aaa-bbb-ccc')
  })
})
