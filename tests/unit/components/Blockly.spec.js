import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import Blockly from '@/components/Blockly.vue'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale })
describe('Document.vue', () => {
  it('test blockly', async() => {
    const wrapper = shallowMount(Blockly)
    expect(wrapper.name()).toBe('Blockly')
    // expect(wrapper.findAll('div').exists()).toBe(true)
    // wrapper.find('button').trigger('click')
    await Vue.nextTick()
    // expect(wrapper.find('div').text()).toMatch('3')
  })
})
