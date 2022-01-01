import ActionTrigger from '@/assets/js/blockly/custom/trigger/action_trigger'

describe('Counter.vue', () => {
  it('custom block', async() => {
    // root.$store.state.blockly.data.actions
    const root = {
      $store: {
        state: {
          blockly: {
            data: {
              actions: [{ name: 'action1', uuid: 'aaa-bbb-ccc' }]
            }
          }
        }
      }
    }

    const block = ActionTrigger.getBlockJson(root)
    const options = block.args0[0].options()
    expect(options.length).toBe(2)
  })
})
