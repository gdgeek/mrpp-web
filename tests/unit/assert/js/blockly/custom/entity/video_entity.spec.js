import VideoEntity from '@/assets/js/blockly/custom/entity/video_entity'

describe('Video Blockly', () => {
  it('Video block', async() => {
    // root.$store.state.blockly.data.actions
    const root = {
      $store: {
        state: {
          blockly: {
            data: {
              videos: [{ name: 'video 1', uuid: 'aaa-bbb-ccc' }]
            }
          }
        }
      }
    }

    const block = VideoEntity.getBlockJson(root)
    const options = block.args0[0].options()
    expect(options.length).toBe(2)
    expect(options[1][0]).toMatch('video 1')
    expect(options[1][1]).toMatch('aaa-bbb-ccc')
  })
})
