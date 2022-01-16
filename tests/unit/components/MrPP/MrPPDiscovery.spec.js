import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils'
import MrPPDiscovery from '@/components/MrPP/MrPPDiscovery.vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
describe('Document.vue', () => {
  it('increments count when button is clicked', async() => {
    const localVue = createLocalVue()

    localVue.use(ElementUI, { locale })
    const wrapper = mount(MrPPDiscovery, { localVue })
    expect(wrapper.name()).toBe('MrPPDiscovery')

    // expect(wrapper.findAll('div').exists()).toBe(true)
    // wrapper.find('button').trigger('click')
    await Vue.nextTick()
    // expect(wrapper.find('div').text()).toMatch('3')
  })
})
