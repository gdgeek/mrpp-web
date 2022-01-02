import PolygenEntity from '@/assets/js/blockly/custom/entity/polygen_entity'

describe('Polygen Blockly', () => {
  it('polygen block', async() => {
    // root.$store.state.blockly.data.actions
    const root = {
      $store: {
        state: {
          blockly: {
            data: {
              polygens: [{ name: 'polygen 1', uuid: 'aaa-bbb-ccc' }]
            }
          }
        }
      }
    }

    const block = PolygenEntity.getBlockJson(root)
    const options = block.args0[0].options()
    expect(options.length).toBe(2)
    expect(options[1][0]).toMatch('polygen 1')
    expect(options[1][1]).toMatch('aaa-bbb-ccc')
  })
})
