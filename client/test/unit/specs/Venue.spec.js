import { mount,shallow } from '@vue/test-utils'
import Venue from '@/components/Venue'
import Vue from 'vue/types/index'

describe('Venue', () => {


  it('renders a vue instance', () => {
    expect(mount(Venue).isVueInstance()).to.equal(true);
  });


})


describe('Venue', () => {
  it('renders a vue instance', () => {
    const Constructor = Vue.extend(Venue)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
