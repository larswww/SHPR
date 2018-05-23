import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils' //https://vue-test-utils.vuejs.org/en/guides/getting-started.html
import App from '../src/App.vue'

//https://vuejs.org/v2/guide/unit-testing.html
describe('App.vue', () => {

  it('renders frontpage list table', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.find('<th scope="col">').text()).contains('🍕')

  })
  //
  //
  // it('has bottom navbar', () => {
  //   expect(wrapper.contains('#app > nav.nav.nav-pills.fixed-bottom.bg-dark.nav-fill'))
  // })
  //
  // it('has top navbar', () => {
  //   expect(wrapper.contains('#app > nav.navbar.fixed-top.navbar-light.bg-light'))
  //
  // })
  //
  // it('has nav links', () => {
  //   expect(wrapper.contains('#app > nav.nav.nav-pills.fixed-bottom.bg-dark.nav-fill > a:nth-child(2)'))
  // })


})