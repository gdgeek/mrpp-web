import PictureEntity from '@/assets/js/blockly/custom/entity/picture_entity'

describe('Picture Blockly', () => {
  it('Picture block', async() => {
    // root.$store.state.blockly.data.actions
    const root = {
      $store: {
        state: {
          blockly: {
            data: {
              pictures: [{ name: 'picture 1', uuid: 'aaa-bbb-ccc' }]
            }
          }
        }
      }
    }

    const block = PictureEntity.getBlockJson(root)
    const options = block.args0[0].options()
    expect(options.length).toBe(2)
    expect(options[1][0]).toMatch('picture 1')
    expect(options[1][1]).toMatch('aaa-bbb-ccc')
  })
})
