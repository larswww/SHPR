import { expect } from 'chai'
import { shallow } from '@vue/test-utils' //https://vue-test-utils.vuejs.org/en/guides/getting-started.html
import App from '../src/App.vue'

//https://vuejs.org/v2/guide/unit-testing.html
describe('App.vue', () => {

  const wrapper = shallow(App)

  it('renders SHPR', () => {
    expect(wrapper.html().toContain('<th scope="col">Shanghai Pizza Rankings</th>'))
  })
})