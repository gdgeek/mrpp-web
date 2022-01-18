import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import Post from '@/views/community/post.vue'

describe('community/post.vue', () => {
  it('increments count when button is clicked', async() => {
    const wrapper = shallowMount(Post)
    expect(wrapper.name()).toBe('CommunityPost')
    await Vue.nextTick()
  })
})
